from brownie import LendingAndBorrowing, config, network, LARToken
from scripts.helpful_scripts import get_account, get_contract
from web3 import Web3
import json
import yaml
import os
import shutil

KEPT_BALANCE = Web3.toWei(1000, "ether")

# brownie run scripts/deploy_integration_lending_and_borrowing.py --network kovan
"""
Add tokens for lending
"""
def deploy_integration_lending_and_borrowing():

    owner = get_account()

    lar_token = LARToken.deploy({"from": owner})
    dapp_token = get_contract("dapp_token_address")

    dapp_usd_price_feed = get_contract("dai_usd_price_feed_address")

    token_to_price_feed = {
        dapp_token: dapp_usd_price_feed,
        lar_token: dapp_usd_price_feed,
    }

    lending_and_borrowing = LendingAndBorrowing.deploy(
        lar_token.address,
        {"from": owner},
        publish_source=config["networks"][network.show_active()].get("verify", False)
        )

    tx0 = lar_token.transfer(lending_and_borrowing, lar_token.totalSupply() - KEPT_BALANCE, {"from": owner})
    tx0.wait(1)

    
    dapp_usd_price_feed = get_contract("dai_usd_price_feed_address")

    token_to_price_feed = {
        lar_token: dapp_usd_price_feed,
        dapp_token: dapp_usd_price_feed
    }

    tx1 = lending_and_borrowing.addTokenToPriceFeedMapping(lar_token, token_to_price_feed[lar_token], {"from": owner})
    tx1.wait(1)
    
    tx2 = lending_and_borrowing.addTokenToPriceFeedMapping(dapp_token, token_to_price_feed[dapp_token], {"from": owner})
    tx2.wait(1)

    tx3 = lending_and_borrowing.addTokensForLending("LAR", lar_token.address, 0.8 * (10**18), 0.05 * (10**18), {"from": owner})
    tx3.wait(1)

    tx4 = lending_and_borrowing.addTokensForLending("DAP", dapp_token, 0.75 * (10**18), 0.05 * (10**18), {"from": owner})
    tx4.wait(1)

    tx5 = lending_and_borrowing.addTokensForBorrowing("LAR", lar_token.address, 0.8 * (10**18), 0.05 * (10**18), {"from": owner})
    tx5.wait(1)

    tx6 = lending_and_borrowing.addTokensForBorrowing("DAPP", dapp_token, 0.75 * (10**18), 0.05 * (10**18), {"from": owner})
    tx6.wait(1)

    return lending_and_borrowing, lar_token, dapp_token

def main():
    deploy_integration_lending_and_borrowing()




