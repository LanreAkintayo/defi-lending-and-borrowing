// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Set up you contract to convert DAI to USD or ETH to USD
contract LendingAndBorrowing is Ownable {
    address[] public lenders;
    address[] public borrowers;

    mapping(address => mapping(address => uint256)) public tokensLentAmount;
    mapping(address => mapping(address => uint256)) public tokensBorrowedAmount;

    mapping(uint256 => mapping(address => address)) public tokensLent;
    mapping(uint256 => mapping(address => address)) public tokensBorrowed;

    mapping(address => address) public tokenToPriceFeed;

    mapping(uint256 => mapping(address => address)) public tokensLentOrBorrowed;

    struct Token {
        address tokenAddress;
        uint256 LTV;
        uint256 stableRate;
        string name;
    }

    Token[] public tokensForLending;
    Token[] public tokensForBorrowing;

    IERC20 public larToken;

    uint256 public noOfTokensLent = 0;
    uint256 public noOfTokensBorrowed = 0;

    constructor(address _token) {
        larToken = IERC20(_token);
    }

    function addTokensForLending(
        string memory name,
        address tokenAddress,
        uint256 LTV,
        uint256 borrowStableRate
    ) public onlyOwner {
        Token memory token = Token(tokenAddress, LTV, borrowStableRate, name);

        if (!tokenIsAlreadyThere(token, tokensForLending)) {
            tokensForLending.push(token);
        }
    }

    function addTokensForBorrowing(
        string memory name,
        address tokenAddress,
        uint256 LTV,
        uint256 borrowStableRate
    ) public onlyOwner {
        Token memory token = Token(tokenAddress, LTV, borrowStableRate, name);

        if (!tokenIsAlreadyThere(token, tokensForBorrowing)) {
            tokensForBorrowing.push(token);
        }
    }

    function addTokenToPriceFeedMapping(
        address tokenAddress,
        address tokenToUsdPriceFeed
    ) public onlyOwner {
        tokenToPriceFeed[tokenAddress] = tokenToUsdPriceFeed;
    }

    function getLendersArray() public view returns (address[] memory) {
        return lenders;
    }

    function getBorrowersArray() public view returns (address[] memory) {
        return borrowers;
    }

    function getTokensForLendingArray() public view returns (Token[] memory) {
        return tokensForLending;
    }

    function getTokensForBorrowingArray() public view returns (Token[] memory) {
        return tokensForBorrowing;
    }

    function lend(address tokenAddress, uint256 amount) public payable {
        require(
            tokenIsAllowed(tokenAddress, tokensForLending),
            "Token is not supported"
        );

        require(amount > 0, "The amount to supply should be greater than 0");

        IERC20 token = IERC20(tokenAddress);

        require(
            token.balanceOf(msg.sender) >= amount,
            "You have insufficient token to supply that amount"
        );

        token.transferFrom(msg.sender, address(this), amount);

        (bool userPresent, int256 userIndex) = isUserPresentIn(
            msg.sender,
            lenders
        );

        if (userPresent) {
            updateUserTokensBorrowedOrLent(
                tokenAddress,
                amount,
                userIndex,
                "lenders"
            );
        } else {
            lenders.push(msg.sender);
            tokensLentAmount[tokenAddress][msg.sender] = amount;
            tokensLent[noOfTokensLent++][msg.sender] = tokenAddress;
        }

        rewardUserToken(msg.sender, tokenAddress, amount);
    }

    function borrow(uint256 amount, address tokenAddress) public {
        require(
            tokenIsAllowed(tokenAddress, tokensForBorrowing),
            "Token is not supported for borrowing"
        );
        require(amount > 0, "Amount should be greater than 0");

        uint256 totalAmountAvailableForBorrowInDollars = getUserTotalAmountAvailableForBorrowInDollars(
                msg.sender
            );
        uint256 amountInDollars = getAmountInDollars(amount, tokenAddress);

        require(
            amountInDollars <= totalAmountAvailableForBorrowInDollars,
            "You don't have enough collateral to borrow this amount"
        );

        IERC20 token = IERC20(tokenAddress);

        require(
            token.balanceOf(address(this)) > amount,
            "We do not have enough of this token for you to borrow."
        );

        token.transfer(msg.sender, amount);

        (bool userPresent, int256 userIndex) = isUserPresentIn(
            msg.sender,
            borrowers
        );

        if (userPresent) {
            updateUserTokensBorrowedOrLent(
                tokenAddress,
                amount,
                userIndex,
                "borrowers"
            );
        } else {
            borrowers.push(msg.sender);
            tokensBorrowedAmount[tokenAddress][msg.sender] = amount;
            tokensBorrowed[noOfTokensBorrowed++][msg.sender] = tokenAddress;
        }
    }

    function payDebt(address tokenAddress, uint256 amount) public {
        require(amount > 0, "Amount should be greater than 0");

        int256 index = indexOf(msg.sender, borrowers);
        require(
            index >= 0,
            "User address is not found in the list of borrowers"
        );

        uint256 tokenBorrowed = tokensBorrowedAmount[tokenAddress][msg.sender];

        require(tokenBorrowed > 0, "You  are not owing");
        IERC20 token = IERC20(tokenAddress);

        uint256 totalTokenAmountToCollectFromUser = amount +
            interest(tokenAddress, tokenBorrowed);

        token.transferFrom(
            msg.sender,
            address(this),
            totalTokenAmountToCollectFromUser
        );

        tokensBorrowedAmount[tokenAddress][msg.sender] =
            tokensBorrowedAmount[tokenAddress][msg.sender] -
            amount;

        // Check If all the amount borrowed = 0;
        uint256 totalAmountBorrowed = getTotalAmountBorrowedInDollars(
            msg.sender
        );

        if (totalAmountBorrowed == 0) {
            borrowers[uint256(index)] = borrowers[borrowers.length - 1];
            borrowers.pop();
        }
    }

    function withdraw(address tokenAddress, uint256 amount) public {
        require(amount > 0, "Amount should be greater than 0");

        int256 index = indexOf(msg.sender, lenders);
        require(index >= 0, "User address is not found in the list of lenders");

        IERC20 token = IERC20(tokenAddress);

        uint256 tokenAmountLent = tokensLentAmount[tokenAddress][msg.sender];

        require(tokenAmountLent >= amount);

        uint256 larTokenToRemove = getAmountInDollars(amount, tokenAddress);
        larToken.transferFrom(msg.sender, address(this), larTokenToRemove);

        // uint tokenAmountToTransferToUser = getTotalLendingInterest(amount, tokenAddress);

        // if (tokensLentAmount[tokenAddress][msg.sender])

        token.transfer(msg.sender, amount);

        tokensLentAmount[tokenAddress][msg.sender] =
            tokensLentAmount[tokenAddress][msg.sender] -
            amount;

        // Check If all the amount lent = 0;
        uint256 totalAmountLent = getTotalAmountLentInDollars(msg.sender);

        if (totalAmountLent == 0) {
            lenders[uint256(index)] = lenders[lenders.length - 1];
            lenders.pop();
        }
    }

    function indexOf(address user, address[] memory addressArray)
        public
        returns (int256)
    {
        int256 index = -1;

        for (uint256 i = 0; i < addressArray.length; i++) {
            address currentAddress = addressArray[i];
            if (currentAddress == user) {
                return int256(i);
            }
        }
        return index;
    }

    function getTotalAmountBorrowedInDollars(address user)
        public
        view
        returns (uint256)
    {
        uint256 totalAmountBorrowed = 0;
        for (uint256 i = 0; i < noOfTokensBorrowed; i++) {
            address userBorrowedTokenAddressFound = tokensBorrowed[i][user];

            if (
                userBorrowedTokenAddressFound !=
                0x0000000000000000000000000000000000000000
            ) {
                uint256 tokenAmountBorrowed = tokensBorrowedAmount[
                    userBorrowedTokenAddressFound
                ][user];

                uint256 tokenAmountBorrowedInDollars = getAmountInDollars(
                    tokenAmountBorrowed,
                    userBorrowedTokenAddressFound
                );

                totalAmountBorrowed += tokenAmountBorrowedInDollars;
            }
        }
        return totalAmountBorrowed;
    }

    function getTotalAmountLentInDollars(address user)
        public
        view
        returns (uint256)
    {
        uint256 totalAmountLent = 0;
        for (uint256 i = 0; i < noOfTokensLent; i++) {
            address userLentTokenAddressFound = tokensLent[i][user];

            if (
                userLentTokenAddressFound !=
                0x0000000000000000000000000000000000000000
            ) {
                uint256 tokenAmountLent = tokensLentAmount[
                    userLentTokenAddressFound
                ][user];

                uint256 tokenAmountLentInDollars = getAmountInDollars(
                    tokenAmountLent,
                    userLentTokenAddressFound
                );

                totalAmountLent += tokenAmountLentInDollars;
            }
        }
        return totalAmountLent;
    }

    function interest(address tokenAddress, uint256 tokenBorrowed)
        public
        view
        returns (uint256)
    {
        Token memory token = getTokenFrom(tokenAddress);
        return (tokenBorrowed * token.stableRate) / 10**18;
    }

    function getTokenFrom(address tokenAddress)
        public
        view
        returns (Token memory)
    {
        Token memory token;
        for (uint256 i = 0; i < tokensForBorrowing.length; i++) {
            Token memory currentToken = tokensForBorrowing[i];
            if (currentToken.tokenAddress == tokenAddress) {
                token = currentToken;
                break;
            }
        }
        return token;
    }

    function getUserTotalAmountAvailableForBorrowInDollars(address user)
        public
        view
        returns (uint256)
    {
        // uint256 totalAvailableToBorrow = 0;

        uint256 userTotalCollateralToBorrow = 0;
        uint256 userTotalCollateralAlreadyBorrowed = 0;

        for (uint256 i = 0; i < lenders.length; i++) {
            address currentLender = lenders[i];
            if (currentLender == user) {
                for (uint256 j = 0; j < tokensForLending.length; j++) {
                    Token memory currentTokenForLending = tokensForLending[j];
                    uint256 currentTokenLentAmount = tokensLentAmount[
                        currentTokenForLending.tokenAddress
                    ][user];
                    uint256 currentTokenLentAmountInDollar = getAmountInDollars(
                        currentTokenLentAmount,
                        currentTokenForLending.tokenAddress
                    );
                    uint256 availableInDollar = (currentTokenLentAmountInDollar *
                            currentTokenForLending.LTV) / 10**18;
                    userTotalCollateralToBorrow += availableInDollar;
                }
            }
        }

        for (uint256 i = 0; i < borrowers.length; i++) {
            address currentBorrower = borrowers[i];
            if (currentBorrower == user) {
                for (uint256 j = 0; j < tokensForBorrowing.length; j++) {
                    Token memory currentTokenForBorrowing = tokensForBorrowing[j];
                    uint256 currentTokenBorrowedAmount = tokensBorrowedAmount[
                        currentTokenForBorrowing.tokenAddress
                    ][user];
                    uint256 currentTokenBorrowedAmountInDollar = getAmountInDollars(
                        (currentTokenBorrowedAmount),
                        currentTokenForBorrowing.tokenAddress
                    );
                    
                    userTotalCollateralAlreadyBorrowed += currentTokenBorrowedAmountInDollar;
                }
            }
        }

        return userTotalCollateralToBorrow - userTotalCollateralAlreadyBorrowed;

        // for (uint256 i = 0; i < noOfTokensLent; i++) {
        //     address userLentTokenAddressFound = tokensLent[i][user];

        //     if (
        //         userLentTokenAddressFound !=
        //         0x0000000000000000000000000000000000000000
        //     ) {
        //         Token memory token = getTokenFrom(userLentTokenAddressFound);
        //         uint256 tokenLoanToValueRatio = token.LTV;

        //         bool isBorrowed = tokenIsBorrowed(
        //             user,
        //             userLentTokenAddressFound
        //         );

        //         uint256 tokenAmountAvailable;

        //         if (!isBorrowed) {
        //             tokenAmountAvailable = tokensLentAmount[
        //                 userLentTokenAddressFound
        //             ][user];
        //         } else {
        //             tokenAmountAvailable =
        //                 tokensLentAmount[userLentTokenAddressFound][user] -
        //                 tokensBorrowedAmount[userLentTokenAddressFound][user];
        //         }
        //         uint256 currentTokenAmountInDollars = getAmountInDollars(
        //             tokenAmountAvailable,
        //             userLentTokenAddressFound
        //         );
        //         uint256 availableToBorrow = (currentTokenAmountInDollars *
        //             tokenLoanToValueRatio) / 10**18;

        //         totalAvailableToBorrow += availableToBorrow;
        //     }
        // }

        // return totalAvailableToBorrow;
    }

    function tokenIsBorrowed(address user, address token)
        private
        view
        returns (bool)
    {
        return tokensBorrowedAmount[token][user] != 0;
    }

    function tokenIsAllowed(address tokenAddress, Token[] memory tokenArray)
        private
        pure
        returns (bool)
    {
        if (tokenArray.length > 0) {
            for (uint256 i = 0; i < tokenArray.length; i++) {
                Token memory currentToken = tokenArray[i];
                if (currentToken.tokenAddress == tokenAddress) {
                    return true;
                }
            }
        }

        return false;
    }

    function tokenIsAlreadyThere(Token memory token, Token[] memory tokenArray)
        private
        pure
        returns (bool)
    {
        if (tokenArray.length > 0) {
            for (uint256 i = 0; i < tokenArray.length; i++) {
                Token memory currentToken = tokenArray[i];
                if (currentToken.tokenAddress == token.tokenAddress) {
                    return true;
                }
            }
        }

        return false;
    }

    function rewardUserToken(
        address user,
        address tokenAddress,
        uint256 amount
    ) private {
        // Send some tokens to the user equivalent to the token amount lent.
        require(amount > 0, "Amount should be greater than 0");

        uint256 amountIndollars = getAmountInDollars(amount, tokenAddress);
        larToken.transfer(user, amountIndollars);
    }

    function getAmountInDollars(uint256 amount, address tokenAddress)
        public
        view
        returns (uint256)
    {
        (
            uint256 dollarPerToken,
            uint256 decimals
        ) = oneTokenEqualsHowManyDollars(tokenAddress);
        uint256 totalAmountInDollars = (amount * dollarPerToken) /
            (10**decimals);
        return totalAmountInDollars;
    }

    function oneTokenEqualsHowManyDollars(address tokenAddress)
        public
        view
        returns (uint256, uint256)
    {
        address tokenToUsd = tokenToPriceFeed[tokenAddress];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(tokenToUsd);

        (, int256 price, , , ) = priceFeed.latestRoundData();

        uint256 decimals = priceFeed.decimals();

        return (uint256(price), decimals);
    }

    function updateUserTokensBorrowedOrLent(
        address tokenAddress,
        uint256 amount,
        int256 userIndex,
        string memory lendersOrBorrowers
    ) internal {
        if (
            keccak256(abi.encodePacked(lendersOrBorrowers)) ==
            keccak256(abi.encodePacked("lenders"))
        ) {
            address currentUser = lenders[uint256(userIndex)];

            bool tokenLendedAlready = hasLentOrBorrowedToken(
                currentUser,
                tokenAddress,
                noOfTokensLent,
                "tokensLent"
            );

            if (tokenLendedAlready) {
                tokensLentAmount[tokenAddress][currentUser] =
                    tokensLentAmount[tokenAddress][currentUser] +
                    amount;
            } else {
                tokensLent[noOfTokensLent++][currentUser] = tokenAddress;
                tokensLentAmount[tokenAddress][currentUser] = amount;
            }
        } else if (
            keccak256(abi.encodePacked(lendersOrBorrowers)) ==
            keccak256(abi.encodePacked("borrowers"))
        ) {
            address currentUser = borrowers[uint256(userIndex)];

            bool tokenBorrowedAlready = hasLentOrBorrowedToken(
                currentUser,
                tokenAddress,
                noOfTokensBorrowed,
                "tokensBorrowed"
            );

            if (tokenBorrowedAlready) {
                tokensBorrowedAmount[tokenAddress][currentUser] =
                    tokensBorrowedAmount[tokenAddress][currentUser] +
                    amount;
            } else {
                tokensBorrowed[noOfTokensBorrowed++][
                    currentUser
                ] = tokenAddress;
                tokensBorrowedAmount[tokenAddress][currentUser] = amount;
            }
        }
    }

    function hasLentOrBorrowedToken(
        address currentUser,
        address tokenAddress,
        uint256 noOfTokenslentOrBorrowed,
        string memory _tokensLentOrBorrowed
    ) public view returns (bool) {
        if (noOfTokenslentOrBorrowed > 0) {
            if (
                keccak256(abi.encodePacked(_tokensLentOrBorrowed)) ==
                keccak256(abi.encodePacked("tokensLent"))
            ) {
                for (uint256 i = 0; i < noOfTokensLent; i++) {
                    address tokenAddressFound = tokensLent[i][currentUser];
                    if (tokenAddressFound == tokenAddress) {
                        return true;
                    }
                }
            } else if (
                keccak256(abi.encodePacked(_tokensLentOrBorrowed)) ==
                keccak256(abi.encodePacked("tokensBorrowed"))
            ) {
                for (uint256 i = 0; i < noOfTokensBorrowed; i++) {
                    address tokenAddressFound = tokensBorrowed[i][currentUser];
                    if (tokenAddressFound == tokenAddress) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function isUserPresentIn(address userAddress, address[] memory users)
        private
        pure
        returns (bool, int256)
    {
        if (users.length > 0) {
            for (uint256 i = 0; i < users.length; i++) {
                address currentUserAddress = users[i];
                if (currentUserAddress == userAddress) {
                    return (true, int256(i));
                }
            }
        }

        return (false, -1);
    }

    function getTotalTokenSupplied(address tokenAddres)
        public
        view
        returns (uint256)
    {
        uint256 totalTokenSupplied = 0;
        if (lenders.length > 0) {
            for (uint256 i = 0; i < lenders.length; i++) {
                address curentLender = lenders[i];
                totalTokenSupplied += tokensLentAmount[tokenAddres][
                    curentLender
                ];
            }
        }

        return totalTokenSupplied;
    }

    function getTotalTokenBorrowed(address tokenAddress)
        public
        view
        returns (uint256)
    {
        uint256 totalTokenBorrowed = 0;
        if (borrowers.length > 0) {
            for (uint256 i = 0; i < borrowers.length; i++) {
                address curentBorrower = borrowers[i];
                totalTokenBorrowed += tokensBorrowedAmount[tokenAddress][
                    curentBorrower
                ];
            }
        }
        return totalTokenBorrowed;
    }
}
