import React, { createContext, useEffect, useState } from "react";
import { Web3 } from 'web3';
import VoteJson from '../contracts/Voting.json'
import Routing from "../Components/Routing";


export const BlockchainContext = createContext();// create  context to send states to another component

const Connection = (props) => {
    //set states
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();

    const Integration = async () => {
        if (window.ethereum) {// check metamask i installed or not
            try {   //  try block executed  without error. if error catch will catch the error
                const web3 = new Web3(window.ethereum); // create web3 instance
                setWeb3(web3)

                const accounts = await web3.eth.getAccounts(); // get all connected accounts
                setAccount(accounts[0])// set first account

                window.ethereum.on('accountsChanged', (accounts) => {// get current  account , when switch to another account
                    setAccount(accounts[0]);
                })

                const abi = VoteJson.abi;   // contract abi
                const address = '0xce2eCFa585B527a9c8DB731c7e546CE1bccaD9A8' // contract address

                const contract = new web3.eth.Contract(abi, address)// create contract instance
                setContract(contract);
                console.log('contract instance',contract)
            } catch (error) {//if error console it
                console.log('Error fetch data from blockchain.')
            }
        } else {
            console.log("Please install vailed provider like Metamask");// error install metamask
        }
    }

    useEffect(() => {
        Integration();
    }, []);
    return (
        //send states to child components
         <BlockchainContext.Provider value={{ web3, account, contract }}> 
            <Routing /> 
        </BlockchainContext.Provider>
    )
};

export default Connection;
