import React, { useState } from 'react'
import validator from 'validator'
const CreateAdmin = () => {
    const [email,setEmail] = useState('')
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [phoneNum,setPhoneNum] = useState('')
    const [mailSend,setMailSend] = useState("Sending...")
    const [buttonClicked,setButtonClicked] = useState(false)
    const formData = new FormData();
    const [emailError,setEmailError] = useState('')
    const [fnameError,setFnameError] = useState('')
    const [lnameError,setLnameError] = useState('')
    const [numError,setNumError] = useState('')
    

    formData.append('email',email)
    formData.append('username','user')
    formData.append('password','password')
    formData.append('fname',fname)
    formData.append('lname',lname)
    formData.append('number',phoneNum)



    
    const sendDetail =async()=>{
        //For Email
        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email!')
            return
        }         
        else
        {
            setEmailError('')
        }
        
        if(email === '')
        {
            setEmailError('email required *')
            return
        }
        else{
            setEmailError('')
        }
        //For First name
        if(fname === '')
        {
            setFnameError('first name required *')
            return
        }
        else{
            setFnameError('')
        }
        //For Last name
        if(lname === '')
        {
            setLnameError('last name required *')
            return

        }
        else{
            setLnameError('')
        }
        //For number
        if(phoneNum === '')
        {
             setNumError('phone number required *')
            return

        }
        else{
            setNumError('')
        }

        setMailSend('Sending...')
        setButtonClicked(true)
        try{
            const response = await fetch('http://localhost:8000/adminsite/addadmin',{method:"POST",body: formData,})
            
            console.log("response :: ",response)
            if(response.ok)
            {
                setMailSend("sent")
            }
            else
            {
                setMailSend("Invalid mail or error")

            }
        }
        catch(error)
        {
            setMailSend("Error while sending...")
            console.log("Error to send ")
        }
        
    }
  return (
    <div>
        {buttonClicked? mailSend:''  }<br/>
        <label>Email :: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        
        <p className='text-danger 9px'>{emailError && <div className="error-message">{emailError}</div>}</p>
        
        <label>First name :: </label>
        <input type="text" value={fname} onChange={(e) =>setFname(e.target.value.replace(/[^A-Z a-z]/g, ''))} /><br/>
        
        <p className='text-danger 9px'>{fnameError && <div className="error-message">{fnameError}</div>}</p>
        
        <label>Last name :: </label>
        <input type="text" value={lname} onChange={(e) =>setLname(e.target.value.replace(/[^A-Z a-z]/g, ''))} /><br/>
        
        <p className='text-danger 9px'>{lnameError && <div className="error-message">{lnameError}</div>}</p>
        
        <label>Contact number :: </label>
        <input type="text" value={phoneNum} onChange={(e) =>setPhoneNum(e.target.value.replace(/[^ 0-9 ]/g, ''))} /><br/>
        <p className='text-danger 9px'>{numError && <div className="error-message">{numError}</div>}</p>

        Accessibility :
        <select disabled>
            <option value="" selected disabled>--select Accessiblity</option>
        
              
        </select> <br/>  
        
        Restriction :
        <select disabled>
            <option value="" selected disabled>--select Accessiblity</option>

              
        </select> <br/>
        <button onClick={sendDetail}>send</button>
    </div>
  )
}

export default CreateAdmin



/**
 * 
 */