from brownie import LendingAndBorrowing, config, network, LARToken
from scripts.helpful_scripts import get_account, get_contract, toWei
from web3 import Web3
import json
import yaml
import os
import shutil

KEPT_BALANCE = Web3.toWei(1000, "ether")

# brownie run scripts/main_deploy.py --network kovan

token_info = {
    "dai_token": {"name": "DAI", "LTV": toWei(0.8), "borrow_stable_rate": toWei(0.025)},
    "weth_token": {"name": "WETH", "LTV": toWei(0.75), "borrow_stable_rate": toWei(0.01)},
    "link_token": {"name": "LINK", "LTV": toWei(0.8), "borrow_stable_rate": toWei(0.05)},
    "fau_token": {"name": "FAU", "LTV": toWei(0.85), "borrow_stable_rate": toWei(0.009)},
}


def main_deploy_lending_and_borrowing():

    owner = get_account()

    lar_token = LARToken.deploy({"from": owner})

    dai_token = get_contract("dai_token_address")
    weth_token = get_contract("weth_token_address")
    link_token = get_contract("link_token_address")
    fau_token = get_contract("fau_token_address")

    token_to_price_feed = addTokenToPriceFeed(
        dai_token, weth_token, link_token, fau_token
    )

    lending_and_borrowing = LendingAndBorrowing.deploy(
        lar_token.address,
        {"from": owner},
        publish_source=config["networks"][network.show_active()].get("verify", True),
    )

    tx = lar_token.transfer(
        lending_and_borrowing, lar_token.totalSupply() - KEPT_BALANCE, {"from": owner}
    )
    tx.wait(1)

    add_token_to_price_feed_mapping(
        lending_and_borrowing, owner, token_to_price_feed, dai_token, weth_token, link_token, fau_token
    )

    addTokensToLend(lending_and_borrowing, owner, dai_token, weth_token, link_token, fau_token)

    addTokensToBorrow(lending_and_borrowing, owner, dai_token, weth_token, link_token, fau_token)

    update_front_end()


def addTokenToPriceFeed(dai_token, weth_token, link_token, fau_token):
    dai_usd_price_feed = get_contract("dai_usd_price_feed_address")
    weth_usd_price_feed = get_contract("eth_usd_price_feed_address")
    link_usd_price_feed = get_contract("link_usd_price_feed_address")
    fau_usd_price_feed = get_contract("fau_usd_price_feed_address")

    token_to_price_feed = {
        dai_token: dai_usd_price_feed,
        weth_token: weth_usd_price_feed,
        link_token: link_usd_price_feed,
        fau_token: fau_usd_price_feed,
    }

    return token_to_price_feed

def addTokensToLend(lending_and_borrowing, owner, dai_token, weth_token, link_token, fau_token):
    tx1 = lending_and_borrowing.addTokensForLending(
        token_info["dai_token"]["name"],
        dai_token.address,
        token_info["dai_token"]["LTV"],
        token_info["dai_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx1.wait(1)

    tx2 = lending_and_borrowing.addTokensForLending(
        token_info["weth_token"]["name"],
        weth_token.address,
        token_info["weth_token"]["LTV"],
        token_info["weth_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx2.wait(1)

    tx3 = lending_and_borrowing.addTokensForLending(
        token_info["link_token"]["name"],
        link_token.address,
        token_info["link_token"]["LTV"],
        token_info["link_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx3.wait(1)

    tx4 = lending_and_borrowing.addTokensForLending(
        token_info["fau_token"]["name"],
        fau_token.address,
        token_info["fau_token"]["LTV"],
        token_info["fau_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx4.wait(1)

def addTokensToBorrow(lending_and_borrowing, owner, dai_token, weth_token, link_token, fau_token):
    tx1 = lending_and_borrowing.addTokensForBorrowing(
        token_info["dai_token"]["name"],
        dai_token.address,
        token_info["dai_token"]["LTV"],
        token_info["dai_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx1.wait(1)

    tx2 = lending_and_borrowing.addTokensForBorrowing(
        token_info["weth_token"]["name"],
        weth_token.address,
        token_info["weth_token"]["LTV"],
        token_info["weth_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx2.wait(1)

    tx3 = lending_and_borrowing.addTokensForBorrowing(
        token_info["link_token"]["name"],
        link_token.address,
        token_info["link_token"]["LTV"],
        token_info["link_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx3.wait(1)

    tx4 = lending_and_borrowing.addTokensForBorrowing(
        token_info["fau_token"]["name"],
        fau_token.address,
        token_info["fau_token"]["LTV"],
        token_info["fau_token"]["borrow_stable_rate"],
        {"from": owner},
    )
    tx4.wait(1)

def add_token_to_price_feed_mapping(lending_and_borrowing, owner, token_to_price_feed, *tokens):

    for token in tokens:
        price_feed_address = token_to_price_feed[token]
        tx = lending_and_borrowing.addTokenToPriceFeedMapping(
            token, price_feed_address, {"from": owner}
        )
        tx.wait(1)

def update_front_end():
    # Sending folder to front end
    copy_folders_to_front_end("./build", "./front-end/public/build")

    # Sending the front end our config in json format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)

        with open("./front-end/public/brownie_config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    
    print("Front end updated")


def copy_folders_to_front_end(src, dest):
    # If that destination path already exists, remove it and copy
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    main_deploy_lending_and_borrowing()
