from scripts.deploy_integration_lending_and_borrowing import (
    deploy_integration_lending_and_borrowing,
    KEPT_BALANCE,
)
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENT,
    get_contract,
    get_account,
)
import pytest
from brownie import network, exceptions, accounts, config
from web3 import Web3


def toWei(amount):
    return Web3.toWei(amount, "ether")


def test_lending_integration():
    # brownie test tests/integration/test_lending_and_borrowing.py -k test_lending_integration --network kovan

    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENT:
        pytest.skip("Only applicable for local network")

    owner = get_account()
    account = accounts.add(config["wallets"]["from_key2"])
    another_lender = accounts.add(config["wallets"]["from_key3"])

    (
        lending_and_borrowing,
        lar_token,
        dapp_token,
    ) = deploy_integration_lending_and_borrowing()

    lar_token.transfer(account, toWei(10), {"from": owner})
    lar_token.transfer(another_lender, toWei(10), {"from": owner})

    prev_lar_token_balance = lar_token.balanceOf(account)
    prev_dapp_account_balance = dapp_token.balanceOf(account)

    """I'm making sure that when the user lends a token, the user should allow the rewarded lar_token to be burned."""

    lar_token.approve(lending_and_borrowing.address, toWei(1), {"from": account})
    lending_and_borrowing.lend(lar_token, toWei(1), {"from": account})
    lar_token.approve(
        lending_and_borrowing.address, lar_token.balanceOf(account), {"from": account}
    )

    dapp_token.approve(lending_and_borrowing.address, toWei(0.1), {"from": account})
    lending_and_borrowing.lend(dapp_token, toWei(0.1), {"from": account})
    lar_token.approve(
        lending_and_borrowing.address, lar_token.balanceOf(account), {"from": account}
    )

    dapp_token.approve(
        lending_and_borrowing.address, toWei(1), {"from": another_lender}
    )
    lending_and_borrowing.lend(dapp_token, toWei(1), {"from": another_lender})
    lar_token.approve(
        lending_and_borrowing.address,
        lar_token.balanceOf(another_lender),
        {"from": another_lender},
    )

    # assert Web3.toWei(0.09, "ether") <= lar_token.balanceOf(account) < Web3.toWei(0.12, "ether")
    assert dapp_token.balanceOf(account) == prev_dapp_account_balance - toWei(0.1)
    print(
        "price feed we are using for lar_token: ",
        lending_and_borrowing.tokenToPriceFeed(lar_token),
    )
    assert lar_token.balanceOf(account) == prev_lar_token_balance - toWei(
        1
    ) + lending_and_borrowing.getAmountInDollars(
        toWei(1), lar_token
    ) + lending_and_borrowing.getAmountInDollars(
        toWei(0.1), dapp_token
    )

    assert len(lending_and_borrowing.getLendersArray()) == 2
    assert lending_and_borrowing.noOfTokensLent() == 3
    assert lending_and_borrowing.lenders(0) == account
    assert lending_and_borrowing.lenders(1) == another_lender
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == toWei(1)
    assert lending_and_borrowing.tokensLent(0, account) == lar_token
    assert lending_and_borrowing.tokensLent(1, account) == dapp_token
    assert lending_and_borrowing.tokensLent(2, another_lender) == dapp_token

    return lending_and_borrowing, lar_token, dapp_token, account, another_lender


# brownie test -k test_lending --network kovan

def test_borrow_integration():
    # brownie test tests/integration/test_lending_and_borrowing.py -k test_borrow_integration --network kovan

    lending_and_borrowing, lar_token, dapp_token, account, another_lender = test_lending_integration()


    amount_available_for_borrow = lending_and_borrowing.getUserTotalAmountAvailableForBorrowInDollars(account)

    """
    Account lent:
    0.1 dapp of 75% LTV with and 1 LAR of 80% LTV
    0.1 dapp IN DOLLARS = toWei(10) * 2 * 0.75 || getAmountInDollars(0.1, dapp_token) * 0.75
    1 LAR IN DOLLARS = toWei(10) * 2 * 0.8 || getAmountInDollars(1, lar_token) * 0.8

    Total Available to Borrow = 1.5 * toWei(10) + 1.6 * toWei(10) = 1.75 * 10^20 || getAmountInDollars(0.1, dapp_token) * 0.75 + getAmountInDollars(1, lar_token) * 0.8

    """


    assert amount_available_for_borrow == (lending_and_borrowing.getAmountInDollars(toWei(0.1), dapp_token) * 0.75) + (lending_and_borrowing.getAmountInDollars(toWei(1), lar_token) * 0.8)
    # assert lending_and_borrowing.getAmountInDollars(toWei(10), dapp_token) == 2 * toWei(10)

    lending_and_borrowing.borrow(toWei(0.04), dapp_token, {"from": account})
    lending_and_borrowing.borrow(toWei(0.2), lar_token, {"from": account})
    lending_and_borrowing.borrow(toWei(0.1), lar_token, {"from": account})
    lending_and_borrowing.borrow(toWei(0.5), lar_token, {"from": another_lender})

    # assert lending_and_borrowing.tokensBorrowedAmount(dapp_token, account) == toWei(0.04)
    # assert dapp_token.balanceOf(lending_and_borrowing) == toWei(0.16)

    assert lending_and_borrowing.noOfTokensBorrowed() == 3
    assert len(lending_and_borrowing.getBorrowersArray()) == 2
    assert lending_and_borrowing.borrowers(0) == account
    assert lending_and_borrowing.tokensBorrowed(0, account) == dapp_token

    return lending_and_borrowing, lar_token, dapp_token, account, another_lender

     # account has 10 lar token + lending_and_borrowing.getAmountInDollars(toWei(1), lar_token) + lending_and_borrowing.getAmountInDollars(toWei(0.1), dapp_token) + 
 # account has dapp_token.balanceOf(account) - toWei(0.1)


