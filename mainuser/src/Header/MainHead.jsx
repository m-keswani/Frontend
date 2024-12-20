import React, { useEffect, useState } from 'react';
import Header from './Header.css';
import logo from "./logo-white2.png";
import { BsCart3, BsPerson, BsFillSuitHeartFill, BsSearch } from 'react-icons/bs';
import {FaBold, FaShoppingBag} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaFemale,FaMale } from "react-icons/fa";
import {TbMoodKid } from "react-icons/tb";
import {AiOutlineClose  } from "react-icons/ai";
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
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";


const MainHead = ({ cartSize }) => {

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isPersonHovered, setPersonHovered] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [currentUser,setCurrentUser] = useState('')
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState();
  const [email,setEmail] = useState()

  useEffect(() => {
    
    checkAuth();
  }, []);

  const getCartQty =async(email)=>{
    const data = new FormData()
    data.append('email',email)
    const response = await fetch('http://localhost:8000/api/cartlength',{
      method:"POST",
      body:data
    })
    if (response.ok)
    {
      const responseData = await response.json()
      console.log(responseData.cartLength)
      setCartCount(responseData.cartLength)
    }
  }

  const checkAuth = async () => {
    const data = new FormData();

    data.append('token', localStorage.getItem('authToken'));
    const response = await fetch('http://localhost:8000/api/verifyuser', { method: "POST", body: data });
    const responseData = await response.json();
    if (responseData.authuser === 'false') {
      setAuthUser(false);
      setCurrentUser('')
    }
    else {
      setAuthUser(true);
      const name = await responseData.userName;
      const mail = await responseData.userEmail;
      setEmail(mail)
      getCartQty(mail)

      //console.log("Data",responseData)
      setCurrentUser(name)

    }
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
 

  const signIn =()=>{
    navigate('/signin')
  }
  const signUp =()=>{
    navigate('/signup')
  }
  const signOut =()=>{
    localStorage.setItem('authToken','')
    window.location='/'

  }
  const redirectTo =(cat)=>{
    navigate(`/allproduct?category=${cat}`)
  }
  const cartClick =()=>{
    navigate('/cart')
  }
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "TRENDING",
      icon: <HomeIcon size={30}/>,
    },
    {
      text: "MEN",
      icon: <FaMale size={25}/>,
    },
    {
      text: "WOMEN",
      icon: <FaFemale size={25}/>,
    },
    {
      text: "KIDS",
      icon: <TbMoodKid size={25}/>,
    },
    {
      text: "SALE",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  
  const navigateToHome =()=>{
    console.log('cart length :',cartSize)
    navigate('/')
  }
  

  return (
    <div className='row'>
      <div className="col-12 text-white bg-dark d-flex justify-content-between ">

        <div className='col-7'>
        <a className='imgg1' onClick={navigateToHome}><img src={logo} style={{ height: 'auto', width: '200px', paddingLeft: '15px', paddingTop: '15px' }} /></a>
          <div className="container">
         
            <ul className="nav-links mt-2 font-weight-bold">
            <a className='img-fluid' onClick={navigateToHome}><img src={logo} style={{ height: 'auto', width: '200px', paddingRight: '15px' }} /></a>
              
              <li><a className='category-link' onClick={() => redirectTo("Trending")}  >TRENDING</a></li>
              <li><a className='category-link' onClick={() => redirectTo("Male")}>MEN</a></li>
              <li><a className='category-link' onClick={() => redirectTo("Female")}>WOMEN</a></li>
              <li><a className='category-link' onClick={() => redirectTo("Kids")}>KIDS</a></li>
              <li><a className='category-link' onClick={() => redirectTo("Sale")}>SALE</a></li>
            
            </ul>
          </div>
        </div>
        <div className='col-4 d-flex flex-row-reverse '>
          <div className='m-2 pt-2'>
            {authUser ? (
              <div
              className={`person-icon ${isPersonHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setPersonHovered(true)}
              onMouseLeave={() => setPersonHovered(false)}
            >
              {isPersonHovered ? (
                <div>
                  <button className='anchor-button' onClick={signOut}>Sign Out</button> 
                </div>
              ) : (
                <div className='pt-1'>
                
                <h6>Hi,{currentUser}<BsPerson size={20} /></h6>
                
                
                </div>
              )}
            </div>
            ) : (
              <div
                className={`person-icon ${isPersonHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setPersonHovered(true)}
                onMouseLeave={() => setPersonHovered(false)}
              >
                {isPersonHovered ? (
                  <div>
                    <button className='anchor-button' onClick={signIn}>Sign In</button> | <button className='anchor-button' onClick={signUp}>Sign Up</button>
                  </div>
                ) : (
                  <BsPerson size={20} />
                )}
              </div>
            )}
          </div>

          
          <div className='m-2 pt-2 position-relative text-center' onClick={cartClick} style={{cursor: 'pointer'}}>
            <FaShoppingBag size={25}  />
            {cartCount > 0 && (
              <div
              className="position-absolute top-0 end-0 badge rounded-circle text-dark"
              style={{
                width: '1rem',
                height: '1rem',
                fontSize: '0.75rem',
                marginTop: '15px',
                marginRight: '8px',
                fontWeight: 'bold',
                cursor: 'pointer', // Add this line for the pointer cursor
              }}
            >
              {cartCount}
            </div>
            
            )}
          </div>




          <div className={`search-box ${isSearchOpen ? 'open' : ''}`}>
            <input type="text" placeholder="Search" />
          </div>
          <div className="m-2 pt-2" onClick={toggleSearch}>
            <BsSearch size={20} />
            <i className={`fas fa-search ${isSearchOpen ? 'open' : ''}`}></i>
          </div>
        </div>
        <div className="navbar-menu-container pt-3 ">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <div style={{ textAlign: 'right', padding: '10px' }}>
            <AiOutlineClose onClick={() => setOpenMenu(false)} size={30}/>
          </div>
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
      </div>
    </div>
  );
}

export default MainHead;
