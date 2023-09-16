import React, { useState } from 'react';
import './navbar0.css';
//import logo1 from '../Assets/Logo1.png'
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";


const Navbar = () => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "TRENDING",
      icon: <HomeIcon />,
    },
    {
      text: "MEN",
      icon: <ion-icon name="male"></ion-icon>,
    },
    {
      text: "WOMEN",
      icon: <ion-icon name="female"></ion-icon>,
    },
    {
      text: "KIDS",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "SALE",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
      
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left">
        <Box
          sx={{ width: 500 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      <div className="container">
      
        <ul className="nav-links">
        <li><a href="#">TRENDING</a></li>
        <li><a href="#">MEN</a></li> 
        <li><a href="#">WOMEN</a></li>
        <li><a href="#">KIDS</a></li> 
        <li><a href="#">SALE</a></li> 
        
        </ul>

      </div>
      
        <div className={`search-box ${isSearchOpen ? 'open' : ''}`}>
          <input type="text" placeholder="Search" />
        </div>
        <div className="menu-button" onClick={toggleSearch}>
          <ion-icon name="search-outline"></ion-icon>
          <i className={`fas fa-search ${isSearchOpen ? 'open' : ''}`}></i>
        </div>
        <a href="/" className='cart'>
          <BsCart2 className="navbar-cart-icon" />
        </a>
        <a href="/" className='person'>
        <ion-icon name="person"></ion-icon>
        </a>
    </nav>
  );
};

export default Navbar;



