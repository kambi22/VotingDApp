import { Button, Card, InputLabel, TextField } from "@mui/material";
import React, { useContext, useState, useSyncExternalStore } from "react"
import { BlockchainContext } from "../Connection/Connection";
import { notify } from "./Notify";
import { Player } from "@lottiefiles/react-lottie-player";

const AddCandidate = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);// get states data from connection file 
  const [candidateName, setCandidateName] = useState();
  const [partyName, setPartyName] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);

  const AddCandidate = async () => {
    setLoading(true)
    try {
      const gas = await contract.methods.addCandidate(candidateName, partyName, address).estimateGas({ from: account })//check estimate gas
      const result = await contract.methods.addCandidate(candidateName, partyName, address).send({ from: account, gas: gas })//send transaction
      console.log("result is ", result)
      notify('success','Success','Candidate successfully added')// pass arguments to alert
    } catch (error) {
      let errorMessage;// create varable to store error message
      console.log('error is', error)
      if (error && error.data && error.data.message) {// track error
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';// if error not found
      }
      notify('error', 'Error', errorMessage)// pass  as an arguments withing notify fucntion, imported from notify file to show sweet alert
    }
    finally {
      setLoading(false)// state false after executtion compeleted
    }
  }
  return (
    <div className="text-center">
      <Card className=" col-xl-6  col-sm-12 mx-auto mt-5 shadow rounded-5 CardStyle">

        <div className="col-xl-9 mt-5 mb-5 col-sm-12 col-xs-12 mx-auto  p-2">
          <h4 className="">Register Candidate</h4>
          {loading && (
                <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute' }}>
                  <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
                </div>
              )}
          <InputLabel className="text-start mt-4 p-1">Candidate Name</InputLabel>
          <TextField onChange={(e) => setCandidateName(e.target.value)} className="w-100" size="large" placeholder="Enter candidate name" type="text" id="name" required />

          <InputLabel className="text-start mt-3 p-1">Party Name</InputLabel>
          <TextField onChange={(e) => setPartyName(e.target.value)} className="w-100" size="large" placeholder="Enter candidate party name" type="text" id="name" required />

          <InputLabel className="text-start mt-3  p-1">Address</InputLabel>
          <TextField onChange={(e) => setAddress(e.target.value)} className="w-100" size="large" placeholder="Enter candidate address" type="text" id="name" required />

          <Button onClick={AddCandidate} className="w-100 mt-5 mb-4 rounded-3" variant="contained" size="large" >Add candidate</Button>
        </div>
      </Card>
    </div>
  )
};

export default AddCandidate;
