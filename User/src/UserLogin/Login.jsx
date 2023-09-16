import { useState, useEffect } from "react";
import "./From.css";
import React from "react";

function App() {
  const initialValues = {email: "",password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$;/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passw.test(values.password)) {
      errors.password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
    }
    
      return errors;
    
  };

  return (
    <div className="main-container">
        
        <div className="txt1">YOUR ACCOUNT 
        </div >
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">login in successfully</div>
      ) : (
        <pre>{JSON.stringify()}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1 className="joinus">Login Here</h1>
        <div className="ui divider"></div>
        <div className="ui form">
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
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <a className="forget" href="/">Forgotten your password?</a>
          <p>{formErrors.password}</p>
          <button className="button">Submit</button>
        </div>

        <div className="login" >
      <div className="linertxt">Not a Member?  <a className="logini" href="/"> Join Us.</a></div>
      
        </div>
        
      </form>
     
    </div>
    </div>
  );
}

export default App;
