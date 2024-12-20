import React, { useEffect, useState } from 'react';
import './head.css';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';


const Head = () => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();

  const [pathHistory, setPathHistory] = useState([]);

 

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


  
  const refreshPage =()=>{
    window.location='/'
  }


  useEffect(() => {
    setPathHistory((prevHistory) => new Set([...prevHistory, location.pathname]));

  }, [location.pathname]);
  const pathHistoryArray = Array.from(pathHistory);

  useEffect(() => {
    setPathHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location.pathname]);
  

  useEffect(() => {

    localStorage.setItem('pathHistory', JSON.stringify(pathHistory));
  }, [pathHistory]);

  useEffect(() => {
    setPathHistory((prevHistory) => {
      const updatedHistory = [...new Set([...prevHistory, location.pathname])];
      return updatedHistory;
    });
  }, [location.pathname]);
  

  
  const handleBack = () => {
    if (pathHistoryArray.length > 1) {
      const updatedHistory = [...pathHistoryArray];
      updatedHistory.pop(); // Remove the current path.
      const previousPath = updatedHistory.pop(); // Get the previous path.
      if (previousPath) {
        navigate(previousPath); // Navigate to the previous path.
      }
      setPathHistory(updatedHistory); // Update path history state.
    }
  };

















  return (
    <div>
      
      <div className="p-3 text-white head1" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-12 my-custom-hover" onClick={refreshPage}>
              Administration
            </div>
          
            <div className="col-md-4 col-12 text-md-right">
              <div className="row">

                <div className="col-md-5 col-12 text-right ">
                  welcome, <b className=' font-weight-normal user'>{localStorage.getItem('user').toLowerCase()}</b>
                </div>
                <div className="col-md-4 col-12 ">
                  <Link to = '/changepassword' className='text-white my-custom-hover'>change password  </Link>
                </div>
                <div onClick={logOut} className="col-md-3 col-12 text-right my-custom-hover">
                  log out <TbLogout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-white head2">
        {pathHistoryArray.map((path, index) => (
          <span key={index}>
            <Link to={path} onClick={handleBack} className='text-white font-weight-light'>{path}</Link>
            {index < pathHistoryArray.length - 1}
          </span>
        ))}
      </div> 
      <Sidebar/>



    </div>
  );
};

export default Head;


/**
 * 
     

 */


