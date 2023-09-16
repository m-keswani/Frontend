
import React, { useEffect, useState } from 'react'
import validator from 'validator';
import Cookies from 'js-cookie';
import getToken from './getToken';
import { useNavigate } from 'react-router-dom';


const Form2 = () => {
  
  const navigate = useNavigate();
  
  //console.log("Passed Location :: ",location)
  
  
  const [data, setData] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const [userData, setUserData] = useState('')
  useEffect(() => {
    const response = fetch('http://localhost:8000/api/user/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
      // console.log("Response :: ",response)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));

  }, []);
  function checkValidity() {
  if(data.length > 0)
  {
    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr[i] = Object.values(data.length > 0 ? data[i] : null);
    }
    console.log("Array : :", arr)
    
      //console.log("Data :: ", data)
     
      
  
      
        arr.map((val) => {
          if (validator.isEmail(email)) {
            if (val[0] === email.toLowerCase()) {
              if (val[4] === password) {
                console.log("Success...")
                localStorage.setItem("isLog",true);
                
                console.log("Email :: ",email)
                localStorage.setItem("useremail",email)
                navigate("/",{ state: { bol : true } })
                
                
                setUserData(email, password)
                
              }
              else {
                console.log("Incorrect Password")
              }
  
            }
            else {
              console.log("you are not registered ")
  
            }
          }
          else {
            console.log("Your entered mail is not valid")
          }
        })
      
    
  }
  else
  {
    console.log("no user")
  }
  //setEmail(email.toLowerCase())
  
  }
  
  
  return (
    <>
      <div className="container">
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button className="btn btn-primary" type="button" onClick={checkValidity}>Sign In</button>
</div>




    </>
  )
}

export default Form2
