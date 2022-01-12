import { ethers, utils, Wallet } from "ethers";
import {avaxAddresses} from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContractv3 from "./abis/BondBotv7Contract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { withdraw, changeOwner } from "./protocols/wonderland.js";
// import { getTimeBalance } from "./helpers/getTimeBalance.js";
// import { klimaBonding } from "./processes/klimaBonding.js";
import { timeBonding } from "./processes/timeBonding.js";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);

const main = async () => {
    // klimaBonding();
    timeBonding();
}


const withdrawBalance = async () => {
    const bondBotContract = new ethers.Contract(avaxAddresses.BOND_BOT_ADDRESS_10, BondBotContractv3, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(avaxAddresses.MEMO_ADDRESS);
    console.log(memoAmount.toNumber())
    // let memoAmount = 10000000;
    if (memoAmount > 0) {
        await withdraw(bondBotContract, memoAmount, wallet);
    }
}

const changeOwner1 = async () => {
    const bondBotContract = new ethers.Contract(avaxAddresses.BOND_BOT_ADDRESS_10, BondBotContractv3, wallet);
    await changeOwner(bondBotContract, process.env.MY_ADDRESS, wallet)
}

main();
