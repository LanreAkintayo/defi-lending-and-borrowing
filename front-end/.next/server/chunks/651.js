"use strict";
exports.id = 651;
exports.ids = [651];
exports.modules = {

/***/ 7727:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/chainlink.9c4b71eb.svg","height":256,"width":256});

/***/ }),

/***/ 1285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/dai.fc78aff3.svg","height":50,"width":50});

/***/ }),

/***/ 9523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/fau_2.96a2a5c3.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA+0lEQVR42gWAvUrDQACAv7tcqqatoAgKHUSo3dRBLAgOgh1c+hqCoy/g4N7JzcXJwTcQfwahEKiDqJtFlzqoFdKQtLGX610RAJv38dzr2J6h3SFjAzq/2TDZKZCJ7XZS6mX2oWRsvWIhmFi6w5zPTHeqaXwgfetav8bVT1Z8fdso26v9wB4X+5pM12Wx3JIGmjhHoKSvyGXnrSuf3z98oi/6ZtKUgAKBsQ5P+VRXK8zML4ExeMNISQ9CgECJfJCMqJ2HXA5cHiws8ucVQrHzGK89acKGs8u1QY/r7xGJX0SLwo+UhV0BsHUXrb9oeUH6v6fSCINq480eAd0p/WhvMc9J1BIAAAAASUVORK5CYII="});

/***/ }),

/***/ 7891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/weth.4d6552ce.svg","height":46,"width":46});

/***/ }),

