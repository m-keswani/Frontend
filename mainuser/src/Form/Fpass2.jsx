import React, { useState, useEffect } from 'react';
import './login.css';
import Loginn from './login.jpg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { CgMail, CgFacebook } from 'react-icons/cg';

function Login() {
  const initialValues = { email: '', password: '' };
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
    const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i;
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!passw.test(values.password)) {
      errors.password =
        'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    }

    return errors;
  };

  return (
    <div>
    
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
                      type="password"
                      name="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter New password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <p className="text-danger">{formErrors.password}</p>
                  </div>
                  
                  <div className="text-center  text-lg-start mt-4">
                    <button
                      type="submit"
                       className="btn btn-dark  btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
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
    </div>
  );
}

export default Login;
