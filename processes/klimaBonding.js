import { ethers, Wallet } from "ethers";
import { polyAddresses } from "../contants/addresses.js";
import TimeBondDepositoryContract from "../abis/TimeBondDepositoryContract.js";
import PolyBondBot from "../abis/PolyBondBotv3.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { stake, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw } from "../protocols/klima.js";
// import { getTimeBalance } from "../helpers/getTimeBalance.js"

dotenv.config();

let data = fs.readFileSync("./data/klimaBonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com')
let wallet = Wallet.fromMnemonic(process.env.KLIMA_MNEMONIC);
wallet = wallet.connect(provider);

const klimaBonding = async () => {
    const bondBotAddress = polyAddresses.BOND_BOT_ADDRESS_5;
    const bondBotContract = new ethers.Contract(bondBotAddress, PolyBondBot, wallet);

    // First we check the five day staking ROI
    const fiveDayRate = await getStakingROI()
    console.log(`Klima Staking 5-day ROI - ${(Number(fiveDayRate) * 100).toFixed(3)}%`)

    // Then we loop through each bond to see if there are any profitable bonds that beat 5 day staking
    for await (let bond of bonds["bonds"]) {
        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let bondDiscount = await getBondDiscount(bondContract, bond);
        let trigger = (fiveDayRate * 0.06) + fiveDayRate;

        // if bond it better than the staking ROI by 6%
        // if (bondDiscount > trigger) {
        if (bond.bond == 'BCT') {
            try {
                let sKlimaAmount = await bondBotContract.getTokenBalance(polyAddresses.SKLIMA_ADDRESS);
                let acceptedSlippage = 1/100;
                if (sKlimaAmount >= 500000000) {
                    sKlimaAmount = 500000000;
                    if (bond.is_lp) {
                        let isDoubleSwap = false;
                        let tokenA = polyAddresses.KLIMA_ADDRESS;
                        if (bond.bond == 'BCT/USDC LP') {
                            isDoubleSwap = true;
                            tokenA = polyAddresses.BCT_ADDRESS;
                        }
                        console.log(`Bonding ${ethers.utils.formatUnits(sKlimaAmount, "gwei")} for ${bond.bond}`)
                        await bondLP(bondBotContract, bondContract, wallet, bond.address, bond.lp_token_address, tokenA, bond.token_address, sKlimaAmount, isDoubleSwap, acceptedSlippage);
                        bond.is_live = true;
                    } else {
                        console.log(`Bonding ${ethers.utils.formatUnits(sKlimaAmount, "gwei")} for ${bond.bond}`)
                        await bondNormal(bondBotContract, bondContract, wallet, bond.address, polyAddresses.KLIMA_ADDRESS, bond.token_address, sKlimaAmount, acceptedSlippage);
                        bond.is_live = true;
                    }
                }
            } catch (err) {
                console.log(err);
            }

        }
        bond.bond_discount = bondDiscount
    }
    // let timeBalance = await getTimeBalance(process.env.MY_ADDRESS, provider);
    // if (timeBalance > 0) {
    //     console.log('Cleaning up');
    //     await stake(wallet, timeBalance, process.env.MY_ADDRESS);
    // }

    let data = JSON.stringify(bonds);
    fs.writeFileSync("./data/klimaBonds.json", data);
}

export { klimaBonding }