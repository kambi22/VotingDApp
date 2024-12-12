import { Button, Card, InputLabel, TextField } from "@mui/material";
import React, { createContext, useContext, useState } from "react"
import { Container } from "react-bootstrap";
import { BlockchainContext } from "../Connection/Connection";
import { notify } from "./Notify";
import Blocks from './imags/Blocks.png'
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router";

const StartVoting = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);// get values from blockchain context provider from connection file
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const VotingStart = async () => {
    setLoading(true)//show loader utile function execution not copeleted
    try {
      const gas = await contract.methods.startVoting().estimateGas({ from: account })//check estimate gas
      const result = await contract.methods.startVoting().send({ from: account, gas: gas })//send transaction from account with estimate gas
      console.log("result is ", result)
      notify('success', 'Success', 'Voting successfully started')// Pass arguments within notify function, imported from notify.jsx file
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
  }
  const VotingEnd = async () => {
    setLoading(true)//show loader utile function execution not copeleted
    try {
      const gas = await contract.methods.endVoting().estimateGas({ from: account })//check estimate gas
      const result = await contract.methods.endVoting().send({ from: account, gas: gas })//send transaction from account with estimate gas
      console.log("result is ", result)
      notify('success', 'Success', 'Voting successfully ended')// Pass arguments within notify function, imported from notify.jsx file
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
  }
  const showResults = async () => {
    navigate('/result')
  }

  return (

    <div>
      {loading && (
        <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute' }}>
          <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
        </div>
      )}
      <Container className="mt-5">
        <Card className="shadow mx-auto  mt-5 rounded-5 col-xl-6 col-xs-12 col-sm-12 h-100">
          <h4 className="mt-4">Set Voting</h4>
          <img className=" mx-auto" src={Blocks} alt="blockchain" style={{ height: '300px', width: '300px' }} />
          <div className="col-xl-10  col-sm-12 col-xs-12  mx-auto">

           
            <div className="d-flex justify-content-center mb-5 mt-4">
              <Button id="ButtonColor" onClick={VotingStart} className="ButtonColor m-2 w-100" size="large" variant="contained" >Start</Button>
              <Button id="ButtonColor" onClick={VotingEnd} className=" m-2 w-100" size="large" variant="contained" >End</Button>
              <Button id="ButtonColor" onClick={showResults} className="ButtonColor m-2 w-100" size="large" variant="contained" >get Winner</Button>
            </div>
          </div>
        </Card>

      </Container>
    </div>


  )
};

export default StartVoting;
