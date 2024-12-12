// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // state variables
    address public owner;
    bool public started;
    uint256 public candidateCount;
    uint256 public voterCount;
    uint256 public voteCount;

    struct Candidate {// create Candate type structure to store candidate data
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }

    Candidate[] public candidates;// Candidate structure type array to store candidates

    mapping(uint256 => Candidate) public getCandidateById; // get candidate by candidate's id
    mapping(address => bool) public isCandidateAdded;
    mapping(address => bool) public isVoterRegistered;  
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint256 candidateId, string name, string party, address candidateAddress);
    event VoterRegistered(address voterAddress);
    event VoteCast(address voterAddress, uint256 candidateId);
    event WinnerDeclared(uint256 index, Candidate candidate);

    modifier onlyOwner() {// create modifier for only  ower access 
        require(msg.sender == owner, "Access restricted to owner");
        _;
    }

    modifier isRegisteredVoter() {// check voter register or not
        require(isVoterRegistered[msg.sender], "You are not a registered voter");
        _;
    }

    modifier hasNotVotedYet() {// check voter has voter or not
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor() {// set owner inital deployment
        owner = msg.sender;
    }

    function startVoting() public onlyOwner {// start voting 
        require(!started, "Voting already started");
        started = true;
    }

    function endVoting() public onlyOwner {// end voting
        require(started, "Voting already ended");
        started = false;
    }

    // Add candidates 
    function addCandidate(string memory name, string memory party) public onlyOwner {
        candidateCount++;
        Candidate memory newCandidate = Candidate({
            id: candidateCount,
            name: name,
            party: party,
            voteCount: 0
        });
        candidates.push(newCandidate);// push candidates data to an array
        getCandidateById[candidateCount] = newCandidate; // set scpecific candiate data with id key
    }

    function getAllCandidates() public view returns (Candidate[] memory) {//fetch all candidate list
        return candidates;
    }

    function registerVoter(address voterAddress) public onlyOwner {//register voter by address
        require(!isVoterRegistered[voterAddress], "Voter already registered");
        voterCount++;
        isVoterRegistered[voterAddress] = true;
        emit VoterRegistered(voterAddress);
    }

    function vote(uint256 candidateId)// vote 
        public
        isRegisteredVoter
        hasNotVotedYet
    {
        require(started, "Voting not started");// check voting started 
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");// check id vailed
        require(msg.sender != owner, "Owner cannot vote");

        voteCount++;// increase vote by 1
        hasVoted[msg.sender] = true; // set voter voted behalf of voter's address

        // Update vote counts in both the mapping and the array
        getCandidateById[candidateId].voteCount++; // update candidate vote count
        candidates[candidateId - 1].voteCount++;    

        emit VoteCast(msg.sender, candidateId);
    }


// find winner
    function getWinner() public view onlyOwner returns (Candidate memory) {
        require(!started, "Voting is not over");// voting must be ended 
        uint256 highestVoteCount = 0;
        uint256 index;// to store winner candidate index

        for (uint256 i = 0; i < candidates.length; i++) {// iterate each candidates array element
            if (candidates[i].voteCount > highestVoteCount) {//which candidate has more votes 
                highestVoteCount = candidates[i].voteCount;
                index = i;  // set index
            }
        }
        return candidates[index];// retrun candidate using index from candidates array
    }
}
