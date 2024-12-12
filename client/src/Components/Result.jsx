
import { Button, Card, Skeleton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { BlockchainContext } from "../Connection/Connection";
import { notify } from "./Notify";
import { Player } from "@lottiefiles/react-lottie-player";

const Result = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);
  const [loading, setLoading] = useState();
  const [winner, setWinner] = useState();


  async function getWinner() {
    try {
      // Call the `getWinner` function
      const winner = await contract.methods.getWinner().call({ from: account });// get winner ,can be callable by owner only
      setWinner(winner)
      console.log('winner',winner)
    } catch (error) {
      console.error("Error calling getWinner:", error);
    }
  }
useEffect(()=>{
    getWinner();
},[contract]);// call function automatically





  return (
    <div>
      {loading && (
        <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute' }}>
          <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
        </div>
      )}
      <Container className="mt-5">
     
          <Card  className="shadow mx-auto  mt-5 rounded-5 col-xl-6 col-sm-12 col-xs-12 h-100">
            <h4 className="mt-4 text-start ms-3">Winner</h4>
            {winner? (
              <ul  className="m-5 mx-auto" >
              <li className="p-2 d-flex text-center"><h5 className="text-start">Candidate Id:</h5> <h5 className="ms-5">{winner.id}</h5></li>
              <li className="p-2 d-flex "><h5 className="text-start">Candidate Id:</h5> <h5 className="ms-5">{winner.name}</h5></li>
              <li className="p-2 d-flex "><h5 className="text-start">Candidate Name:</h5> <h5 className="ms-5">{winner.party}</h5></li>
              <li className="p-2 d-flex "><h5 className="text-start">Candidate Vote Count:</h5> <h5 className="ms-5">{winner.voteCount}</h5></li>
             
            </ul>
            ):(
              <div className="">no winner data available</div>
            )}
       
          </Card>
       
      </Container>
    </div>
  )
};

export default Result;