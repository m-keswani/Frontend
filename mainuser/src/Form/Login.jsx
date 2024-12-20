import React, { useState, useEffect } from 'react';
import './login.css';
import Loginn from './login.jpg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { CgMail, CgFacebook } from 'react-icons/cg';
import { HiEye, HiEyeOff } from "react-icons/hi";
import MessageBox from './Message'

function Login() {
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirm,setConfirm] = useState(false)
  const [emailExistence,setEmailExistence] = useState('')
  const [passwordExistence,setPasswordExistence] = useState('')
  const [isFocusedEmail,setIsFocusedEmail] = useState('')
  const [isFocusedPassword,setIsFocusedPassword] = useState('')


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    setEmailExistence('')
  }, [formValues.email]);
  useEffect(() => {
    setFormErrors()

    setFormErrors(validate(formValues));
    setPasswordExistence('')

  }, [formValues]);

  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i;

    if (!values.email) {
      errors.email = 'Email is required!';
      setConfirm(false)
      return errors

    } 
    if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
      setConfirm(false)
      return errors
    }
    else{
      setConfirm(true)
    }

    if (!values.password) {
      errors.password = 'Password is required';
      setConfirm(false)
      return errors

    } 
    if (!passw.test(values.password)) {
      errors.password =
        'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
        setConfirm(false)
        return errors

      }
      else{
        setConfirm(true)
      }
    return errors;
  };
  
//SIgn In
  const signIn =async()=>{
    //alert(confirm)
    if(confirm ){
      //console.log('confirmation values: ',formValues)

      const formData = new FormData()
      formData.append('email',formValues.email.toLowerCase())
      formData.append('password',formValues.password)

      const response = await fetch('http://localhost:8000/api/usersignin/',{method:"POST",body:formData})
      const responseData = await response.json()
      console.log(responseData)
      if(!responseData.user){
        setEmailExistence(' email doesn\'t exists')
        
      }
      else if(!responseData.password)
      {
        setEmailExistence('')
        setPasswordExistence(' password is incorrect')
      }
      else{
        setPasswordExistence('')
        const data = new FormData()
        data.append('email',formValues.email.toLowerCase())
        try{
          const response = await fetch('http://localhost:8000/api/authuser',{method:"POST",body:data})
          if(response.ok){
            const token = await response.json()
            localStorage.setItem('authToken',token.authToken)
            window.location='/'
            
            console.log('Token : ',localStorage.getItem('authToken'))

          }
        }
        catch(error){
          alert('Error Arise while logging !')
        }
        
      }

    }

  }

// show password
  const [passwordVisible, setpasswordVisible] = useState(false);

  const togglePasswordVisibility = ()=>{
    setpasswordVisible(!passwordVisible);

  }

/**Input Box Focuses */

//Email
const handleEmailFocus = () => {
  setIsFocusedEmail(true);
};

const handleEmailBlur = () => {
  if (!formValues.email  ) {
    setIsFocusedEmail(false);
  }
};

//Password
const handlePasswordFocus = () => {
  setIsFocusedPassword(true);
};

const handlePasswordBlur = () => {
  if (!formValues.password  ) {
    setIsFocusedPassword(false);
  }
};


  return (
    <div>
      
      <section className="vh-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100 ">
            <div className="col-md-5 col-lg-5 col-xl-4">
              <img src={Loginn} className="img-fluid" alt="Login" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-4">
              <div className="txt text-center">
                <h2>Application Signin Page</h2>
                <p>Login or register from here to access.</p>
              </div>
              <form onSubmit={handleSubmit}>
              
              
              <div className={`input-container ${isFocusedEmail ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedEmail ? 'label-up' : ''}`}>
                Email
              </label>
              <input
                 type="email"
                 name="email"
                 id="form3Example3"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedEmail ?  'border-dark' :'border-highlight' }`}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                required
                value={formValues.email}
                onChange={handleChange}
              />
               
              <p className="text-danger small">{formErrors.email}</p>
              <p className="text-danger small">{emailExistence}</p>
            </div>


            <div className={`input-container ${isFocusedPassword ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedPassword ? 'label-up' : ''}`}>
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="form3Example4"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedPassword ?  'border-dark' :'border-highlight' }`}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                required
                value={formValues.password}
                onChange={handleChange}
              />

              <div className='eye' onClick={togglePasswordVisibility}>
                {passwordVisible ? <HiEyeOff /> : <HiEye />}
              </div>
              
              <p className="text-danger small">{formErrors.password}</p>
              <p className="text-danger small">{passwordExistence}</p>
            </div>

                <div className="m-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgotpassword" className="text-body">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="text-center text-lg-start mt-4">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      onClick={signIn}
                    >
                      Login
                    </button>
                  </div>
                  <p className="small fw-bold mt-2 mb-0">
                    Don't have an account?{' '}
                    <Link to="/Signup" className="link-danger">
                      Register
                    </Link>
                  </p>

                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">OR</p>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className=" mb-0 me-3 text-muted">Sign in with</p>

                    <button type="button" className="btn btn-dark">
                      <CgMail size={20}/>
                    </button>
                    <button type="button" className="btn btn-dark btn-floating mx-2">
                      <CgFacebook size={20}/>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
