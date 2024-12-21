import { useState, useEffect } from "react";
import './fpass.css';
import ForgotPasswordImage from './fpass.jpg';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirm, setConfirm] = useState('')
  // State to manage the display of the success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('')
  const [isFocusedEmail,setIsFocusedEmail] = useState('')

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
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  useEffect(() => {
    setFormErrors(validate(formValues));
    
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
      setConfirm(false)
      return errors
    }
    else {
      setConfirm(true)
    }
    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      setConfirm(false)

      return errors
    } else {
      // If the email is valid, show the success message

      setConfirm(true)
      // Automatically hide the success message after 5 seconds

    }

    return errors;
  };

  const sendEmail = async () => {
    if (confirm) {

      try {
        const data = new FormData()
        data.append('email', formValues.email)
        const response = await fetch('https://mohitto25.pythonanywhere.com/api/forgotpassword/', { method: "POST", body: data })
        if(response.ok)
        {
          const responseData = await response.json()
          //console.log('response :',responseData.user)
          if (responseData.user) {
            //alert('email sent !')
            setMessage('Password change link sent to your email Valid for 10 Minutes.')
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
            const newData = new FormData()
            newData.append('email',formValues.email.toLowerCase())

            const response = await fetch('https://mohitto25.pythonanywhere.com/api/resetpassword/',{method:'POST',body:newData})
            console.log('new Response',response)
          }
          if(! responseData.user) {

            if (!response.user) {
              setMessage('This email is not registered.')
              setShowSuccessMessage(true);
              setTimeout(() => {
                setShowSuccessMessage(false);
              }, 3000);
            }
          
          }
        }
        else{
          alert('mail already sent !')
        }
      }
      catch (error){
        alert('Server Error !')
      }

    }

  }

//Email
const handleEmailFocus = () => {
  setIsFocusedEmail(true);
};

const handleEmailBlur = () => {
  if (!formValues.email  ) {
    setIsFocusedEmail(false);
  }
};



  return (
    <div>
      
      <section className="vh-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-lg-5 col-xl-4">
              <img src={ForgotPasswordImage} className="img-fluid" alt="Forgot Password" />
            </div>
            <div className="col-md-6 col-lg-5 col-xl-4">
              {showSuccessMessage ? (
                <div className="alert alert-success">{message}</div>
              ) : (
                <pre>{JSON.stringify()}</pre>
              )}
              <div className="text-center p-2">
                <h2>Forgot Password</h2>
                <p>Enter your email to reset your password.</p>
              </div>
              <form onSubmit={handleSubmit}>

              <div className={`input-container ${isFocusedEmail ? 'focused' : ''}`}>
              <label htmlFor="inputField" className={`input-label ${isFocusedEmail ? 'label-up' : ''}`}>
                Email
              </label>
              <input
                
                type="email"
                id="email"
                name='email'

                className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedEmail ?  'border-dark' :'border-highlight' }`}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                required
                value={formValues.email}
                onChange={handleChange}
              />
               
              <p className="text-danger small">{formErrors.email}</p>
              </div>


















                <div className='m-4'>
                 

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-dark"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      onClick={sendEmail}
                    >
                      Send Email
                    </button>
                  </div>

                  <p className="small fw-bold mt-2 mb-0">
                    Remember your password?{' '}
                    <Link to='/signin' className="link-danger">
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

export default ForgotPassword;
