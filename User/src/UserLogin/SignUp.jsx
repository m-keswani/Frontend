import { useState, useEffect } from "react";
import "./From.css";
import React from "react";
import Logo from "../Assets/Logo.png"


function SignUp() {
  const initialValues = { username: "", email: "",dob: "", password: "",confirmPassword: "",agreeToTerms: false,};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox separately as it has a 'checked' property
    if (type === "checkbox") {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$;/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.dob) {
        errors.dob = "Date of Birth is required";
      }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passw.test(values.password)) {
      errors.password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
    
      return errors;
    
  };

  return (
    <div className="main-container">
   
        
        <div className="txt1">Create Member profile and get first access
         to the very best of Nike products, inspiration and community.
        </div >
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify()}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <div className="join-us">
        <h1 className="joinus">JOIN US</h1>
        </div>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            
            <input
              type="text"
              name="username"
              placeholder="First Name"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            
            <input
              type="text"
              name="username"
              placeholder="Last Name"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            
             <input
             type="date"
             name="dob"
             value={formValues.dob}
             onChange={handleChange}
             />
             <div className="linertxt">Get a Member Reward every year on your Birthday.</div>
             </div>
            <p>{formErrors.dob}</p>
          <div className="field">
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
     
        <p>{formErrors.agreeToTerms}</p>
          <button className="button">Submit</button>
        </div>
        <div className="login" >
        <div className="linertxt">Already a Member?  <a className="logini" href="/"> login</a></div>
      
       
        </div>
        
      </form>
     
    </div>
    </div>
  );
}

export default SignUp;
