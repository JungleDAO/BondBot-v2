import { ethers, utils, Wallet } from "ethers";
import axios from "axios";
import addresses from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContractv3 from "./abis/BondBotv3Contract.js";
import BondBotContractv4 from "./abis/BondBotv4Contract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { stake, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw } from "./wonderland.js";
import { getTimeBalance } from "./helpers/getTimeBalance.js"

dotenv.config();

let data = fs.readFileSync("./data/bonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);

const main = async () => {
    const bondBotAddress = addresses.BOND_BOT_ADDRESS_7;
    const bondBotContract = new ethers.Contract(bondBotAddress, BondBotContractv4, wallet);

    // First we check the five day staking ROI
    const fiveDayRate = await getStakingROI()
    console.log(`Staking 5-day ROI - ${(Number(fiveDayRate) * 100).toFixed(3)}%`)

    // Then we loop through each bond to see if there are any profitable bonds that beat 5 day staking
    for await (let bond of bonds["bonds"]) {
        const bondContract = new ethers.Contract(bond.address, TimeBondDepositoryContract, provider);
        let bondDiscount = await getBondDiscount(bondContract, bond);

        let trigger = (fiveDayRate * 0.06) + fiveDayRate;
        
        // if bond it better than the staking ROI by 6%
        // if (bondDiscount > trigger) {
        if (bond.bond == 'TIME-MIM LP') {
            try {
                let memoAmount = await bondBotContract.getTokenBalance(addresses.MEMO_ADDRESS);
                let acceptedSlippage = 0.1/100;
                memoAmount = 10000000;
                if (memoAmount >= 100000) {
                    if (bond.is_lp) {
                        console.log(`Bonding ${ethers.utils.formatUnits(memoAmount, "gwei")} for ${bond.bond}`)
                        await bondLP(bondBotContract, bondContract, wallet, bond.address, bond.lp_token_address, addresses.TIME_ADDRESS, bond.token_address, memoAmount, acceptedSlippage);
                        bond.is_live = true;
                    } else {
                        console.log(`Bonding ${ethers.utils.formatUnits(memoAmount, "gwei")} for ${bond.bond}`)
                        await bondNormal(bondBotContract, bondContract, wallet, bond.address, addresses.TIME_ADDRESS, bond.token_address, memoAmount, acceptedSlippage);
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
    const bondBotContract = new ethers.Contract(addresses.SDOG_TRADE_ADDRESS, BondBotContractv3, wallet);
    let memoAmount = await bondBotContract.getTokenBalance(addresses.MEMO_ADDRESS);
    
    // let memoAmount = 10000000;
    if (memoAmount > 0) {
        await withdraw(bondBotContract ,memoAmount, wallet);
    }
}

main();
