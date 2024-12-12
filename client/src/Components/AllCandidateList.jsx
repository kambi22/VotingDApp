import { Button, Card, Skeleton, TextField, } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { BlockchainContext } from "../Connection/Connection";
import { Player } from "@lottiefiles/react-lottie-player";
import { notify } from "./Notify";



const CandidateList = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);// get states data from connection file 
  //set states
  const [candidates, setCandidates] = useState();
  const [Voters, setVoters] = useState();
  const [Votes, setVotes] = useState();
  const [loading, setLoading] = useState(false);
  const [allCandidates, setAllCandidates] = useState([]);
  const [Statuse, setStatuse] = useState(false);

  useEffect(() => {// execute fuction  automatically when contract available
    const FetchAllCanidates = async () => {
      setLoading(true)
      try {
        const result = await contract.methods.getAllCandidates().call();// list of all candidates
        setAllCandidates(result)
    
        console.log('result',result)
      } catch (error) {
        console.log('error form owenr', error)
      } finally {
        setLoading(false)
      }
    }
    VotersAndVote()
    FetchAllCanidates();
  }, [contract]);


    const VotersAndVote = async () => {
     
      try {
        //get contract state variables
        const started = await contract.methods.started().call();
        const totalVoters = await contract.methods.voterCount().call();
        const totalCount = await contract.methods.voteCount().call();
        const totalCandidates = await contract.methods.candidateCount().call();// candidate count
         //set values in states
        setCandidates(Number(totalCandidates))
        setStatuse(started)
        setVoters(Number(totalVoters));
        setVotes(Number(totalCount))
      } catch (error) {
        console.log('error form owenr', error)
      } finally {
        setLoading(false)
      }
    }


  const AddVote = async (id) => {

    setLoading(true)
    try {
      const gas = await contract.methods.vote(id).estimateGas({ from: account })//check estimate gas
      const result = await contract.methods.vote(id).send({ from: account, gas: gas })//send transaction
      console.log("result is ", result)
      notify('success', 'Success', `Successfully voted to id: ${id}`)
      VotersAndVote()// call function to update data
    } catch (error) {
      let errorMessage;
      console.log('error is', error)
      if (error && error.data && error.data.message) {// track error
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';//if error not found
      }
      notify('error', 'Error', errorMessage)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Container>
        {loading && (
          <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute' }}>
            <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
          </div>
        )}
        <Row className="mt-5">
          <Col className="">
            {allCandidates.length > 0 ? (allCandidates.map((item, i) => (
              <Card key={i} className="shadow w-100  mt-4 rounded-5">
                <div className="m-4">
                  <div className="d-flex ">
                    <h5 className="me-2">{item.id}</h5>
                    <h5>{item.party}</h5>

                    <Button className="text-end ms-auto rounded-4" onClick={() => AddVote(item.id)} size="large" variant="contained">Vote</Button>
                  </div>
                  <h6 className="text-muted text-start">{item.name}</h6>
                </div>
              </Card>
            ))) : (
              <div className="">
                <Card className="shadow w-100  mt-4 rounded-5">
                  <div className="m-4">
                    <div className="d-flex  ">
                      <Skeleton animation='wave' width={30} height={30} className="rounded-2 me-2 id"  ></Skeleton>

                      <Skeleton animation='wave' width={50} height={30} className="rounded-2 party"  ></Skeleton>

                      <Skeleton animation='wave' width={70} height={60} className="rounded-2 text-end ms-auto vote"  ></Skeleton>

                    </div>
                    <Skeleton animation='wave' height={30} className="rounded-2 w-25 name"  ></Skeleton>

                    <Skeleton animation='wave' height={30} className="rounded-2 w-75 address"  ></Skeleton>

                  </div>
                </Card>

                <Card className="shadow w-100  mt-4 rounded-5">
                  <div className="m-4">
                    <div className="d-flex  ">
                      <Skeleton animation='wave' width={30} height={30} className="rounded-2 me-2 id"  ></Skeleton>

                      <Skeleton animation='wave' width={50} height={30} className="rounded-2 party"  ></Skeleton>

                      <Skeleton animation='wave' width={70} height={60} className="rounded-2 text-end ms-auto vote"  ></Skeleton>

                    </div>
                    <Skeleton animation='wave' height={30} className="rounded-2 w-25 name"  ></Skeleton>

                    <Skeleton animation='wave' height={30} className="rounded-2 w-75 address"  ></Skeleton>

                  </div>
                </Card>
                <Card className="shadow w-100  mt-4 rounded-5">
                  <div className="m-4">
                    <div className="d-flex  ">
                      <Skeleton animation='wave' width={30} height={30} className="rounded-2 me-2 id"  ></Skeleton>

                      <Skeleton animation='wave' width={50} height={30} className="rounded-2 party"  ></Skeleton>

                      <Skeleton animation='wave' width={70} height={60} className="rounded-2 text-end ms-auto vote"  ></Skeleton>

                    </div>
                    <Skeleton animation='wave' height={30} className="rounded-2 w-25 name"  ></Skeleton>

                    <Skeleton animation='wave' height={30} className="rounded-2 w-75 address"  ></Skeleton>

                  </div>
                </Card>
              </div>

            )}

          </Col>
          <Col>
            <Card className="shadow mt-2 rounded-4 w-100  p-3" style={{ height: '300px' }}>


              <div className="">
                <h4 className="">Total Votes</h4>
                <h1 className="mt-5  h1">{Votes}</h1>

              </div>
            </Card>
            <Card className="shadow mt-4 rounded-4 w-100  p-3" style={{ height: '300px' }}>
              <h4 className="text-center">Voting Satuse</h4>
              <div className="text-start h-100 m-2 ">
                <ul className=" p-3 h-100">
                  <li className="m-4 d-flex"><h5>Started</h5>{Statuse ? <h5 className="ms-auto ">true</h5>:<h5 className="ms-auto ">false</h5>}</li>
                  <li className="m-4 d-flex"><h5>Total Candidates</h5> <h5 className="ms-auto">{candidates}</h5></li>
                  <li className="m-4 d-flex"><h5>Total Voters</h5> <h5 className="ms-auto">{Voters}</h5></li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default CandidateList;
