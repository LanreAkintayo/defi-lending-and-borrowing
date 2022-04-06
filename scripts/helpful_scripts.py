from brownie import accounts, config, network, MockDAIToken, MockV3Aggregator, Contract
from web3 import Web3

LOCAL_BLOCKCHAIN_ENVIRONMENT = ["development", "ganache"]
FORKED_BLOCKCHAIN_ENVIRONMENT = ["mainnet-fork", "mainnet"]

def get_account(index=None, id=None):
    if index:
        return accounts[index]
    if id:
        return accounts.load_id(id)
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENT or network.show_active() in FORKED_BLOCKCHAIN_ENVIRONMENT:
        return accounts[0]
    return accounts.add(config["wallets"]["from_key1"])

contract_to_mock = {
    "dai_usd_price_feed_address": MockV3Aggregator,
    "dapp_usd_price_feed_address": MockV3Aggregator,
    "eth_usd_price_feed_address": MockV3Aggregator,
    "link_usd_price_feed_address": MockV3Aggregator,
    "fau_usd_price_feed_address": MockV3Aggregator,
    "dai_token_address": MockDAIToken,
    "weth_token_address": MockDAIToken,
    "link_token_address": MockDAIToken,
    "fau_token_address": MockDAIToken,
    "dapp_token_address": MockDAIToken
}

def get_contract(contract_name):
    """
    If we are on a local network, deploy a mock contract and return the contract
    If we are on a real network, Obtain a contract from abi and name of that mock contract. In other words, deploy a mock contract on the address of that real contract. Then return that mock contract
    """
    contract_type = contract_to_mock[contract_name]

    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        if len(contract_type) <= 0:
            deploy_mocks()
        contract = contract_type[-1]
    else:
        contract_address = config["networks"][network.show_active()][contract_name]
        contract = Contract.from_abi(contract_type._name, contract_address, contract_type.abi)
    return contract


def deploy_mocks():
    account = get_account()
    dapp_price_feed = MockV3Aggregator.deploy(8, 2 * 10**8, {"from": account})
    dapp_token = MockDAIToken.deploy({"from": account})
  

def toWei(amount):
    return Web3.toWei(amount, "ether")

