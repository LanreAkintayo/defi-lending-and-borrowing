import { useWeb3 } from "@components/providers/web3";





export const todp = (amount, dp) => {
 return Number(amount).toFixed(dp)
 
}

export const convertToDollar = (token, value) => {
 return parseFloat(value) * token.oneTokenToDollar;
}

