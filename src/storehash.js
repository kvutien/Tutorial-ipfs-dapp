import getWeb3 from "./getWeb3";
// export an instance of the smart contract that stores IPFS hash

async function storehash() { 
    // Your contract address as deployed by Remix
    const address = '0x40619f0278DE88aB843d8c57A6f6c66e3ab49dd1';   // address deployed in Remix
    // Your contract ABI as copied from Remix
    const abi = [{
        "inputs": [],
        "name": "getHash",
        "outputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "name": "setHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    const web3 = await getWeb3();
    return new web3.eth.Contract(abi, address);
}
storehash();

export default storehash;
