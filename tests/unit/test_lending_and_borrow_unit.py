from scripts.deploy_lending_and_borrowing import deploy_lending_and_borrowing, KEPT_BALANCE
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENT,
    get_contract,
    get_account,
)
import pytest
from brownie import network, exceptions
from web3 import Web3


def unit_test_tokens_lent_array():
    """
    Test if tokens lent array has that dai token address inside
    """
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        pytest.skip("Only applicable for local network")

    account = get_account()

    lending_and_borrowing = deploy_lending_and_borrowing()

    dapp_token = get_contract("dapp_token_address")

    assert lending_and_borrowing.tokensForLending(0) == dapp_token

    # with pytest.raises(exceptions.VirtualMachineError):
    #     token_farm.setTokenPriceFeedContract(weth_token.address, weth_usd_price_feed.address, {"from": non_owner})


def toWei(amount):
    return Web3.toWei(amount, "ether")

def test_lending():
    # brownie test tests/unit/test_lending_and_borrow_unit.py -k test_lending

    amount = Web3.toWei(10, "ether")

    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        pytest.skip("Only applicable for local network")

    owner = get_account()
    account = get_account(1)
    another_lender = get_account(2)

    lending_and_borrowing, lar_token, ade_token = deploy_lending_and_borrowing()
    
    lar_token.transfer(account, toWei(100),  {"from": owner})
    ade_token.transfer(account, toWei(100), {"from": owner})
    ade_token.transfer(another_lender, toWei(100), {"from": owner})
    

    prev_ade_account_balance = ade_token.balanceOf(account)
    prev_lar_token_balance = lar_token.balanceOf(account)

    """I'm making sure that when the user lends a token, the user should allow the rewarded lar_token to be burned."""
    account_balance = lar_token.balanceOf(account)
    lar_token.approve(lending_and_borrowing.address, amount, {"from": account})
    lending_and_borrowing.lend(lar_token, amount, {"from": account})
    lar_token.approve(lending_and_borrowing.address, lar_token.balanceOf(account), {"from": account})
    
    ade_token.approve(lending_and_borrowing.address, toWei(10), {"from": account})
    lending_and_borrowing.lend(ade_token, toWei(10), {"from": account})    
    lar_token.approve(lending_and_borrowing.address, lar_token.balanceOf(account), {"from": account})

    
    ade_token.approve(lending_and_borrowing.address, toWei(10), {"from": another_lender})
    lending_and_borrowing.lend(ade_token, toWei(10), {"from": another_lender})
    lar_token.approve(lending_and_borrowing.address, lar_token.balanceOf(another_lender), {"from": another_lender})

    print("Current lar_token allowance of account after lending: ", lar_token.allowance(account, lending_and_borrowing))




    # assert Web3.toWei(0.09, "ether") <= lar_token.balanceOf(account) < Web3.toWei(0.12, "ether") 
    assert ade_token.balanceOf(account) == prev_ade_account_balance - toWei(10)
    assert lar_token.balanceOf(account) == prev_lar_token_balance - toWei(10) + (2 * toWei(10)) + (2 * toWei(10))

    assert len(lending_and_borrowing.getLendersArray()) == 2
    assert lending_and_borrowing.noOfTokensLent() == 3
    assert lending_and_borrowing.lenders(0) == account 
    assert lending_and_borrowing.lenders(1) == another_lender 
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == amount 
    assert lending_and_borrowing.tokensLent(0, account) == lar_token
    assert lending_and_borrowing.tokensLent(1, account) == ade_token
    assert lending_and_borrowing.tokensLent(2, another_lender) == ade_token

    return lending_and_borrowing, lar_token, ade_token, account, another_lender

# brownie test -k test_lending --network kovan

