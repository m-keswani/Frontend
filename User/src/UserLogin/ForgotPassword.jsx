import { useState, useEffect } from "react";
import "./From.css";
import React from "react";

function App() {
  const initialValues = {email: ""};
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
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
      return errors;
    
  };

  return (
    <>
    <div className="main-container">
        
        <div className="txt1">YOUR ACCOUNT 
        </div >
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Email Sent </div>
      ) : (
        <pre>{JSON.stringify()}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1 className="joinus">Forget Password</h1>
        <div className="linertxt">
            Enter your email to receive instructions on how to reset your password.
            </div>
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
          <button className="button">Submit</button>
        </div>
        
      </form>
      <div className="login" >
      <div className="linertxt">Return to 
      <a className="login1" href="/"> Login</a></div>
       
        </div>
    </div>
    </div>
    </>
  );
}

export default App;
