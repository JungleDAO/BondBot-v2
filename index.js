import { ethers, utils, Wallet } from "ethers";
import {avaxAddresses} from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContractv3 from "./abis/BondBotv3Contract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
// import { stake, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw } from "./wonderland.js";
// import { getTimeBalance } from "./helpers/getTimeBalance.js";
import { klimaBonding } from "./processes/klimaBonding.js";
import { timeBonding } from "./processes/timeBonding.js";

const main = async () => {
    // klimaBonding();
    timeBonding();
}


const withdrawBalance = async () => {
    const bondBotContract = new ethers.Contract(avaxAddresses.SDOG_TRADE_ADDRESS, BondBotContractv3, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(avaxAddresses.MEMO_ADDRESS);
    
    // let memoAmount = 10000000;
    if (memoAmount > 0) {
        await withdraw(bondBotContract ,memoAmount, wallet);
    }
}

main();
