import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getToken from './getToken';
import { useLocation } from 'react-router-dom';
import cart from './cart.svg'
const Head = () => {
    const navigate = useNavigate();
    const [data,setData]=useState('')
    const [isLogged, setIsLogged] = useState(false)
    const location = useLocation();
    console.log("Head Logged :: ", isLogged)
    useEffect(() => {
        const response = fetch('http://localhost:8000/api/user/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
          // console.log("Response :: ",response)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
          
      }, []); 
      
      console.log("Header Data :: ",data)
     
      const redirectToSignin = () => {
      navigate('/Signin'); // Redirects to the login page
      if (location.state && location.state.bol) {
        setIsLogged(location.state.bol)
      }
      };
      function Product (arg)
      {
        console.log("In Update Function")
        return <div>{arg.name}</div>;
      }
      const redirectToLogin =()=>{
        navigate("/login")
      }
      const redirectToSignout =()=>{
        localStorage.setItem("isLog",false)
        alert("I am Log Out")
        window.location.reload();
        //console.log("")
      }
      
      const userCart = () =>
      {
        navigate("/cart")

      }

  return (
    <div className="container ">
    {localStorage.getItem("isLog") === "true" ? (
        <>
            <p className="mb-3">Welcome, {localStorage.getItem('useremail')}</p>
            <button class="btn btn-danger btn-lg float-right" type="button" onClick={redirectToSignout}>Sign Out</button>
        </>
    ) : (
        <>
            <button className="btn btn-primary me-3" type="button" onClick={redirectToSignin}>Sign In</button>
            <button className="btn btn-success" type="button" onClick={redirectToLogin}>Log In</button>
        </>
    )}
     <button  class="btn btn-success btn-lg float-right" onClick={userCart}>Cart</button>
  
</div>

  )
}

export default Head
