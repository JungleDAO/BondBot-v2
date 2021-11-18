import { ethers, utils, Wallet } from "ethers";
import axios from "axios";
import addresses from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContract from "./abis/BondBotContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { getGasPrice } from "./helpers/getGasPrice.js"
import { stake, unstake, redeem, getStakingROI, getBondDiscount, zapinLpData, zapinData, zapinLp, zapin, withdraw } from "./wonderland.js";
import { sleep } from "./helpers/sleep.js"
import { getTimeBalance } from "./helpers/getTimeBalance.js"
import { Console } from "console";

dotenv.config();

let data = fs.readFileSync("./data/bonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);

const main = async () => {
    const bondBotAddress = addresses.BOND_BOT_ADDRESS_3;
    const bondBotContract = new ethers.Contract(bondBotAddress, BondBotContract, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(addresses.MEMO_ADDRESS);
    console.log(memoAmount.toNumber())

    // First we check the five day staking ROI
    const fiveDayRate = await getStakingROI()
    console.log(`Staking 5-day ROI - ${(Number(fiveDayRate) * 100).toFixed(3)}%`)

    // Then we loop through each bond to see if there are any profitable bonds that beat 5 day staking
    for await (let bond of bonds["bonds"]) {

        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let bondDiscount = await getBondDiscount(bondContract, bond);

        let trigger = (fiveDayRate * 0.06) + fiveDayRate;
        let swapTarget = "";
        let swapData = "";
        let amount = "";
        
        // if bond it better than the staking ROI by 6%
        if (bondDiscount > trigger) {
            try {
                let memoAmount = await bondBotContract.getTokenBalance(addresses.MEMO_ADDRESS);
                let acceptedSlippage = 0.1/100;
                if (memoAmount >= 500000000) {
                    if (bond.is_lp) {
                        [swapTarget, swapData, amount] = await zapinLpData(bond.lp_token_address, memoAmount, acceptedSlippage);
                        console.log(`Bonding ${ethers.utils.formatUnits(memoAmount, "gwei")} LP for ${bond.bond}`)
                        await zapinLp(bondBotContract, bondContract, wallet, bond.address, memoAmount, amount, swapTarget, swapData, acceptedSlippage);
                        bond.is_live = true;
                    } else {
                        [swapTarget, swapData, amount] = await zapinData(bond.token_address, memoAmount, acceptedSlippage);
                        console.log(`Bonding ${memoAmount} for ${bond.bond}`)
                        await zapin(bondBotContract, bondContract, wallet, bond.address, memoAmount, amount, swapTarget, swapData, acceptedSlippage);   
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


const withdrawBalance = async () => {
    const bondBotContract = new ethers.Contract(addresses.BOND_BOT_ADDRESS_2, BondBotContract, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(addresses.MEMO_ADDRESS);
    if (memoAmount > 0) {
        console.log(memoAmount.toNumber())
        await withdraw(bondBotContract ,memoAmount, wallet);
    }
}

main();
