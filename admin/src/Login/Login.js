import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons




const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const formdata = new FormData()
  const navigate = useNavigate()
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [usernameError,setUsernameError] = useState('')
  const [passwordError,setPasswordError] = useState('')


  const logIn = async () => {
    console.log('Username', username)
    console.log('Password', password)
    formdata.append('username', username)
    formdata.append('password', password)
    
    if(username === '')
    {
      setUsernameError("username required")
      return;
    }
    else
    {
      setUsernameError('')
    }
    
    if(password === '')
    {
      setPasswordError("password required")
      return;
    }
    else
    {
      setPasswordError('')
    }
    
    try {
      const response = await fetch('http://localhost:8000/checkadminexistence',
        { method: 'POST', body: formdata, })
      const responseData = await response.json()
      console.log("Response :: ", responseData)

      if (responseData.user_exists) {
        localStorage.setItem('validAdmin', true)
        window.location='/'       
      }
      else {
        alert('Wrong Credentials')

      }


    }
    catch (error) {
      alert("Error while Authenticate...")
    }
  }



  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!username) {
      setIsFocused(false);
    }
  };


  const handlePasswordFocus = () => {
    setIsFocusedPass(true);
  };
  const handlePasswordBlur = () => {
    if (!password) {
      setIsFocusedPass(false);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>

      <div className="administration-bg vh-100 d-flex justify-content-center align-items-center main-bg">
        <div className="administration-container card custom-card shadow">
          <div className="text-center header" >
            <h4 className="p-4 mb-0 bg-dark-info text-white">Administration</h4>
          </div>
          <div className="card-body d-flex flex-column align-items justify-content-center " id="vh-200" >



            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocused ? 'label-up' : ''}`}>
                Username
              </label>
              <input
                type="text"
                id="inputField"
                className="input-field form-control custom-input custom-textbox-width no-shadow"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) => setUsername(e.target.value)}
                required
                value={username}
              />
            </div>

            <p>{usernameError}</p>
            
            <div className={`input-container ${isFocusedPass ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedPass ? 'label-up' : ''}`}>
                Password
              </label>
              <div className="input-field-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="inputField"
                  className="input-field form-control custom-input custom-textbox-width no-shadow"
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <div onClick={togglePasswordVisibility}>
                  {passwordVisible ? <HiEyeOff /> : <HiEye />}
                </div>


              </div>
            </div>
            <p>{passwordError}</p>


            <div className="text-center mt-5">
              <button type="submit" className="btn header " onClick={logIn} style={{
                color: 'white', ':hover': {
                  color: 'inherit',
                },
              }}>Log In</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
