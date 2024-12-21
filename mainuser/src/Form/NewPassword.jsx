import React, { useState, useEffect } from 'react';
import './login.css';
import Loginn from './login.jpg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { CgMail, CgFacebook } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from "react-icons/hi";

function NewPassword() {
  const initialValues = { password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isToken,setIsToken] = useState(false)
  const navigate = useNavigate()
  const [confirm,setConfirm]= useState()

  useEffect(() => {
    // Call the parseQueryString function when the component mounts
    parseQueryString();
  }, []);

  useEffect(() => {
    // Call checkToken when both token and email are set
    if (token && email) {
      checkToken();
    }
  }, [token, email]);

  const parseQueryString = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    // Get the values of token and email from the query string
    const tokenValue = urlParams.get('token');
    const emailValue = urlParams.get('email');

    // Update state with the values
    setToken(tokenValue);
    setEmail(emailValue);
  };

  const checkToken = async () => {
    console.log('token', token, 'email', email);
    const data = new FormData()
    data.append('token', token)
    data.append('email', email)
    try {
      const response = await fetch('https://mohitto25.pythonanywhere.com/api/checktokens', { method: 'POST', body: data })
      if (response.ok) {
        const responseData = await response.json()
        setIsToken(responseData.message)
      } else {
        alert('error while checking tokens')
      }
    } catch {
      alert('Server Error!')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i;

    if (!values.password) {
      errors.password = "Password is required";
      setConfirm(false)
      return errors
    } else 
    {
      setConfirm(true)

    }
    if (!passw.test(values.password)) {
      setConfirm(false)

      errors.password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
      return errors
    
    }
    else{
      setConfirm(true)

    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      setConfirm(false)
      
      return errors
    
    } else 
    {
      setConfirm(true)

    }
    
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
      setConfirm(false)
      
      return errors
    
    }else{
      setConfirm(true)

    }

    return errors;
  };

  const setPassword =async()=>{
    if(!confirm){
      return
    }
    const data =new FormData()
    data.append('token',token)
    data.append('email',email.toLowerCase())

    data.append('password',formValues.password)
    try{
      const response = await fetch('https://mohitto25.pythonanywhere.com/api/setpassword',{method:'POST',body:data})
      if(response.ok){
        alert('password changed successfully !')
        navigate('/signin')
      }
      else{
        alert('Error while changing password !')
      }

    }
    catch{
      alert('server Error !')
    }
  }

// password
const [passwordVisible, setpasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
      setpasswordVisible(!passwordVisible);
      
  };
  //confirm password

  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
      setconfirmPasswordVisible(!confirmPasswordVisible);
      
  };

  return (
    <div>
      {token && email ? isToken  ?(
        <section className="vh-100">
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-md-7 col-lg-5 col-xl-4">
                <div className="txt text-center">
                  <h2>Forget Password</h2>
                  <p>Reset your Password</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="m-4">
                    <div className="mb-3">
                      <input
                        type={passwordVisible ? 'text' : 'password'}

                        name="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter New password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                      <p className="text-danger">{formErrors.password}</p>
                    </div>
                    <div className='eye' onClick={togglePasswordVisibility}>
                        {passwordVisible ? <HiEyeOff /> : <HiEye />}
                    </div>
                    <div>
                      <input
                        type={confirmPasswordVisible ? 'text' : 'password'}

                        name="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                      />
                      <p className="text-danger">{formErrors.confirmPassword}</p>
                    </div>
                    <div className='eye' onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
                    </div>
                    <div className="text-center  text-lg-start mt-4">
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                        onClick={setPassword}
                      >
                        Reset Your Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : 'Invalid User' :'Empty Tokens'}
    </div>
  );
}

export default NewPassword;
