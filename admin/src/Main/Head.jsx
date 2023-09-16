import React, { useState } from 'react';
import './head.css';
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
import Back from '../Back/Back';
import { useNavigate } from 'react-router-dom';

const Head = () => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()
  const menuOptions = [
    {
      
      text: "Dashboard",
      icon: <ion-icon name="home-outline"></ion-icon>,
      
    },
    {
      text: "Add Category",
      icon: <ion-icon name="male"></ion-icon>,
    },
    {
      text: "Add Sub Category",
      icon: <ion-icon name="female"></ion-icon>,
    },
    {
      text: "Add Size",
      icon: <ion-icon name="female"></ion-icon>,
    },
    {
      text: "Add Color",
      icon: <ion-icon name="female"></ion-icon>,
    },
    
    {
      text: "Available Product",
      icon: <ion-icon name="male"></ion-icon>,
    },
    {
      text: "Add Product",
      icon: <ion-icon name="male"></ion-icon>,
    },

    {
      text: "Add Admin",
      icon: <ion-icon name="male"></ion-icon>,
    },
  ];
  
  const [isSearchOpen, setSearchOpen] = useState(false);
  
  const handleDashboard =(item)=>{
    setOpenMenu(false)
    switch(item.text)
    {
      case 'Dashboard':navigate('/');break;
      case 'Add Category':navigate('/addcategory');break;
      case 'Add Sub Category':navigate('/addsubcategory');break;
      case 'Add Size':navigate('/addsize');break;
      case 'Add Color':navigate('/addcolor');break;
      
      case 'Available Product':navigate('/showproduct');break;
      case 'Add Product':navigate('/addproduct');break;
      case 'Add Admin':navigate('/addadmin');break;

    }

  }

  const logOut =()=>{
    localStorage.setItem('validAdmin',false)
    window.location='/'
  }
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div >
        
        <div className="p-3 text-white" id='head1' style={{  position:'relative'}} >
            Administration
            <div className='float-right'>
  
            <button onClick={logOut}>Logout</button>
            </div>


        </div>
        <div class="p-1 bg-muted text-white" id='head2'>
        Home
        </div>
       
        <div className='navbar-mean'>
        <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left" >
        <div style={{ textAlign: 'right', padding: '10px'  }}>
          <button onClick={() => setOpenMenu(false)}>Close</button>
        </div>
        <Box 
          sx={{ width: 300  }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleDashboard(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      
      </div>
          <div>
            {localStorage.getItem('validAdmin')}
          </div>
          <div className={`input-container ${isFocused ? 'focused' : ''}`}>
      <label htmlFor="inputField" className={`input-label ${isFocused ? 'label-up' : ''}`}>
        Enter your text
      </label>
      <input
        type="text"
        id="inputField"
        className="input-field"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
    </div>
  );
};

export default Head;