def test_borrow():
    # brownie test tests/unit/test_lending_and_borrow_unit.py -k test_borrow

    lending_and_borrowing, lar_token, ade_token, account, another_lender = test_lending()

    
    amount_available_for_borrow = lending_and_borrowing.getUserTotalAmountAvailableForBorrowInDollars(account)

    """
    Account lent:
    10 ADE of 75% LTV with and 10 LAR of 80% LTV
    10 ADE IN DOLLARS = toWei(10) * 2 * 0.75
    10 LAR IN DOLLARS = toWei(10) * 2 * 0.8

    Total Available to Borrow = 1.5 * toWei(10) + 1.6 * toWei(10) = 1.75 * 10^20

    """
  

    assert amount_available_for_borrow == 1.5 * toWei(10) + 1.6 * toWei(10)
    assert lending_and_borrowing.getAmountInDollars(toWei(10), ade_token) == 2 * toWei(10)

    lending_and_borrowing.borrow(toWei(4), ade_token, {"from": account})
    lending_and_borrowing.borrow(toWei(2), lar_token, {"from": account})
    lending_and_borrowing.borrow(toWei(1), lar_token, {"from": account})
    lending_and_borrowing.borrow(toWei(2), lar_token, {"from": another_lender})

    assert lending_and_borrowing.tokensBorrowedAmount(ade_token, account) == toWei(4)
    assert ade_token.balanceOf(lending_and_borrowing) == toWei(16)

    assert lending_and_borrowing.noOfTokensBorrowed() == 3
    assert len(lending_and_borrowing.getBorrowersArray()) == 2
    assert lending_and_borrowing.borrowers(0) == account 
    assert lending_and_borrowing.tokensBorrowed(0, account) == ade_token

    return lending_and_borrowing, lar_token, ade_token, account, another_lender

def test_pay_debt():

    # brownie test tests/unit/test_lending_and_borrow_unit.py -k test_pay_debt
    """
    Test that the token amount I owe has reduced after paying some debt
    Pay all your debt and check if your name will be removed from the debtors
    Pay all the debt of a token and check if the balance that will be there will be zero
    Make sure that the token along with the interest is collected from the debtor.

    account borrowed 4 ade token.
    another_lender borrowed only 2 lar_token
    Total borrowed in dollars = toWei(2) * 2
    """


    lending_and_borrowing, lar_token, ade_token, account, another_lender = test_borrow()
    
    assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == toWei(2)
    assert lending_and_borrowing.getTotalAmountBorrowedInDollars(another_lender) == toWei(2) * 2
    assert lar_token.balanceOf(another_lender) == toWei(22)

    another_lender_lar_token_balance_before_tx = lar_token.balanceOf(another_lender)

    lar_token.approve(lending_and_borrowing, toWei(1.1), {"from": another_lender})
    lending_and_borrowing.payDebt(lar_token, toWei(1), {"from": another_lender})
    amount_to_pay_back = toWei(1.1)

    assert lar_token.balanceOf(another_lender) == another_lender_lar_token_balance_before_tx - amount_to_pay_back

    assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == toWei(1)
    assert lending_and_borrowing.getTotalAmountBorrowedInDollars(another_lender) == toWei(1) * 2
    assert len(lending_and_borrowing.getBorrowersArray()) == 2

    lar_token.approve(lending_and_borrowing, toWei(1.05), {"from": another_lender})
    lending_and_borrowing.payDebt(lar_token, toWei(1), {"from": another_lender})

    assert len(lending_and_borrowing.getBorrowersArray()) == 1
    assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == 0
    


def test_withdraw():

    # brownie test tests/unit/test_lending_and_borrow_unit.py -k test_withdraw
    
    """
    After lending. Try to withdraw. 
    Make sure that the token is transferred back to your account and lar rewarded token is removed from your account.
    Check if the amount you lend reduced
    Check if after withdrawing everything you supplied, your name is no more in the list of lenders

    
    Before lending, account has 100 lar token and 100 ade token 
    account supplies 10 lar token, 10 ade token

    toWei(100) + toWei(5) 

    """

    lending_and_borrowing, lar_token, ade_token, account, another_lender = test_lending()

    lar_token_account_balance_before = lar_token.balanceOf(account)

    lending_and_borrowing.withdraw(lar_token, toWei(5), {"from": account})
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == toWei(5)
    assert lar_token.balanceOf(account) == lar_token_account_balance_before + toWei(5) - (2 * toWei(5))

    lar_token_account_balance_current = lar_token.balanceOf(account)

    lending_and_borrowing.withdraw(lar_token, toWei(5), {"from": account})
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == 0
    assert lar_token.balanceOf(account) == lar_token_account_balance_current + toWei(5) - (2 * toWei(5))
    
    print("Current lar_token allowance of account: ", lar_token.allowance(account, lending_and_borrowing))
    lending_and_borrowing.withdraw(ade_token, toWei(10), {"from": account})

    assert len(lending_and_borrowing.getLendersArray()) == 1



    
