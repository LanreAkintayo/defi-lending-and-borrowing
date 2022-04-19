import map from "@public/build/deployments/map.json"



const NETWORK_ID = 42;

export const loadContract = async (contractName, web3) => {
 const res = await fetch(`./build/contracts/${contractName}.json`);
 
 const Artifact = await res.json();
 // debugger

  let contract = null;

  try {

    contract = new web3.eth.Contract(
     Artifact.abi,
     map[NETWORK_ID][contractName][0]
    );
    
  }
  catch (err) {
   console.log("This is the error")
    console.error(err);
  }

  return contract;
};
  