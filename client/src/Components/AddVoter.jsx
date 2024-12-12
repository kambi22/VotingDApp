import { Button, Card, InputLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react"
import { PinataSDK } from "pinata-web3"
import { Player } from "@lottiefiles/react-lottie-player";
import { BlockchainContext } from "../Connection/Connection";
import { notify } from "./Notify";


const AddVoter = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);// get states from blockchain context
  const [votername, setVotername] = useState();
  const [voterage, setVoterage] = useState();
  const [voterAddress, setVoterAddress] = useState();
  const [voterDataUrl, setVoterDataUrl] = useState();
  const [loading, setLoading] = useState(false);


  const Jwt = process.env.REACT_APP_JWT// jwt token key
  const pinata = new PinataSDK({
    pinataJwt: Jwt,
    pinataGateway: "https://gateway.pinata.cloud",// pinata gatway
  });



  const AddVoters = async () => {
    setLoading(true)
    const auth = await pinata.testAuthentication()
    console.log('auth is:', auth)

    console.log('file s', votername, voterage, voterAddress)

    try {
      const gas = await contract.methods.registerVoter(voterAddress).estimateGas({ from: account })//check estimate gas
      const result = await contract.methods.registerVoter(voterAddress).send({ from: account, gas: gas })//send transaction from account with estimate gas
      console.log("result is ", result)
      notify('success', 'Success', 'Voter successfully added')// Pass arguments within notify function, imported from notify.jsx file
    } catch (error) {
      let errorMessage;// create variable to store error
      console.log('error is', error)
      if (error && error.data && error.data.message) {//track error prosition 
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';//if error reason not found 
      }
      notify('error', 'Error', errorMessage)// pass arguments in notify function 
    }
    finally {
      setLoading(false)//loading false, determine function execution compeleted
    }
    try {
      const metadata = pinata.upload.json({// upload voter json metadata to pinata ipfs
        name: votername,
        age: voterage,
        address: voterAddress

      }).then((resp) => {
        setVoterDataUrl(`https://gateway.pinata.cloud/ipfs/${resp.IpfsHash}`);// set metadata url from pinata
        console.log(`https://gateway.pinata.cloud/ipfs/${resp.IpfsHash}`)
      })
    } catch (error) {
      console.log("Error:", error);
    }finally{
      setLoading(false)
    }

  }
  return (
    <div className="text-center">
      {loading && (
        <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute' }}>
          <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
        </div>
      )}
      <Card className=" col-xl-6  col-sm-12 mx-auto mt-5 shadow rounded-5 CardStyle">
        <div className="col-xl-9 mt-5 mb-5 col-sm-12 col-xs-12 mx-auto  p-2">
          <h4>Register Voter</h4>

          <InputLabel className="text-start mt-4 p-1">Voter Name</InputLabel>
          <TextField onChange={(e) => setVotername(e.target.value)} className="w-100" size="large" placeholder="Enter voter name" type="text" required />

          <InputLabel className="text-start mt-3 p-1">Age</InputLabel>
          <TextField onChange={(e) => setVoterage(e.target.value)} className="w-100" size="large" placeholder="Enter voter age" type='number' required />

          <InputLabel className="text-start mt-3  p-1">Address</InputLabel>
          <TextField onChange={(e) => setVoterAddress(e.target.value)} className="w-100" size="large" placeholder="Enter voter address" type="text" required />

          <Button onClick={AddVoters} className="w-100 mt-5 mb-4 rounded-3" variant="contained" size="large" >Add voter</Button>
        </div>
      </Card>
    </div>
  )
};

export default AddVoter;
