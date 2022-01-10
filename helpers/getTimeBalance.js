import { ethers } from "ethers";
import TimeContract from "../abis/TimeContract.js";
import { avaxAddresses } from "../contants/addresses.js";

export const getTimeBalance = async (address, provider) => {

    const timeContract = new ethers.Contract(avaxAddresses.TIME_ADDRESS, TimeContract, provider);

    return await timeContract.balanceOf(address)

}