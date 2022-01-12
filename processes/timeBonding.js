import { ethers, Wallet } from "ethers";
import { polyAddresses } from "../contants/addresses.js";
import TimeBondDepositoryContract from "../abis/TimeBondDepositoryContract.js";
import BondBotContractv6 from "../abis/BondBotv6Contract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { stake, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw } from "../protocols/wonderland.js";
import { getTimeBalance } from "../helpers/getTimeBalance.js"
import { avaxAddresses } from "../contants/addresses.js";
import { totalmem } from "os";

dotenv.config();

let data = fs.readFileSync("./data/bonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);

const timeBonding = async () => {
    const bondBotAddress = avaxAddresses.BOND_BOT_ADDRESS_9;
    const bondBotContract = new ethers.Contract(bondBotAddress, BondBotContractv6, wallet);

    // First we check the five day staking ROI
    const fiveDayRate = await getStakingROI()
    console.log(`Wonderland Staking 5-day ROI - ${(Number(fiveDayRate) * 100).toFixed(3)}%`)

    // Then we loop through each bond to see if there are any profitable bonds that beat 5 day staking
    for await (let bond of bonds["bonds"]) {
        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let bondDiscount = await getBondDiscount(bondContract, bond);

        let trigger = (fiveDayRate * 0.06) + fiveDayRate;
        
        // if bond it better than the staking ROI by 6%
        // if (bondDiscount > trigger) {
        if (bond.bond == 'MIM') {
            try {
                let memoAmount = await bondBotContract.getTokenBalance(avaxAddresses.MEMO_ADDRESS);
                let acceptedSlippage = 0.1/100;
                memoAmount = 10000000;
                if (memoAmount >= 10000000) {
                    if (bond.is_lp) {
                        let tokenA = avaxAddresses.TIME_ADDRESS;
                        if (bond.bond == "WMEMO-MIM LP") {
                            tokenA = avaxAddresses.WMEMO_ADDRESS;
                        }
                        console.log(`Bonding ${ethers.utils.formatUnits(memoAmount, "gwei")} for ${bond.bond}`)
                        await bondLP(bondBotContract, bondContract, wallet, bond.address, bond.lp_token_address, tokenA, bond.token_address, memoAmount, bond.isSushi, bond.isWmemo, acceptedSlippage);
                        bond.is_live = true;
                    } else {
                        console.log(`Bonding ${ethers.utils.formatUnits(memoAmount, "gwei")} for ${bond.bond}`)
                        await bondNormal(bondBotContract, bondContract, wallet, bond.address, avaxAddresses.TIME_ADDRESS, bond.token_address, memoAmount, bond.isWeth, bond.isSushi, acceptedSlippage);
                        bond.is_live = true;
                    }
                }
            } catch (err) {
                console.log(err);
            }

        }
        bond.bond_discount = bondDiscount
    }
    let timeBalance = await getTimeBalance(process.env.MY_ADDRESS, provider);
    if (timeBalance > 0) {
        console.log('Cleaning up');
        await stake(wallet, timeBalance, process.env.MY_ADDRESS);
    }

    let data = JSON.stringify(bonds);
    fs.writeFileSync("./data/bonds.json", data);
}

export { timeBonding }