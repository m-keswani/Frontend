import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignupImage from './signup.jpg';
import { HiEye, HiEyeOff } from "react-icons/hi";
import './signup.css';
import MessageBox from './Message'

function Signup() {
  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirm,setConfirm] = useState('')
  const [emailExistence,setEmailExistence] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedLname, setIsFocusedLname] = useState(false);
  const [isFocusedDob, setIsFocusedDob] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
   
    if (type === 'checkbox') {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    
  };

  const handleSubmit = (e) => {
    //alert('In handle submit')
    e.preventDefault();
    setFormErrors(validate(formValues));
    //console.log('Form values :',formValues)
    setIsSubmit(true);
  };

  useEffect(() => {
    setFormErrors(validate(formValues));
    if(formValues.email !== ''){
      setIsFocusedEmail(true)
    }
    if(formValues.fname !== ''){
      setIsFocused(true)
    }
    if(formValues.lname !== ''){
      setIsFocusedLname(true)
    }
   
  }, [formValues]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
    validate(formValues)

  }, [formErrors, isSubmit]);

  const validate =(values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i;

    if (!values.fname) {
      errors.fname = 'First Name is required!';
      setConfirm(false)
      return errors
    }
    else{
      setConfirm(true)

    }

    if (!values.lname) {
      errors.lname = 'Last Name is required!';
      setConfirm(false)
      return errors

    }
    else{
      setConfirm(true)

    }
    if (!values.dob) {
      errors.dob = 'Date of Birth is required';
      setConfirm(false)
      return errors

    }
    
    else{
      setConfirm(true)

    }

    //date of birth age validate
    if (!values.dob) {
      errors.dob = 'Date of Birth is required';
      setConfirm(false)
      return errors
    } else {
      const birthDate = new Date(values.dob);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      if (age < 12) {
        errors.dob = 'You must be at least 12 years old.';
        setConfirm(false)
        return errors
      }
    }





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
      errors.password = 'Password required';
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
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
      setConfirm(false)
      return errors

    } 

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
      setConfirm(false)
      return errors

    }
    else{
      setConfirm(true)

    }

    if (!values.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms';
      setConfirm(false)
      return errors

    }
    else{
      setConfirm(true)

    }
    return errors;
  };

  //To sent detail to apis

  const signUp = async () => {
    //alert('sign Up')
    
    if (confirm) {
      const formData = new FormData()
      formData.append('email',formValues.email.toLowerCase())
      formData.append('fname',formValues.fname.toLowerCase())
      formData.append('lname',formValues.lname.toLowerCase())
      formData.append('dob',formValues.dob)
      setShowMessage(true)
      setMessage('Sending Confirmation Link')
      alert('Confirmation mail sent !')

      
      formData.append('password',formValues.password)

      const response = await fetch('https://mohitto25.pythonanywhere.com/api/newuserconfirmation/', { method: 'POST', body: formData })
      if(response.ok){
        
        const responseData = await response.json()
        console.log('user token',responseData)
      }
      else{
        const responseData = await response.json()
        setEmailExistence(responseData.message)
      }
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


/*Focuses on input box */


//First Name
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!formValues.fname  ) {
      setIsFocused(false);
    }
  };

//Last Name
const handleLnameFocus = () => {
  setIsFocusedLname(true);
};

const handleLnameBlur = () => {
  if (!formValues.lname  ) {
    setIsFocusedLname(false);
  }
};

//DOB
const handleDobFocus = () => {
  setIsFocusedDob(true);
};

const handleDobBlur = () => {
  if (!formValues.dob  ) {
    setIsFocusedDob(false);
  }
};

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
//Confirm Password
const handleConfirmPasswordFocus = () => {
  setIsFocusedConfirmPassword(true);
};

const handleConfirmPasswordBlur = () => {
  if (!formValues.confirmPassword  ) {
    setIsFocusedConfirmPassword(false);
  }
};


  return (
    
    <div>
    
      <MessageBox message={message} visibility = {showMessage} />

      <section className="vh-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-lg-5 col-xl-4">
              <img src={SignupImage} className="img-fluid" alt="Signup" />
            </div>
            <div className="col-md-6 col-lg-5 col-xl-4 pt-5">
              <div className="text-center">
                <h4>Join our community today!</h4>
                <p>Create a new account to access.</p>
              </div>
              <form onSubmit={handleSubmit}>
              
            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocused ? 'label-up' : ''}`}>
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="First"

                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocused ?  'border-dark' :'border-highlight' }`}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                value={formValues.fname}
                onChange={handleChange}

              />
              <p class="text-danger small">{formErrors.fname}</p>

            </div>
             
            <div className={`input-container ${isFocusedLname ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedLname ? 'label-up' : ''}`}>
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="Lname"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedLname ?  'border-dark' :'border-highlight' }`}
                onFocus={handleLnameFocus}
                onBlur={handleLnameBlur}
                required
                value={formValues.lname}
                onChange={handleChange}

              />
              <p class="text-danger small">{formErrors.lname}</p>

            </div>


            <div className={`input-container ${isFocusedDob ? 'focused' : ''}`}>
              
              <input
                type="date"
                name="dob"
                id="dateOfBirth"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedDob ?  'border-dark' :'border-highlight' }`}
                onFocus={handleDobFocus}
                onBlur={handleDobBlur}
                required
                value={formValues.dob}
                onChange={handleChange}

              />
              <p class="text-danger small">{formErrors.dob}</p>

            </div>


            <div className={`input-container ${isFocusedEmail ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedEmail ? 'label-up' : ''}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedEmail ?  'border-dark' :'border-highlight' }`}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                required
                value={formValues.email}
                onChange={handleChange}

              />
              <p class="text-danger small">{formErrors.email}</p>
              <p class="text-danger small">{emailExistence}</p>

            </div>

            <div className={`input-container ${isFocusedPassword ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedPassword ? 'label-up' : ''}`}>
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
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
              <p class="text-danger small">{formErrors.password}</p>

            </div>




            <div className={`input-container ${isFocusedConfirmPassword ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedConfirmPassword ? 'label-up' : ''}`}>
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}

                name="confirmPassword"
                id="confirmPassword"
                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedConfirmPassword ?  'border-dark' :'border-highlight' }`}
                onFocus={handleConfirmPasswordFocus}
                onBlur={handleConfirmPasswordBlur}
                required
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
               <div className='eye' onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
                </div>
              <p class="text-danger small">{formErrors.confirmPassword}</p>

            </div>

                <div className="m-4">
                  
                 
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      className="form-check-input"
                      id="agreeToTerms"
                      checked={formValues.agreeToTerms}
                      onChange={handleChange}
                      
                    />
                    <label className="form-check-label" htmlFor="agreeToTerms">
                      I agree to the terms and conditions
                    </label>
                    <p class="text-danger">{formErrors.agreeToTerms}</p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={signUp}
                  >
                    Sign Up
                  </button>

                  <p className="small fw-bold mt-2 mb-0">
                    Already have an account?{' '}
                    <Link to="/signin" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
