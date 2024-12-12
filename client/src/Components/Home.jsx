import React, { useContext, useState } from "react"
import { Button, Card, Fab, IconButton, TextField } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import Blocks from './imags/Blocks.png'
const Home = (props) => {
   

    const ConnectWallet = async () => {
        try {
            // pop up metamask to connect wallet with DApp
            await window.ethereum.request({ method: 'eth_requestAccounts' })

        } catch (error) {
            console.log('error to connect the wallet')
        }
    }
  

    return (
        <div className="mt-5 ">

            <Container>
                <Row>
                    <Col className="">
                        <div className=" mx-auto mt-5 " >
                            <h2 className="text-primary">Voting DApp</h2>
                            <h5 className="text-wrap text-muted">This decentralized application provides a secure, distributed, and transparent voting solution. The application data is stored on the Ethereum blockchain.The voters' data is stored on Pinata IPFS. This DApp is developed using Solidity for smart contracts, Web3.jsfor blockchain interaction, and React.jsfor the front-end, with Material-UI and Bootstrap frameworks. </h5>
                        </div>
                    </Col>
                    <Col className="">
                        <Card className="shadow d-flex-none mx-auto rounded-5 col-xl-10 col-xs-12 " style={{ height: '550px' }}>
                            <div className="d-flex-none mt-5">
                                <img className=" mx-auto" src={Blocks} alt="blockchain" style={{ height: '300px', width: '300px' }} />
                            </div>
                            <Fab id="ButtonColor" className=" w-25 mx-auto shadow m-5" onClick={ConnectWallet} variant='extended'>Connect</Fab>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Home;