/***/ 9142:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mA": () => (/* binding */ useAccount),
/* harmony export */   "Ye": () => (/* binding */ useSupplyAssets),
/* harmony export */   "qx": () => (/* binding */ useBorrowAssets),
/* harmony export */   "$9": () => (/* binding */ useYourSupplies),
/* harmony export */   "d8": () => (/* binding */ useYourBorrows),
/* harmony export */   "LN": () => (/* binding */ useNetwork)
/* harmony export */ });
/* unused harmony exports useAdmin, useWalletInfo */
/* harmony import */ var _components_providers_web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3394);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__]);
_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const _isEmpty = (data)=>{
    return data == null || data === "" || Array.isArray(data) && data.length === 0 || data.constructor === Object && Object.keys(data).length === 0;
};
const enhanceHook = (swrRes)=>{
    const { data , error  } = swrRes;
    const hasInitialResponse = data || error;
    return {
        ...swrRes,
        hasInitialResponse,
        isEmpty: hasInitialResponse && _isEmpty(data)
    };
};
const useAccount = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useAccount
    )());
    return {
        account: swrRes
    };
};
const useSupplyAssets = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useSupplyAssets
    )());
    return {
        tokens: swrRes
    };
};
const useBorrowAssets = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useBorrowAssets
    )());
    return {
        tokensForBorrow: swrRes
    };
};
const useYourSupplies = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useYourSupplies
    )());
    return {
        yourSupplies: swrRes
    };
};
const useYourBorrows = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useYourBorrows
    )());
    return {
        yourBorrows: swrRes
    };
};
const useAdmin = ({ redirectTo  })=>{
    const { account  } = useAccount();
    const { requireInstall  } = useWeb3();
    const router = useRouter();
    useEffect(()=>{
        if (requireInstall || account.hasInitialResponse && !account.isAdmin || account.isEmpty) {
            router.push(redirectTo);
        }
    }, [
        account
    ]);
    return {
        account
    };
};
const useNetwork = ()=>{
    const swrRes = enhanceHook((0,_components_providers_web3__WEBPACK_IMPORTED_MODULE_0__/* .useHooks */ .xn)((hooks)=>hooks.useNetwork
    )());
    return {
        network: swrRes
    };
};
const useWalletInfo = ()=>{
    const { network  } = useNetwork();
    const { account  } = useAccount();
    const hasConnectedWallet = !!(account.data && network.isSupported);
    const isConnecting = !account.hasInitialResponse && !network.hasInitialResponse;
    return {
        network,
        account,
        hasConnectedWallet,
        isConnecting
    };
}; /*

Create an handler of the hook. This handler returns a function which is where the functionality of the hook is programmed.
Register the handler in setUpHook()
Here, Try to call the function the handler is returning.


The reason for using enhanceHook is to provide an additional property 'hasInitialResponse' instead of specifying this property in all hooks.

useHooks((hooks) => hooks.useAccount)() = 
{
  account: {
      mutate,
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      ...rest,
  },
}




useHooks((hooks) => {
        return hooks.useAccount
    }
    ) = createUseAccount(web3)

return createUseAccount(web3)() = 
   {
        account: {
            mutate,
            data,
            isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
            ...rest,
        }
    }


Here, useHooks() method is called, which means that we will have access to that dictionary containing key-value pairs where the keys represent name of hooks and value represent an handler to that hook.

Here, hooks is a variable that holds that dictionary.

hooks = getHooks() = setUpHooks() = 
    {
        useAccount: createUseAccount(web3)
    }

useAccount is the name of a hook and createUseAccount(web3) is an handler to that hook itself (note that the hook is a function)


hooks.useAccount returns the handler to the hook. In other words,
hooks.useAccount = createUseAccount(web3)

createUseAccount(web3) is just an handler to the hook. It is a function that returns a function. That function it returns is actually the function we call hook.

createUseAccount(web3) returns 

() => 
    {
        return  
        {
            account: {
                mutate,
                data,
                isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
                ...rest,
        }
    }
    }

The function above is the one we actually need to invoke.

So, createUseAccount(web3)() will invoke the function


*/ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1926:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ setupHooks)
/* harmony export */ });
/* harmony import */ var _useAccount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4571);
/* harmony import */ var _useNetwork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(940);
/* harmony import */ var _useSupplyAssets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2591);
/* harmony import */ var _useBorrowAssets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4754);
/* harmony import */ var _useYourSupplies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6760);
/* harmony import */ var _useYourBorrows__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(810);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useAccount__WEBPACK_IMPORTED_MODULE_0__, _useNetwork__WEBPACK_IMPORTED_MODULE_1__, _useSupplyAssets__WEBPACK_IMPORTED_MODULE_2__, _useBorrowAssets__WEBPACK_IMPORTED_MODULE_3__, _useYourSupplies__WEBPACK_IMPORTED_MODULE_4__, _useYourBorrows__WEBPACK_IMPORTED_MODULE_5__]);
([_useAccount__WEBPACK_IMPORTED_MODULE_0__, _useNetwork__WEBPACK_IMPORTED_MODULE_1__, _useSupplyAssets__WEBPACK_IMPORTED_MODULE_2__, _useBorrowAssets__WEBPACK_IMPORTED_MODULE_3__, _useYourSupplies__WEBPACK_IMPORTED_MODULE_4__, _useYourBorrows__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const setupHooks = ({ web3 , provider , contract  })=>{
    return {
        useAccount: (0,_useAccount__WEBPACK_IMPORTED_MODULE_0__/* .handler */ .y)(web3, provider),
        useNetwork: (0,_useNetwork__WEBPACK_IMPORTED_MODULE_1__/* .handler */ .y)(web3),
        useSupplyAssets: (0,_useSupplyAssets__WEBPACK_IMPORTED_MODULE_2__/* .handler */ .y)(web3, contract),
        useBorrowAssets: (0,_useBorrowAssets__WEBPACK_IMPORTED_MODULE_3__/* .handler */ .y)(web3, contract),
        useYourSupplies: (0,_useYourSupplies__WEBPACK_IMPORTED_MODULE_4__/* .handler */ .y)(web3, contract),
        useYourBorrows: (0,_useYourBorrows__WEBPACK_IMPORTED_MODULE_5__/* .handler */ .y)(web3, contract)
    };
} /*
setUpHook function returns a dictionary where every key has a value that returns a function. In another words, every key has a hook

*/ ;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4571:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const handler = (web3 = null, provider = null)=>{
    return ()=>{
        const { mutate , data , error , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_1__["default"])(()=>web3 ? "web3/accounts" : null
        , async ()=>{
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            if (!account) {
                throw new Error("Failed to detect Account. Please refresh your browser");
            }
            return account;
        });
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
            const mutator = (accounts)=>window.location.reload()
            ;
            provider === null || provider === void 0 ? void 0 : provider.on("accountsChanged", mutator);
            return ()=>{
                return provider === null || provider === void 0 ? void 0 : provider.removeListener("accountsChanged", mutator);
            };
        }, []);
        return {
            mutate,
            data,
            error,
            ...rest
        };
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4754:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _utils_normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4651);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const handler = (web3, contract)=>()=>{
        const { data , error , mutate , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(()=>web3 ? "web3/supply_assets" : null
        , async ()=>{
            const borrowAssets = [];
            const tokens = await contract.methods.getTokensForBorrowingArray().call();
            for(let i = 0; i < tokens.length; i++){
                const currentToken = tokens[i];
                const newToken = await (0,_utils_normalize__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToken */ .q)(web3, contract, currentToken);
                borrowAssets.push(newToken);
            }
            return borrowAssets;
        });
        const targetNetwork = NETWORKS["42"];
        return {
            data,
            error,
            ...rest,
            target: targetNetwork,
            isSupported: data === targetNetwork
        };
    }
; /**

web3.eth.net.getId() will return the network id on ganache itself
web3.eth.getChainId() will return the chainId of ganache in metamask.
 
chainChanged event listens with web3.eth.getChainId()

 
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 940:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__]);
swr__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const handler = (web3)=>()=>{
        const { data , error , mutate , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(()=>web3 ? "web3/network" : null
        , async ()=>{
            const chainId = await web3.eth.getChainId();
            if (!chainId) {
                throw new Error("Cannot retrieve network. Please reload your browser");
            }
            return NETWORKS[chainId];
        });
        const targetNetwork = NETWORKS["42"];
        return {
            data,
            error,
            ...rest,
            target: targetNetwork,
            isSupported: data === targetNetwork
        };
    }
; /**

web3.eth.net.getId() will return the network id on ganache itself
web3.eth.getChainId() will return the chainId of ganache in metamask.
 
chainChanged event listens with web3.eth.getChainId()

 
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2591:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _utils_normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4651);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const handler = (web3, contract)=>()=>{
        const { data , error , mutate , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(()=>web3 ? "web3/supply_assets" : null
        , async ()=>{
            const supplyAssets = [];
            const tokens = await contract.methods.getTokensForLendingArray().call();
            for(let i = 0; i < tokens.length; i++){
                const currentToken = tokens[i];
                const newToken = await (0,_utils_normalize__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToken */ .q)(web3, contract, currentToken);
                supplyAssets.push(newToken);
            }
            return supplyAssets;
        });
        const targetNetwork = NETWORKS["42"];
        return {
            data,
            error,
            ...rest,
            target: targetNetwork,
            isSupported: data === targetNetwork
        };
    }
