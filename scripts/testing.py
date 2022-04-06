from brownie import LendingAndBorrowing, config, network, LARToken
from scripts.helpful_scripts import get_account, get_contract, toWei
from web3 import Web3
import json
import yaml
import os
import shutil

KEPT_BALANCE = Web3.toWei(1000, "ether")

# brownie run scripts/testing.py 

token_info = {
    "dai_token": {"LTV": toWei(0.8), "stable_rate": toWei(0.025)},
    "weth_token": {"LTV": toWei(0.75), "stable_rate": toWei(0.01)},
    "link_token": {"LTV": toWei(0.8), "stable_rate": toWei(0.05)},
    "fau_token": {"LTV": toWei(0.85), "stable_rate": toWei(0.009)},
}


def main_deploy_lending_and_borrowing():

    owner = get_account()

    dai_token = get_contract("dai_token_address")
    weth_token = get_contract("weth_token_address")
    link_token = get_contract("link_token_address")
    fau_token = get_contract("fau_token_address")

    # token_to_price_feed = addTokenToPriceFeed(
    #     dai_token, weth_token, link_token, fau_token
    # )

    # add_token_to_price_feed_mapping(owner, dai_token, weth_token, link_token, fau_token)

    addTokensToLend(owner, dai_token, weth_token, link_token, fau_token)


def addTokensToLend(owner, *tokens):
    for token in tokens:
        print(f"Token: {token}")
        print(f"Token to string: {str(token)}")


def main():
    main_deploy_lending_and_borrowing()
