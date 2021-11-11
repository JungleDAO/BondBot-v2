import { ethers, utils, Wallet } from "ethers";
import addresses from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { redeem} from "./wonderland.js";

dotenv.config();

let data = fs.readFileSync("./data/bonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);

const autoclaim = async () => {
    const bondBotAddress = addresses.BOND_BOT_ADDRESS_2;
    for await (let bond of bonds["bonds"]) {

        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);

        if (bond.is_live) {
            let claimable;
            try {
                claimable = await bondContract.pendingPayoutFor(bondBotAddress);
                console.log(`${bond.bond} has ${ethers.utils.formatUnits(claimable, "gwei")} claimable rewards`);
                if (claimable == 0) {
                  bond.is_live = false;
                } else {
                    await redeem(wallet, bondContract, bondBotAddress);
                }
            } catch (e) {
                console.log("error redeeming: ", e);
            }
        }
    }
    let data = JSON.stringify(bonds);
    fs.writeFileSync("./data/bonds.json", data);
}

autoclaim();