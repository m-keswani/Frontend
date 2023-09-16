  import React from 'react'
import { useState } from 'react'
import validator from 'validator';
import getToken from './getToken';
const Form = () => 
{
  const [email,setEmail] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [date,setDate] = useState('')
  const [password,setPassword] = useState('')
  const [gender,setGender] = useState('')
    
  const submitData = async (e) => {
    console.log("Submit Button Clicked")
    console.log(email)
    console.log(fname)
    console.log(lname)
    console.log(date)
    console.log(password)
    console.log(gender)
    
    const formData = new FormData()
    formData.append('email',email.toLowerCase())
    formData.append('fname',fname)
    formData.append('lname',lname)
    formData.append('dob',date)
    formData.append('password',password)
    formData.append('gender',gender)

    try{
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          'X-CSRFToken': getToken('csrfToken'),
      },
        body: formData,
    });
    console.log("**********FormData*****************",formData)
    if (!response.ok) {
      
      const errorData = await response.json(); // Assuming the backend returns error details as JSON
      if (errorData && errorData.detail.includes('PRIMARY KEY constraint')) {
        console.log("i n error part")
        // Handle primary key violation error
        console.log('Primary key violation:', errorData.detail);
      } else {
        // Handle other errors
        console.log('Other error:', errorData.detail);
      }
    } else {
      // Record created successfully
    }

    console.log(response)
    //alert("Data sent ")
    }
    catch(error){
      console.log("error",error.message)
    }
  }
  
  return (
    <div className="container">
    <div className="mb-3">
        <label className="form-label">Email:</label>
        <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
        <label className="form-label">First Name:</label>
        <input type="text" className="form-control" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
    </div>
    <div className="mb-3">
        <label className="form-label">Last Name:</label>
        <input type="text" className="form-control" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
    </div>
    <div className="mb-3">
        <label className="form-label">Date of Birth:</label>
        <input type="date" className="form-control" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
    </div>
    <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div className="mb-3">
        <label className="form-label">Select preference:</label>
        <select className="form-select" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Not to say">Not to Say</option>
        </select>
    </div>
    <button className="btn btn-primary" type="button" onClick={submitData}>Register</button>
</div>

  )
}

export default Form
