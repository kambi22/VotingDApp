import React from "react"
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from "./Home";
import Header from "./Navbar";
import Footer from "./Footer";
import AddCandidate from "./AddCandidate";
import AddVoter from "./AddVoter";
import CandidateList from "./AllCandidateList";
import Result from "./Result";
import StartVoting from "./StartVoting";

const Routing = (props) => {
    return (
        <div>
            <BrowserRouter>
            {/* set header */}
                <Header />
                <Routes>
                    {/* set component routes(paths) and components */}
                    <Route path="/" element={<Home />} />
                    <Route path="/addcandidate" element={<AddCandidate />} />
                    <Route path="/addvoter" element={<AddVoter />} />
                    <Route path="/candidatelist" element={<CandidateList />} />
                    <Route path="/startvoting" element={<StartVoting />} />
                    <Route path="/result" element={<Result />} />
                 
                </Routes>
                {/* set footer */}
                <Footer /> 
            </BrowserRouter>
        </div>
    )
};

export default Routing;
