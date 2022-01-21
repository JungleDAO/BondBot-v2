import { ethers, Wallet } from "ethers";
import { romeAddresses, ZERO_ADDRESS } from "../contants/addresses.js";
import TimeBondDepositoryContract from "../abis/TimeBondDepositoryContract.js";
import RomeBondBot from "../abis/RomeBondBotContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { stake, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw } from "../protocols/rome.js";
// import { getTimeBalance } from "../helpers/getTimeBalance.js"

dotenv.config();

let data = fs.readFileSync("./data/romeBonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://rpc.moonriver.moonbeam.network')
let wallet = Wallet.fromMnemonic(process.env.MOONRIVER_MNEMONIC);
wallet = wallet.connect(provider);

const romeBonding = async () => {
    const bondBotAddress = romeAddresses.BOND_BOT_ADDRESS_1;
    const bondBotContract = new ethers.Contract(bondBotAddress, RomeBondBot, wallet);

    // First we check the five day staking ROI
    const fiveDayRate = await getStakingROI()
    console.log(`Rome Staking 5-day ROI - ${(Number(fiveDayRate) * 100).toFixed(3)}%`)

    // // Then we loop through each bond to see if there are any profitable bonds that beat 5 day staking
    for await (let bond of bonds["bonds"]) {
        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let bondDiscount = await getBondDiscount(bondContract, bond);
        let trigger = (fiveDayRate * 0.06) + fiveDayRate;

        // if bond it better than the staking ROI by 6%
        // if (bondDiscount > trigger) {
        if (bond.bond == 'FRAX') {
            try {
                let sRomeAmount = await bondBotContract.getTokenBalance(romeAddresses.SROME_ADDDRESS);
                let acceptedSlippage = 1/100;
                if (sRomeAmount >= 100000000) {
                    sRomeAmount = 100000000;
                    if (bond.is_lp) {
                        console.log(`Bonding ${ethers.utils.formatUnits(sRomeAmount, "gwei")} for ${bond.bond}`)
                        await bondLP(bondBotContract, bondContract, wallet, bond.address, bond.lp_token_address, romeAddresses.ROME_ADDRESS, bond.token_address, sRomeAmount, acceptedSlippage);
                        bond.is_live = true;
                    } else {
                        console.log(`Bonding ${ethers.utils.formatUnits(sRomeAmount, "gwei")} for ${bond.bond}`)
                        let extraToken = ZERO_ADDRESS;
                        if (bond.isMultiPath) {

                        }
                        await bondNormal(bondBotContract, bondContract, wallet, bond.address, romeAddresses.ROME_ADDRESS, bond.token_address, extraToken, sRomeAmount, acceptedSlippage);
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
    fs.writeFileSync("./data/romeBonds.json", data);
}

export { romeBonding }