
import { Drawer, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext, useEffect } from "react"
import { MdAddCircle, MdDarkMode, MdHome, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router";
import { themeContext } from "../Context/ThemeContext";
import Aos from "aos";
import 'aos/dist/aos.css';
import { FaList } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { FaHourglassStart } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
const Sidebar = ({ open, close }) => {
  const { isDark, toggleTheme } = useContext(themeContext)
  const navigate = useNavigate();

  useEffect(()=>{
      Aos.init({
        duration:2000
      })
  },[]);

  return (
    <div className="">

      <Drawer className="d-sm-none d-block " style={{width:'300px'}} anchor="left" open={open} onClose={close}>
        <div className={isDark ? 'MySidebar h-100 bg-dark' : 'MySidebar h-100 bg-light'} >
        <ListItemButton  className="p-3 w-100 " onClick={() => navigate('/')} data-aos='fade-right'>
            <ListItemIcon>
              <MdHome size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
          <hr className="mt-0" />
          <ListItemButton  className="p-3 w-100 " onClick={() => navigate('/candidatelist')} data-aos='fade-right'>
            <ListItemIcon>
              <FaList size={22} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Candidates List' />
          </ListItemButton>
          <ListItemButton  className="p-3 w-100 " onClick={() => navigate('/addcandidate')} data-aos='fade-right'>
            <ListItemIcon>
              <TiUserAdd size={22} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Add Candidates' />
          </ListItemButton>
          <ListItemButton  className="p-3 w-100 " onClick={() => navigate('/addvoter')} data-aos='fade-right'>
            <ListItemIcon>
              <RiUserAddLine size={22} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Add voters' />
          </ListItemButton>
          <ListItemButton  className="p-3 w-100" onClick={() => navigate('/startvoting')} data-aos='fade-right'>
            <ListItemIcon>
              <FaHourglassStart size={22} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Set Voting' />
          </ListItemButton>
          <ListItemButton  className="p-3 w-100" onClick={() => navigate('/result')} data-aos='fade-right'>
            <ListItemIcon>
              <BsStars size={22} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Result' />
          </ListItemButton>
          <hr />
          {!isDark ? (
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <MdDarkMode size={22} /> {/* Increase size to 24px */}
              </ListItemIcon>
              <ListItemText primary='Dark mode' />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <MdLightMode size={22} /> {/* Increase size to 24px */}
              </ListItemIcon>
              <ListItemText primary='Light mode' />
            </ListItemButton>
          )}
         
        </div>
      </Drawer>

    </div >
  )
};

export default Sidebar;
