import { ethers, utils, Wallet } from "ethers";
import {avaxAddresses, polyAddresses, romeAddresses} from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContractv3 from "./abis/BondBotv7Contract.js";
import PolyBondBotv2 from "./abis/PolyBondBotv2.js";
import RomeBondBot from "./abis/RomeBondBotContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { withdraw } from "./protocols/rome.js";
// import { getTimeBalance } from "./helpers/getTimeBalance.js";
import { klimaBonding } from "./processes/klimaBonding.js";
import { timeBonding } from "./processes/timeBonding.js";
import { romeBonding } from "./processes/romeBonding.js";
import MemoContract from "./abis/MemoContract.js";

dotenv.config();

// const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
// let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
// wallet = wallet.connect(provider);

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
let wallet = Wallet.fromMnemonic(process.env.MOONRIVER_MNEMONIC);
wallet = wallet.connect(provider);

// const provider = new ethers.providers.JsonRpcProvider('https://matic-mainnet.chainstacklabs.com')
// let wallet = Wallet.fromMnemonic(process.env.KLIMA_MNEMONIC);
// wallet = wallet.connect(provider);

const main = async () => {
    klimaBonding();
    // timeBonding();
//    romeBonding();
}


const withdrawBalance = async () => {
    const bondBotContract = new ethers.Contract(romeAddresses.BOND_BOT_ADDRESS, RomeBondBot, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(romeAddresses.SROME_ADDDRESS);
    console.log(memoAmount.toNumber())
    // let memoAmount = 10000000;
    if (memoAmount > 0) {
        await withdraw(bondBotContract, memoAmount, wallet);
    }
}

const changeOwner1 = async () => {
    const bondBotContract = new ethers.Contract(polyAddresses.BOND_BOT_ADDRESS_4, PolyBondBotv2, wallet);
    await changeOwner(bondBotContract, process.env.MY_ADDRESS, wallet)
}

const test = async () => {
    const erc20Contract = new ethers.Contract('0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', MemoContract, wallet)
    let amount = await erc20Contract.balanceOf('0x9Faa04cd0A0B0624560315c9630f36d9192C67B5');
    console.log(amount.toNumber())
}

main();
