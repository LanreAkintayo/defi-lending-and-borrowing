# defi-lending-and-borrowing
A full stack, fully-onchain DEFI app that enables users to supply tokens to the contract and are rewarded with some customly made ERC20 token (LAR) based on the amount of token they supply and also allows users to borrow tokens from it.

It is deployed on the Ethereum Kovan Network.

# Features
1. The contract supports 4 test tokens; DAI, WETH, WETH and FAU 😎
2. Users can either supply some tokens to the pool just to provide liquidity or user can supply to the pool for usage as collateral.
3. Users get rewarded with some LAR token when they supply to the pool. The LAR token rewarded to the user is calculated based on the token amount in dollars users supplied to the pool.
4. For any user to borrow from the pool, the user has to stake some token as collateral. The collateral is influenced greatly by the LTV (Loan To Value) ratio of that particular token to stake. Note that the collateral must actually be greater in value than the token you want to borrow from the pool.
5. The contract supports only stable APY rate for all tokens that can be borrowed. In other words, the amount of interest to pay at the end of the day is always constant.
6. When user is ready to pay the debt, the interest along with the token borrowed is taken from the user. Interest is calculated based on that stable APY rate. 
7. After repaying, user can withdraw the token staked as collateral from the pool.
8. When a user withdraws from the pool, the contract also collects some LAR tokens rewarded to the user. The LAR token that will be collected from the user is equivalent in value to the amount of token user wants to withdraw.

# Technologies
1. **Open Zeppelin**: The contract uses IERC20 of OpenZeppelin create an instance of a token and also, it uses the Ownable contract of the OpenZepppelin to ensure security of the contract
2. **Chainlink**: The contract uses the AggregatorV3Interface of chainlink to fetch real time price feeds.
3. **Brownie**: The smart contract framework used for the project is brownie. Brownie also provides a lot of functionalities that enables efficient unit and integration testing of all the methods of the contract.
4. **Ganache**: Ganache is used as blockchain for local testing. 
5. **Next JS**: Next JS is the front end framework used to ensure flexible user interaction.
6. **Tailwind CSS**
7. **Metamask**
8. **web3.js**


# Programming Languages
1. Solidity
2. Python
3. Javascript

# What to Install
1. brownie: Install brownie [here](https://eth-brownie.readthedocs.io/en/v1.4.1/install.html)
2. Tailwind CSS: Install tailwind css [here](https://tailwindcss.com/docs/installation)

# How to use
1.Run the main deployment script to deploy to the kovan network
```
brownie run scripts/main_deploy.py --network kovan
```
2. Start the Server
```
cd front-end
yarn dev
```
 # Developer
 Let's Connect! 👋 👋 
 ```
 Akintayo Lanre - 
    Email - akintayolanre2019@gmail.com
    Linkedin - https://www.linkedin.com/in/akintayo-lanre-b6462b238/
 ```


