import React, { useEffect, useState } from 'react'
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from 'react-router-dom';
import MessageBox from './Message';
import './changepassword.css'
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')

    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedNewPassword, setIsFocusedNewPassword] = useState(false);
    const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);
    const [oldPasswordError,setOldPasswordError] = useState('')
    const [newPasswordError,setNewPasswordError] = useState('')
    const [confirmPasswordError,setConfirmPasswordError] = useState('')
    const [originalPassword,setOriginalPassword] = useState('')
    const [entry,setEntry] = useState('')
    const data = new FormData()
    const [message,setMessage] = useState('')
    const [showMessage,setShowMessage] = useState('')
    
    useEffect(() => {
        fetchUserPassword()
    }, []);
    const fetchUserPassword =async()=>{
        let data = new FormData()
        data.append('username',localStorage.getItem('user'))
        try{
            const response = await fetch('https://mohitto25.pythonanywhere.com/getadminpassword/',{method:"POST",body:data})
            if(response.ok){
                const responseData = await response.json()
                setOriginalPassword(responseData.password)
            }
            else
            {
                alert('no user found')
            }
            
        }
        catch(error)
        {
            console.log("Error while fetching data")
           //alert("Error while fetchig data")
        }
    }
    const setPassword =async()=>{
        alert(originalPassword)
        if(!verification()){
            return
        }
        data.append('uname',localStorage.getItem('user'))
        data.append('password',newConfirmPassword)
        try{
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminpassword/',{method:"PUT",body:data})
            if(response.ok){
                
                setMessage("🔐 password changed successfully")
                setOldPassword('')
                setNewPassword('')
                setNewConfirmPassword('')
                fetchUserPassword()
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false);
                  }, 3000);
            }
            else{
                console.log("Response :",response)
            }
        }
        catch(error){
            alert('Error while updating password')
        }

    }

    const verification = ()=>{
        //old password
        let isValid = true
        if(oldPassword === '')
        {
            setOldPasswordError('old password required')
            isValid = false
        }
        else
        {
            setOldPasswordError('')
        }
        //verify with old password
        if(oldPassword !== originalPassword){
            setEntry('password doesn\'t match with old password')
            isValid = false

        }
        else{
            setEntry('')
        }
        //new password
        if(newPassword === '')
        {
            setNewPasswordError('new password required')
            isValid = false

        }
        else
        {
            setNewPasswordError('')
        }
        //confirm password
        if(newConfirmPassword === '')
        {
            setConfirmPasswordError('confirm password required')
            isValid = false

        }
        else
        {
            setConfirmPasswordError('')
        }
        if(newConfirmPassword !== newPassword){
            isValid = false
        }
        if(newConfirmPassword === originalPassword){
            alert("new Password match with old password")
            isValid = false
        }
        return isValid
    }

    //old password
    const handlePasswordFocus = () => {
        setIsFocusedPassword(true);
    };

    const handlePasswordBlur = () => {
        if (!oldPassword) {
            setIsFocusedPassword(false);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    //new password
    const handleNewPasswordFocus = () => {
        setIsFocusedNewPassword(true);
    };

    const handleNewPasswordBlur = () => {
        if (!newPassword) {
            setIsFocusedNewPassword(false);
        }
    };

    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    //confirm password
    const handleConfirmPasswordFocus = () => {
        setIsFocusedConfirmPassword(true);
    };

    const handleConfirmPasswordBlur = () => {
        if (!newConfirmPassword) {
            setIsFocusedConfirmPassword(false);
        }
    };

    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };


    return (
        <div className='container'>
            {showMessage && <MessageBox message= {message} visibility='true' />}

            <div className={`input-container ${isFocusedPassword ? 'focused' : ''}`}>
                <label htmlFor="inputField" className={`input-label ${isFocusedPassword ? 'label-up' : ''}`}>
                    Old Password
                </label>
                <div className="input-field-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="inputField"
                        className="input-field form-control custom-input custom-textbox-width no-shadow"
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword}
                        required
                    />
                    <div className='eye' onClick={togglePasswordVisibility}>
                        {passwordVisible ? <HiEyeOff /> : <HiEye />}
                    </div>


                </div>
            </div>
            {oldPasswordError}
            {entry}
            <div className={`input-container ${isFocusedNewPassword ? 'focused' : ''}`}>


                <label htmlFor="inputField" className={`input-label ${isFocusedNewPassword ? 'label-up' : ''}`}>
                    New Password
                </label>
                <div className="input-field-container">
                    <input
                        type={newPasswordVisible ? 'text' : 'password'}
                        id="inputField"
                        className="input-field form-control custom-input custom-textbox-width no-shadow"
                        onFocus={handleNewPasswordFocus}
                        onBlur={handleNewPasswordBlur}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                    />{newPasswordError}
                    <div className='eye' onClick={toggleNewPasswordVisibility}>
                        {newPasswordVisible ? <HiEyeOff /> : <HiEye />}
                    </div>


                </div>
            </div>
            

            <div className={`input-container ${isFocusedConfirmPassword ? 'focused' : ''}`}>

                <label htmlFor="inputField" className={`input-label ${isFocusedConfirmPassword ? 'label-up' : ''}`}>
                    Confirm Password
                </label>
                <div className="input-field-container">
                    <input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        id="inputField"
                        className="input-field form-control custom-input custom-textbox-width no-shadow"
                        onFocus={handleConfirmPasswordFocus}
                        onBlur={handleConfirmPasswordBlur}
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                        value={newConfirmPassword}
                        required
                    />
                    <div className='eye' onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
                    </div>
            </div>
            {}

            {newConfirmPassword && newPassword !== newConfirmPassword ? (<p>confirm password doesn't match with new password</p>):newConfirmPassword===''?confirmPasswordError:null}
                <br/><button onClick={setPassword}>Set Password</button>
            </div>
        </div>
    )
}

export default ChangePassword