; /**

web3.eth.net.getId() will return the network id on ganache itself
web3.eth.getChainId() will return the chainId of ganache in metamask.
 
chainChanged event listens with web3.eth.getChainId()

 
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 810:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _utils_normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4651);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const handler = (web3, contract)=>()=>{
        const { data , error , mutate , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(()=>web3 ? "web3/your_borrows" : null
        , async ()=>{
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const yourBorrows = [];
            let yourBalance = 0;
            const tokenAddressTracker = [];
            const noOfTokensBorrowed = await contract.methods.noOfTokensBorrowed().call();
            if (Number(noOfTokensBorrowed) > 0) {
                for(let i = Number(noOfTokensBorrowed) - 1; i >= 0; i--){
                    const currentTokenAddress = await contract.methods.tokensBorrowed(i, account).call();
                    if (tokenAddressTracker.includes(currentTokenAddress)) {
                        continue;
                    }
                    if (currentTokenAddress.toString() !== "0x0000000000000000000000000000000000000000") {
                        const currentToken = await contract.methods.getTokenFrom(currentTokenAddress).call();
                        const normalized = await (0,_utils_normalize__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToken */ .q)(web3, contract, currentToken);
                        yourBalance += parseFloat(normalized.userTokenBorrowedAmount.inDollars);
                        if (Number(normalized.userTokenBorrowedAmount.amount) > 0) {
                            yourBorrows.push(normalized);
                            tokenAddressTracker.push(currentTokenAddress);
                        }
                    }
                }
            }
            return {
                yourBorrows,
                yourBalance
            };
        });
        const targetNetwork = NETWORKS["42"];
        return {
            data,
            error,
            ...rest,
            target: targetNetwork,
            isSupported: data === targetNetwork
        };
    }
