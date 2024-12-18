﻿# Decentralized Voting DApp
 This Decentralized Voting DApp is a blockchain-based application that enables secure, transparent, and decentralized voting. The DApp is built using Solidity, React.js, web3.js, and incorporates light and dark mode functionality for an enhanced user experience. It is fully responsive and utilizes Pinata IPFS for decentralized data storage. The DApp is deployed on the Holky and Sepolia Ethereum testnets for demonstration purposes.

Features
Smart Contract Functionalities
Add Candidates:

Only the owner of the contract can add candidates.
Each candidate has an ID, name, party, and vote count.
Register Voters:

The owner registers voters by their Ethereum addresses.
Voters are stored in the contract and their metadata is uploaded to Pinata IPFS.
Voting:

Registered voters can cast their votes by selecting a candidate's ID.
Voters can only vote once.
Start and End Voting:

The owner can start and end the voting process.
Voting must be started before votes can be cast.
Declare Winner:

After voting ends, the owner can fetch the winner of the election.
The winner is determined by the highest vote count.
DApp Functionalities
Connect Wallet:
Users can connect their Ethereum wallet (e.g., MetaMask) to interact with the DApp.

Light and Dark Mode:
Users can switch between light and dark themes for better accessibility and user experience.

Responsive Design:
The DApp is fully responsive and optimized for devices of all sizes.

Data Storage on IPFS:
Voters' data is securely stored on Pinata IPFS, ensuring decentralized and tamper-proof storage.

Technologies Used
Solidity: Smart contract programming.
React.js: Frontend development.
web3.js: Blockchain interaction from the frontend.
Material-UI and Bootstrap: Styling and responsive design.
Pinata IPFS: Decentralized data storage.
Ganache: Local Ethereum test network for development.
Holesky and Sepolia Testnets: Deployment and testing of the DApp on Ethereum networks.
Deployment
The DApp is deployed on:

Holesky Ethereum Testnet
Sepolia Ethereum Testnet
How to Use
Home Page:
Connect your wallet using the provided button on the home page.

Owner Functionalities:

Add candidates by entering their details.
Register voters by their wallet addresses.
Start and end the voting process.
Fetch the winner after voting ends.
Voter Functionalities:

Cast a vote by selecting a candidate using their ID.
View real-time updates of the candidates and vote counts.
This DApp showcases the power of blockchain for building secure, decentralized applications and demonstrates expertise in Ethereum DApp development with advanced frontend and backend integration.
