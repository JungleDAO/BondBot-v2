import { ethers, utils, Wallet } from "ethers";
import { avaxAddresses, romeAddresses } from "./contants/addresses.js";
import BondBotContractv6 from "./abis/BondBotv6Contract.js";
import RomeBondBot from "./abis/RomeBondBotContract.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { redeem } from "./protocols/rome.js";

dotenv.config();

let data = fs.readFileSync("./data/romeBonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://rpc.moonriver.moonbeam.network')
let wallet = Wallet.fromMnemonic(process.env.MOONRIVER_MNEMONIC);
wallet = wallet.connect(provider);

const autoclaim = async () => {
    const bondBotAddress = romeAddresses.BOND_BOT_ADDRESS_1;
    const bondBotContract = new ethers.Contract(bondBotAddress, RomeBondBot, wallet);
    for await (let bond of bonds["bonds"]) {
    const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let claimable;
        try {
            claimable = await bondContract.pendingPayoutFor(bondBotAddress);
            console.log(`${bond.bond} has ${ethers.utils.formatUnits(claimable, "gwei")} claimable rewards`);
            if (claimable == 0) {
                bond.is_live = false;
            } else {
                // await redeem(wallet, bondContract, bond.address);
            }
        } catch (e) {
            console.log("error redeeming: ", e);
        }
    }
    let data = JSON.stringify(bonds);
    fs.writeFileSync("./data/romeBonds.json", data);
}

autoclaim();