# BondBot-v2

## Overview
This project was created in order to maximise returns from the bonding and staking mechanism on OHM forks. We found that by utilizing high bond discounts we could increase our ROI signigicantly.
By staking in these protocols, the protocol returned high yields to the token holders. And bonding offered the native tokens at a discount. The amount receieved from the bond was distributed back to the user over a 5 day period. So after one day, 20% of the bond was claimable by the user.

## Example
For this example I will use Wonderland as the protocol.
Native token - TIME
Staked token - MEMO

Back in late 2021 we were seeing 5 day staking ROI at around 9.5%. Bond discounts were hitting as far as 10% on a regular basis.
I did some calulations to see at what bond discount would it be more profitbale to bond than to stake. When we bond the reward is vested over a 5 day period. So before every epoch(8 hours) we would claim whatever TIME was available and stake this so we could get the rebase from staking.
If 5 day staking ROI was 9.5%, I found that we could beat this ROI from bonding at 4.3%
<img width="875" alt="image" src="https://user-images.githubusercontent.com/91339550/174036508-d2052ea1-cf19-4979-9869-0e982c2aaf91.png">

But bond discounts were regularly hitting close to 10%. (https://docs.google.com/spreadsheets/d/12dMhS-viziuKBGoSdEvxmhDL-KJ57BVBNG_APYQOGb4/edit?usp=sharing)

So if we bonded at 10% discount we were hitting around 15.5% 5 day ROI. This compounded over a year eqautes to ~3.7M% APY, compared to the staking APY of ~75k%. 
<img width="875" alt="image" src="https://user-images.githubusercontent.com/91339550/174039329-30f24c3a-f5c0-45ed-86ec-c619d09094d7.png">

Link to APY calculations
https://docs.google.com/spreadsheets/d/16nvW_6TaA2smJjPZlKd-16SStGgC6Zz9ULM9UzCuSZ0/edit?usp=sharing

### Bondbot contracts can be found here https://github.com/JungleDAO/bond-bot-contracts