; /**

web3.eth.net.getId() will return the network id on ganache itself
web3.eth.getChainId() will return the chainId of ganache in metamask.
 
chainChanged event listens with web3.eth.getChainId()

 
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6760:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _utils_normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4651);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_normalize__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const handler = (web3, contract)=>()=>{
        const { data , error , mutate , ...rest } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(()=>web3 ? "web3/your_supplies" : null
        , async ()=>{
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const yourSupplies = [];
            let yourBalance = 0;
            const tokenAddressTracker = [];
            const noOfTokensLent = await contract.methods.noOfTokensLent().call();
            if (Number(noOfTokensLent) > 0) {
                for(let i = 0; i < Number(noOfTokensLent); i++){
                    const currentTokenAddress = await contract.methods.tokensLent(i, account).call();
                    if (tokenAddressTracker.includes(currentTokenAddress)) {
                        continue;
                    }
                    if (currentTokenAddress.toString() !== "0x0000000000000000000000000000000000000000") {
                        const currentToken = await contract.methods.getTokenFrom(currentTokenAddress).call();
                        const normalized = await (0,_utils_normalize__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToken */ .q)(web3, contract, currentToken);
                        yourBalance += parseFloat(normalized.userTokenLentAmount.inDollars);
                        if (Number(normalized.userTokenLentAmount.inDollars) > 0.0000000000001) {
                            yourSupplies.push(normalized);
                            tokenAddressTracker.push(currentTokenAddress);
                        }
                    }
                }
            }
            return {
                yourSupplies,
                yourBalance
            };
        });
        const targetNetwork = NETWORKS["42"];
        return {
            data,
            error,
            ...rest,
            target: targetNetwork,
            isSupported: data === targetNetwork
        };
    }
; /**

web3.eth.net.getId() will return the network id on ganache itself
web3.eth.getChainId() will return the chainId of ganache in metamask.
 
chainChanged event listens with web3.eth.getChainId()

 
 */ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3394:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ Web3Provider),
/* harmony export */   "$6": () => (/* binding */ useWeb3),
/* harmony export */   "xn": () => (/* binding */ useHooks)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3427);
/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_metamask_detect_provider__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_setupHooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1926);
/* harmony import */ var utils_loadContract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3950);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_setupHooks__WEBPACK_IMPORTED_MODULE_4__]);
_hooks_setupHooks__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const Web3Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const setListeners = (provider)=>{
    provider.on("chainChanged", (_)=>window.location.reload()
    );
};
function Web3Provider({ children  }) {
    const createWeb3State = ({ web3 , provider , contract , isLoading  })=>{
        return {
            web3,
            provider,
            contract,
            isLoading,
            hooks: (0,_hooks_setupHooks__WEBPACK_IMPORTED_MODULE_4__/* .setupHooks */ .b)({
                web3,
                provider,
                contract
            })
        };
    };
    const { 0: web3Api , 1: setWeb3Api  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(createWeb3State({
        web3: null,
        provider: null,
        contract: null,
        isLoading: true
    }));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadProvider = async ()=>{
            const provider = await _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_2___default()();
            if (provider) {
                const web3 = new (web3__WEBPACK_IMPORTED_MODULE_3___default())(provider);
                const contract = await (0,utils_loadContract__WEBPACK_IMPORTED_MODULE_5__/* .loadContract */ .U)("LendingAndBorrowing", web3);
                setWeb3Api(createWeb3State({
                    web3,
                    provider,
                    contract,
                    isLoading: false
                }));
                setListeners(provider);
            } else {
                console.error("Please Install metamask");
                setWeb3Api((prevWeb3Api)=>({
                        ...prevWeb3Api,
                        isLoading: false
                    })
                );
            }
        };
        loadProvider();
    }, []);
    const _web3Api = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const { web3 , provider , isLoading , contract  } = web3Api;
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect: provider ? async ()=>{
                try {
                    console.log("Trying to connect to metamask");
                    await provider.request({
                        method: "eth_requestAccounts"
                    });
                } catch  {
                    console.error("Not connecting to metamask");
                    location.reload();
                }
            } : ()=>console.log("Cannot find provider")
        };
    }, [
        web3Api
    ]);
    // Return another instance of _web3Api if web3Api changes
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Web3Context.Provider, {
        value: _web3Api,
        children: children
    });
};
function useWeb3() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Web3Context);
}
function useHooks(callback) {
    const { hooks  } = useWeb3();
    return callback(hooks);
} /*

getHooks() method returns a dictionary containing name of the hook (key) and the handler to the hook (value)
That dictionary will be accessible anywhere useHooks() method is called because the dictionary is passed as an argument to the callback.

*/ 

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ loadContract)
/* harmony export */ });
/* harmony import */ var _public_build_deployments_map_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7787);

