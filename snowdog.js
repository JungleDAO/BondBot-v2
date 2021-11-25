import { ethers, utils, Wallet } from "ethers";
import axios from "axios";
import addresses from "./contants/addresses.js";
import TimeBondDepositoryContract from "./abis/TimeBondDepositoryContract.js";
import BondBotContract from "./abis/BondBotContract.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { getGasPrice } from "./helpers/getGasPrice.js";
import { stake, unstake, redeem, getStakingROI, getBondDiscount, zapinLpData, zapinData, zapinLp, zapin, withdraw } from "./wonderland.js";
import { sleep } from "./helpers/sleep.js";
import { getTimeBalance } from "./helpers/getTimeBalance.js";
import SDOGTradeContract from "./abis/SDOGTradeContract.js";
import JoeLPTokenContract from "./abis/JoeLPTokenContract.js";
 
dotenv.config();

let data = fs.readFileSync("./data/bonds.json")
let bonds = JSON.parse(data)

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
let wallet = Wallet.fromMnemonic(process.env.MNEMONIC);
wallet = wallet.connect(provider);


const main = async () => {

    const sdogTradeContract = new ethers.Contract(addresses.SDOG_TRADE_ADDRESS, SDOGTradeContract, provider);
    const sdogPrice = await getMarketPrice();
    console.log(sdogPrice);

    if (parseFloat(sdogPrice) > 1000) {
        const gasPrice = await getGasPrice(provider);

        const signer = sdogTradeContract.connect(wallet);

        let tx = await signer.swapToken2Token(
            { gasPrice, }
        );

        await tx.wait()
        sleep(15)
        console.log(tx);
    }
}

const getMarketPrice = async () => {
    const pairContract = new ethers.Contract(addresses.SDOG_MIM_LP, JoeLPTokenContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[0] / reserves[1];
    return ethers.utils.formatUnits(Math.round(marketPrice), "gwei");
}

main();