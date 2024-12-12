import React, { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import { MdLightMode, MdDarkMode, MdMenu } from "react-icons/md";
import { themeContext } from "../Context/ThemeContext";
import Sidebar from "./Sidebar";
import Blocks from './imags/Blocks.png'

const Header = () => {
  const { isDark, toggleTheme } = useContext(themeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarHandler = () => {
    setOpen(!open)// state for sidebar
  }

  return (
    <div className="sticky-top">

      <Navbar className={!isDark ? 'ColoredLight shadow ' : 'ColoredDark shadow'} expand='md' sticky="top" style={{ height: '70px' }} >
        <Container  >
          <Sidebar open={open} close={SidebarHandler} />
          <div className="me-auto d-flex">
            <IconButton className="d-inline d-sm-none" onClick={SidebarHandler}>
              <MdMenu />
            </IconButton>
            <Navbar.Brand className="" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src={Blocks} style={{height:'40px', width:'40px'}} alt="" />
              <strong className={!isDark ? 'ColoredLight' : 'ColoredDark'}>Voting</strong>
            </Navbar.Brand>
          </div>
          <Nav className="">
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline ' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/')}>Dashboard</Nav.Link>
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/candidatelist')}>Voting</Nav.Link>
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/addcandidate')}>+ Candidate</Nav.Link>
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/addvoter')}>+Voters</Nav.Link>
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/startvoting')}>Start Voting</Nav.Link>
            <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={() => navigate('/result')}>Result</Nav.Link>
          </Nav>
          <Nav className="" >

            <IconButton className={!isDark ? 'd-inline' : 'd-none'} onClick={toggleTheme} >
              <p className={!isDark ? 'd-inline h6 me-1' : 'd-none'}>Light</p>
              <MdLightMode />
            </IconButton>
            <IconButton className={isDark ? 'd-inline' : 'd-none'} onClick={toggleTheme}>
              <p className={isDark ? 'd-inline h6 me-1' : 'd-none'}>Dark</p>
              <MdDarkMode />
            </IconButton>
          </Nav>
        </Container>



      </Navbar>

    </div>
  )
};

export default Header;