const NETWORK_ID = 42;
const loadContract = async (contractName, web3)=>{
    const res = await fetch(`./build/contracts/${contractName}.json`);
    const Artifact = await res.json();
    // debugger
    let contract = null;
    try {
        contract = new web3.eth.Contract(Artifact.abi, _public_build_deployments_map_json__WEBPACK_IMPORTED_MODULE_0__[NETWORK_ID][contractName][0]);
    } catch (err) {
        console.log("This is the error");
        console.error(err);
    }
    return contract;
};


/***/ }),

/***/ 4651:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ normalizeToken)
/* harmony export */ });
/* harmony import */ var _public_build_contracts_ADE_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _assets_dai_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1285);
/* harmony import */ var _assets_weth_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7891);
/* harmony import */ var _assets_chainlink_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7727);
/* harmony import */ var _assets_fau_2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9523);
/* harmony import */ var _components_hooks_web3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9142);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_hooks_web3__WEBPACK_IMPORTED_MODULE_5__]);
_components_hooks_web3__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const tokenImages = {
    DAI: _assets_dai_svg__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    WETH: _assets_weth_svg__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    LINK: _assets_chainlink_svg__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
    FAU: _assets_fau_2_png__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z
};
const normalizeToken = async (web3, contract, currentToken)=>{
    const fromWei = (amount)=>{
        return web3.utils.fromWei(amount);
    };
    const toBN = (amount)=>{
        return web3.utils.toBN(amount);
    };
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const tokenInst = new web3.eth.Contract(_public_build_contracts_ADE_json__WEBPACK_IMPORTED_MODULE_0__/* .abi */ .Mt, currentToken.tokenAddress);
    const decimals = await tokenInst.methods.decimals().call();
    const walletBalance = await tokenInst.methods.balanceOf(account).call();
    const totalSuppliedInContract = await contract.methods.getTotalTokenSupplied(currentToken.tokenAddress).call();
    const totalBorrowedInContract = await contract.methods.getTotalTokenBorrowed(currentToken.tokenAddress).call();
    const utilizationRate = Number(totalBorrowedInContract) * 100 / Number(totalSuppliedInContract);
    const userTokenBorrowedAmount = await contract.methods.tokensBorrowedAmount(currentToken.tokenAddress, account).call();
    const userTokenLentAmount = await contract.methods.tokensLentAmount(currentToken.tokenAddress, account).call();
    const userTotalAmountAvailableToWithdrawInDollars = await contract.methods.getTokenAvailableToWithdraw(account).call();
    const userTotalAmountAvailableForBorrowInDollars = await contract.methods.getUserTotalAmountAvailableForBorrowInDollars(account).call();
    const walletBalanceInDollars = await contract.methods.getAmountInDollars(walletBalance, currentToken.tokenAddress).call();
    const totalSuppliedInContractInDollars = await contract.methods.getAmountInDollars(totalSuppliedInContract, currentToken.tokenAddress).call();
    const totalBorrowedInContractInDollars = await contract.methods.getAmountInDollars(totalBorrowedInContract, currentToken.tokenAddress).call();
    const userTokenBorrowedAmountInDollars = await contract.methods.getAmountInDollars(userTokenBorrowedAmount, currentToken.tokenAddress).call();
    const userTokenLentAmountInDollars = await contract.methods.getAmountInDollars(userTokenLentAmount, currentToken.tokenAddress).call();
    const availableAmountInContract = toBN(totalSuppliedInContract).sub(toBN(totalBorrowedInContract)).toString();
    const availableAmountInContractInDollars = await contract.methods.getAmountInDollars(availableAmountInContract, currentToken.tokenAddress).call();
    const result = await contract.methods.oneTokenEqualsHowManyDollars(currentToken.tokenAddress).call();
    const price = result[0];
    const decimal = result[1];
    const oneTokenToDollar = parseFloat(price) / 10 ** parseInt(decimal);
    return {
        name: currentToken.name,
        image: tokenImages[currentToken.name],
        tokenAddress: currentToken.tokenAddress,
        userTotalAmountAvailableToWithdrawInDollars: fromWei(userTotalAmountAvailableToWithdrawInDollars),
        userTotalAmountAvailableForBorrowInDollars: fromWei(userTotalAmountAvailableForBorrowInDollars),
        walletBalance: {
            amount: fromWei(walletBalance),
            inDollars: fromWei(walletBalanceInDollars)
        },
        totalSuppliedInContract: {
            amount: fromWei(totalSuppliedInContract),
            inDollars: fromWei(totalSuppliedInContractInDollars)
        },
        totalBorrowedInContract: {
            amount: fromWei(totalBorrowedInContract),
            inDollars: fromWei(totalBorrowedInContractInDollars)
        },
        availableAmountInContract: {
            amount: fromWei(availableAmountInContract),
            inDollars: fromWei(availableAmountInContractInDollars)
        },
        userTokenBorrowedAmount: {
            amount: fromWei(userTokenBorrowedAmount),
            inDollars: fromWei(userTokenBorrowedAmountInDollars)
        },
        userTokenLentAmount: {
            amount: fromWei(userTokenLentAmount),
            inDollars: fromWei(userTokenLentAmountInDollars)
        },
        LTV: web3.utils.fromWei(currentToken.LTV),
        borrowAPYRate: web3.utils.fromWei(currentToken.stableRate),
        utilizationRate: utilizationRate,
        oneTokenToDollar,
        decimals
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 47:
/***/ ((module) => {

module.exports = JSON.parse('{"Mt":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]}');

/***/ }),

/***/ 7787:
/***/ ((module) => {

module.exports = JSON.parse('{"42":{"LARToken":["0xee7684140AC4BcC8F6dEF310ec942BF516522a32","0xA10B54a6494C174b0077b615AfBa365283FAbdd0","0xA268A605f255a5e0b12AE70A33E1CD17693774DE","0xE1519ECEE311E2D36006a38217b1CFac2993af4D","0xd0EC14c5dAAd2Ca506Ab4fB3a7F62aCD11d6E6dc","0x167eBCdeC4DCb9e2c7a120C5ed139a7dCD476dE5","0x0648A1a569FcEC695e1eF16fe5cC0980adCce621","0xFD29C242053c8f2F64d0b4E7Df0487409B5F0180","0x54d3ab78cA78aCDB0f521e9D852111a06507940a","0xb77469c4Af0055B3C13411e66bF030D5aC0c0FF6","0x8Cf329f3bF98d75BA5A3BcF2b562151d34058a59","0x86A9186909EB31979D6f8327611FD7885693Ce4C","0x45641cb694840319b20Df8ABF940376A6D81027d","0xefb9C260D7527dea4682A54141d2D43965A255a1","0xEd5d77984a2B001d264a81c7d9A8beA5dE3cd20B","0x5efeEdB8aE11947AD1B9F45e2a9E58033c68F157","0x353e19c90267490F4fdbC29f9e24F58Fd8DaB5Ab","0x8AcD6dFe349868f16BB386fCF2623909CBA6216F","0x0B0772472cc3b5841D5bDE4F9929eF6a83234bcf","0x91661e4Cb0ff27aF06E033DB5978A0BB7f635F42","0xDb02Bc22555D3465280F2f525424Bf8f99d631A8"],"LendingAndBorrowing":["0x849d4880bAa2314b5925a1D317e8eDDd08db72b6","0xC73B10D0846d35DC3e2884d10b22aa5B12D4691B","0x2DD4f3ec6bf2E458644FC142Ac552010e1db8750","0xf50600cD2A6b6BA88DB7780a2273B7Af51F26249","0xCc3350c17d1A65B4156D24Fb54CC22dF6309ec01","0x86c07916CAcf827342c540895EFeafC4A5BAB197","0xf8Cf75C7cC515494FE56C4eFb0aa649119062c71","0x4175ec2Af7EAeEAc99892B974eE19B3B59b3777B","0xFa0EcDA98Dd9FbE57302DB6377EDAd32924139b7","0x83b3Bc865500626e52BC8Fca6A193c146c520eE7","0x761538e8f441650e5Bd1c0d8b71792bC694071d2","0x383ADB0EB06825ec1E955F7Af6A25E3DEE9C52D9","0x449b4CDA5ECaf7c50628DE1007eBC5e7868A86E1","0xb3d7C4ADB4b6288911b71345D751817fA7378792","0xF98D33F68C084B2397E102bFf05E8C8ff25D217B","0xF60Fb184Ad29Bf5648dEB0718bf07071F94B3A8b","0x54147e1C9EB8842347086cBAF8321a6b23DE5BED","0x60D08459eF3906CE3Ec6F9e042eF22D278907d6B","0x0BC1179BF59EbA0dF7b86e12e70536b1548417EF","0x543f2C3b4200EE0d8BdC4787C79b1746f4a2b381","0xe050Bc13Ac5343C61d3f4091fB0316308D40Ecf4"]}}');

/***/ })

};
;