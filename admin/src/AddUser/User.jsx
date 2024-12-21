import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const User = () => {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [phone,setPhone] = useState('')
  const navigate = new useNavigate()
 
  
  function getToken(name) {
    let cookieval = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieval = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieval;
  }

  async function addUser(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('email', email)
    formdata.append('username', username)
    formdata.append('password', password)
    formdata.append('firstName', fname)
    formdata.append('lastName', lname)
    formdata.append('phoneNumber', phone)
    console.log("Form Data",email)
    try {
      console.log("headers ::", ' ')
      const response = await fetch('https://mohitto25.pythonanywhere.com/api/adduser/', {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          'X-CSRFToken': getToken('csrfToken'),
        },
        body: formdata
        ,
      })
      if(email === '' || username === '' || password === '' || fname === '' || lname==='' || phone==='' || email ==='' )
      {
        alert("data not sent")
      }
      else
      {
        alert("data sent")
        navigate('/dashboard')
      }

    }
    catch (error) {
      console.error("Error :: ", error)
    }
  }
    return (
    <div class='container'>
      Email:<input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      username:<input   type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      password:<input   type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      First Name:<input type='text' name='fname' value={fname} onChange={(e) => setFname(e.target.value)}/>
      Last Name:<input  type='text' name='lname' value={lname} onChange={(e) => setLname(e.target.value)}/>
      Phone Number: <input type='number' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
      <button onClick={addUser}>ADD USER</button>
    </div>
  )
}

export default User
