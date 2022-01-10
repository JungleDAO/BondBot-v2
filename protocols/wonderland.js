import { ethers, utils } from "ethers";
import axios from "axios";
import StakingContract from "../abis/StakingContract.js";
import StakingHelperContract from "../abis/StakingHelperContract.js";
import MemoContract from "../abis/MemoContract.js";
import JoeLPTokenContract from "../abis/JoeLPTokenContract.js";
import TraderZapinContract from "../abis/TraderZapinContract.js";
import { avaxAddresses } from "../contants/addresses.js";
import { BigNumber } from "ethers";
import { getGasPrice } from "../helpers/getGasPrice.js"
import { sleep } from "../helpers/sleep.js";

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')

const stake = async (wallet, amount, address) => {
    try {
        console.log("Staking Time")
        const stakingHelper = new ethers.Contract(avaxAddresses.STAKING_HELPER, StakingHelperContract, wallet);

        let stakingtx = stakingHelper.stake(amount, address);
        
        var send = wallet.sendTransaction(stakingtx);

        send.then(function(tx) {
            console.log(tx);
        });

    }
    catch (e) {
        console.log(e);
    }
}

const unstake = async (wallet, memoAmount) => {
    try {
        console.log("Unstaking MEMO")
        const staking = new ethers.Contract(avaxAddresses.STAKING_ADDRESS, StakingContract, wallet);

        let unstakingtx = staking.unstake(memoAmount, true);
        
        var send = wallet.sendTransaction(unstakingtx);

        send.then(function(tx) {
            console.log(tx);
        });

    }
    catch (e) {
        console.log(e);
    }
}

const redeem = async (wallet, bondContract, adddress) => {
    try {
        const gasPrice = await getGasPrice(provider);
        const signer = bondContract.connect(wallet);
        let tx = await signer.redeem(
            adddress,
            true,
            { gasPrice, }
        );
        await tx.wait()
        sleep(15)
        console.log(tx);
    }
    catch (e) {
        console.log(e);
    }
}

const getStakingROI = async () => {
    const memoContract = new ethers.Contract(avaxAddresses.MEMO_ADDRESS, MemoContract, provider);
    const stakingContract = new ethers.Contract(avaxAddresses.STAKING_ADDRESS, StakingContract, provider);
    const epoch = await stakingContract.epoch();
    const stakingReward = epoch.distribute;
    const circ = await memoContract.circulatingSupply();
    const stakingRebase = stakingReward / circ;
    return Math.pow(1 + stakingRebase, 5 * 3) - 1;
}

const getBondDiscount = async (bondContract, bond) => {

    let marketPrice = await getMarketPrice();
    const mimPrice = await getTokenPrice("magic-internet-money");
    marketPrice = (marketPrice / Math.pow(10, 9)) * mimPrice;
    try {
        let bondPrice = await bondContract.bondPriceInUSD();
        if (bond.bond === "TIME-AVAX LP") {
            const avaxPrice = await getTokenPrice("avalanche-2"); 
            bondPrice = bondPrice * avaxPrice;
        }
        return (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;
    } catch (e) {
        console.log("error getting bondPriceInUSD", e);
    }
}

const getMarketPrice = async () => {
    const pairContract = new ethers.Contract(avaxAddresses.MIM_TIME_RESERVE_ADDRESS, JoeLPTokenContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[0] / reserves[1];
    return marketPrice;
}

const getTokenPrice = async (token) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`;
    const { data } = await axios.get(url);
    return data[token].usd
}

const bondNormal = async (bondBotContract, bondContract, wallet, bondAddress, tokenIn, tokenOut, memoAmount, acceptedSlippage) => {

    try {
        const calculatePremium = await bondContract.bondPrice();
        const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
        const gasPrice = await getGasPrice(provider);

        const signer = bondBotContract.connect(wallet);

        let tx = await signer.bond(
            bondAddress,
            memoAmount,
            tokenIn,
            tokenOut,
            maxPremium,
            { gasPrice, }
        );

        await tx.wait()
        sleep(15)
        console.log(tx);
    }
    catch (err) {
        console.log(err)
    }
}

const bondLP = async (bondBotContract, bondContract, wallet, bondAddress, lpTokenAddress, tokenIn, tokenOut, memoAmount, acceptedSlippage) => {

    try {
        const calculatePremium = await bondContract.bondPrice();
        const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
        const gasPrice = await getGasPrice(provider);

        const signer = bondBotContract.connect(wallet);

        let tx = await signer.bondLp(
            bondAddress,
            lpTokenAddress,
            tokenIn,
            tokenOut,
            memoAmount,
            maxPremium,
            { gasPrice, }
        );

        await tx.wait()
        sleep(15)
        console.log(tx);
    }
    catch (err) {
        console.log(err)
    }
}

const withdraw = async (bondBotContract, memoAmount, wallet) => {

    try {
        const gasPrice = await getGasPrice(provider);

        const signer = bondBotContract.connect(wallet);

        let tx = await signer.withdraw(
            addresses.MEMO_ADDRESS,
            memoAmount,
            { gasPrice, }
        );

        await tx.wait()
        sleep(15)
        console.log(tx);
    }
    catch (e) {
        console.log(e);
    }
}

export { stake, unstake, redeem, getStakingROI, getBondDiscount, bondNormal, bondLP, withdraw }