# def test_pay_debt_integration():

#     # brownie test tests/integration/test_lending_and_borrowing.py -k test_pay_debt_integration --network kovan
#     """
#     Test that the token amount I owe has reduced after paying some debt
#     Pay all your debt and check if your name will be removed from the debtors
#     Pay all the debt of a token and check if the balance that will be there will be zero
#     Make sure that the token along with the interest is collected from the debtor.

#     account borrowed 4 ade token.
#     another_lender borrowed only 2 lar_token
#     Total borrowed in dollars = toWei(2) * 2

#     another_lender lent 1 dapp token and borrowed 0.5 lar_token 
#     """


#     lending_and_borrowing, lar_token, dapp_token, account, another_lender = test_borrow_integration()

#     # assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == toWei(2)
#     assert lending_and_borrowing.getTotalAmountBorrowedInDollars(another_lender) == lending_and_borrowing.getAmountInDollars(toWei(0.5), lar_token)
#     assert lar_token.balanceOf(another_lender) == toWei(10) + lending_and_borrowing.getAmountInDollars(toWei(1), dapp_token) + toWei(0.5)

#     another_lender_lar_token_balance_before_tx = lar_token.balanceOf(another_lender)

#     lar_token.approve(lending_and_borrowing, toWei(0.275), {"from": another_lender})
#     lending_and_borrowing.payDebt(lar_token, toWei(0.25), {"from": another_lender})
#     amount_to_pay_back = toWei(0.275)

#     assert lar_token.balanceOf(another_lender) == another_lender_lar_token_balance_before_tx - amount_to_pay_back

#     assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == toWei(0.25)
#     assert lending_and_borrowing.getTotalAmountBorrowedInDollars(another_lender) == lending_and_borrowing.getAmountInDollars(toWei(0.25), lar_token)
#     assert len(lending_and_borrowing.getBorrowersArray()) == 2

#     lar_token.approve(lending_and_borrowing, toWei(0.2625), {"from": another_lender})
#     lending_and_borrowing.payDebt(lar_token, toWei(0.25), {"from": another_lender})

#     assert len(lending_and_borrowing.getBorrowersArray()) == 1
#     assert lending_and_borrowing.tokensBorrowedAmount(lar_token, another_lender) == 0


# def test_withdraw_integration():

    # brownie test tests/integration/test_lending_and_borrowing.py -k test_withdraw_integration --network kovan

    """
    After lending. Try to withdraw.
    Make sure that the token is transferred back to your account and lar rewarded token is removed from your account.
    Check if the amount you lend reduced
    Check if after withdrawing everything you supplied, your name is no more in the list of lenders


    Account lent 1 lar token and  0.1 dapp token

    """

    lending_and_borrowing, lar_token, dapp_token, account, another_lender = test_lending_integration()

    lar_token_account_balance_before = lar_token.balanceOf(account)

    lending_and_borrowing.withdraw(lar_token, toWei(0.5), {"from": account})
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == toWei(0.5)
    assert lar_token.balanceOf(account) == lar_token_account_balance_before + toWei(0.5) - lending_and_borrowing.getAmountInDollars(toWei(0.5), lar_token)

    lar_token_account_balance_current = lar_token.balanceOf(account)

    lending_and_borrowing.withdraw(lar_token, toWei(0.5), {"from": account})
    assert lending_and_borrowing.tokensLentAmount(lar_token, account) == 0
    assert lar_token.balanceOf(account) == lar_token_account_balance_current + toWei(0.5) - lending_and_borrowing.getAmountInDollars(toWei(0.5), lar_token)

    lar_token_account_balance_newest = lar_token.balanceOf(account)

    lending_and_borrowing.withdraw(dapp_token, toWei(0.1), {"from": account})
    assert lending_and_borrowing.tokensLentAmount(dapp_token, account) == 0
    assert lar_token.balanceOf(account) == lar_token_account_balance_newest - lending_and_borrowing.getAmountInDollars(toWei(0.1), dapp_token)


    assert len(lending_and_borrowing.getLendersArray()) == 1
