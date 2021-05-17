import './App.css';
import logo from './logo.svg';

import React, { useState } from 'react';
import getWeb3 from "./getWeb3";
import ipfs from './ipfs';
import storeHash from './storehash';
import { Button, Table } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';

function App() {
    const [ipfsHash, setIpfsHash] = useState(null);
    const [buffer, setBuffer] = useState('');
    const [ethAddress, setEthAddress] = useState('');
    const [storeHashTransaction, setStoreHashTransaction] = useState('');
    const [blockNumber, setBlockNumber] = useState('');
    const [gasUsed, setGasUsed] = useState('');
    const [loading, setLoading] = useState(false);
    var file = '';                  // file object with global scope

    /** @dev Take file input from user */
    const captureFile = (event) => {
        event.stopPropagation();    // stop react bubbling up click event
        event.preventDefault();     // stop react refreshing the browser
        file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => convertToBuffer(reader);
    };

    /** @dev Convert the file to buffer to store on IPFS */
    const convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer as state variable, using React hook function
        setBuffer(buffer);
    };

    /** @dev send file to IPFS  */
    const sendIt = async (event) => {
        // set the waiting spinner when starting sendIt
        setLoading(true);
        event.preventDefault();     // stop react refreshing browser at button click
        // store buffer on IPFS
        const ipfsHash = await ipfs.add(buffer);        
        console.log('ipfsHash after ipfs.add:', ipfsHash.path);
        // set the hash (IPFS access key) in state using react hook function
        setIpfsHash(ipfsHash.path);

        try{
            // get the blockchain interface
            const web3 = await getWeb3();
            console.log('web3 sent back by getWeb3: ', web3);
            // bring in user's Metamask account address
            const accounts = await web3.eth.getAccounts();
            console.log('using account in Metamask to pay:', accounts);
            // Get the contract instance, name it storeHashContract
            const storeHashContract = await storeHash();
            console.log('smart contract to store Hash:', storeHashContract);
            //obtain contract address from storeHashContract
            const ethAddress= await storeHashContract.options.address;
            // set the address as a state variable, using react hook function
            setEthAddress(ethAddress);      // 'address' is used in HTML rendering
            console.log('ethAddress storing the IPFS hash:', ethAddress);

            // call smart contract method "setHash" via .send to store IPFS hash in Ethereum contract
            const receipt = await storeHashContract.methods.setHash(ipfsHash.path).send({from: accounts[0]});
            console.log('receipt as returned by smart contract:', receipt);
            setStoreHashTransaction(receipt);
            // reset the waiting spinner when transaction is done
            setLoading(false);
        }catch (error) {
            // catch any errors for any of the above operations.
            alert(
                `Failed to load web3. Check that Metamask connected this page to a blockchain account. Else see browser console for error details.`
            );
            console.error(error);
            setLoading(false);
        }
    };

    const getDetails = async () => {
        console.log('transaction of which to retrieve details:', storeHashTransaction);
        setBlockNumber(storeHashTransaction.blockNumber);   // set state variable, to be rendered in HTML
        setGasUsed(storeHashTransaction.gasUsed);
    }
    
    return (
        <div className="App"  >
            <header className="App-header">
                <img src={logo} alt="logo" className="App-logo" />
                <h1 className="h1" >Ethereum and IPFS using Infura</h1>
                <span  style={{color: '#980000', fontSize: '0.7em'}}><i>adapted from create-react-app (May 2021)</i></span>
                <a className="App-link" target="_blank" rel="noopener noreferrer"
                href='https://kvutien-yes.medium.com/machu-picchu-why-should-humanitarian-organizations-be-interested-in-using-blockchain-360bbfcb88f5'>
                <i>offered to you by the Machu Picchu team</i></a>
            </header>
            <hr/>        
            <h3> Choose file and send it to IPFS </h3>
            <form onSubmit={sendIt}>
                <input type = "file" onChange = {captureFile} />
                {loading ?
                <div className="spinner">
                    <BounceLoader
                    color={'#6CEC7D'}
                    loading={loading}
                    />
                </div>:
                <Button variant="outline-primary" size="lg" type="submit"> 2.Send it to IPFS</Button>
                }
            </form>
            <hr/> 

            <h3> Get Transaction Details </h3>
            <Button variant="outline-primary" size="lg" onClick = {getDetails}> 3.Get Storage Transaction Details </Button> 
            <hr/>
            
            <h3> Values read from blockchain </h3>
            <Table size="sm" bordered responsive>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th> </th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Smart Contract address storing IPFS hash</td>
                        <td> : </td>
                        <td>{ethAddress}</td>
                    </tr>
                    <tr>
                        <td>IPFS Hash to store on Ethereum</td>
                        <td> : </td>
                        <td>{ipfsHash}</td>
                    </tr>
                    <tr>
                        <td>Storing transaction's BlockNumber </td>
                        <td> : </td>
                        <td>{blockNumber}</td>
                    </tr>
                    <tr>
                        <td>Storing transaction's Gas Used </td>
                        <td> : </td>
                        <td>{gasUsed}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
    //}
}

export default App;
