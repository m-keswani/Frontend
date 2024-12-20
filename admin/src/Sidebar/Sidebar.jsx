import React, { useEffect, useState } from 'react';

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
import { TbLogout } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { TfiMoney } from "react-icons/tfi";


const Sidebar = () => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()

  
  const menuOptions = [
    {
      
      text: "Dashboard",
      icon: <BiSolidDashboard style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
      
    },
    {
      text: "Add Category",
      icon: <IoIosAddCircle style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Add Sub Category",
      icon: <IoIosAddCircle style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Add Size",
      icon: <IoIosAddCircle style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Add Color",
      icon: <IoIosAddCircle style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    
    {
      text: "Available Product",
      icon: <MdEventAvailable style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Add Product",
      icon: <IoIosAddCircle style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },

    {
      text: "Add Admin",
      icon: <AiOutlineUserAdd style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Available Admins",
      icon: <MdEventAvailable style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },
    {
      text: "Payment Details",
      icon: <TfiMoney  style={{fontWeight: 'bold',fontSize: '24px',color:'black' }}/>,
    },


  ];
  
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
      case 'Available Admins':navigate('/availableadmin');break;
      case 'Payment Details':navigate('/payment-details');break;

    }

  }

  return(
    <div className='navbar-mean'>
        <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left" >
        <div style={{ textAlign: 'right', padding: '10px'  }}>
          <TfiClose onClick={() => setOpenMenu(false) }/>
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

  )
            }
  export default Sidebar;