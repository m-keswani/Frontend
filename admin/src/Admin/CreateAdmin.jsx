import React, { useEffect, useState } from 'react'
import validator from 'validator'
import MessageBox from './Message'
import { GrAccessibility, GrAd, GrAdd } from 'react-icons/gr';

const CreateAdmin = () => {
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const formData = new FormData();
    const [emailError, setEmailError] = useState('')
    const [fnameError, setFnameError] = useState('')
    const [lnameError, setLnameError] = useState('')
    const [numError, setNumError] = useState('')
    const [showMessage, setShowMessage] = useState('')
    const [message, setMessage] = useState('')
    const [numberError, setNumberError] = useState('')
    const [access, setAccess] = useState([])
    const [selectedAccess, setSelectedAccess] = useState([]);
    const [selectedId, setSelectedId] = useState([])
    const [restriction, setRestriction] = useState('')

    formData.append('email', email)
    //formData.append('username', 'user')
    //formData.append('password', 'password')
    formData.append('fname', fname)
    formData.append('lname', lname)
    formData.append('number', phoneNum)
    let newarray = []
    const [accessError,setAccessError] = useState('')
    const [restrictionError,setRestrictionError] = useState('')

    useEffect(() => {
        fetchAcess()
    }, []);

    const fetchAcess = async () => {
        try {
            const response = await fetch('http://localhost:8000/getadminaccess/')
            const responseData = await response.json()
            setAccess(responseData)
        }
        catch (error) {
            alert("Error While fetching accesses")
        }
    }


    const handleOptionSelect = (event) => {
        const selectedValue = event.target.value;

        if (!selectedAccess.includes(selectedValue)) {
            setSelectedAccess([...selectedAccess, selectedValue]);
            access.map((val) => {
                if (val.accessName === selectedValue) {
                    if (!selectedId.includes(val.id)) {
                        setSelectedId([...selectedId, val.id]);
                    }
                    //setSelectedId([...selectedId, val.id]);

                }
            })
        }

    };
    const sendDetail = async () => {
        //For Email
        setShowMessage(true)

        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email!')
            return
        }
        else {
            setEmailError('')
        }

        if (email === '') {
            setEmailError('email required *')
            return
        }
        else {
            setEmailError('')
        }
        //For First name
        if (fname === '') {
            setFnameError('first name required *')
            return
        }
        else {
            setFnameError('')
        }
        //For Last name
        if (lname === '') {
            setLnameError('last name required *')
            return

        }
        else {
            setLnameError('')
        }
        //For number
        if (phoneNum === '') {
            setNumError('phone number required *')
            return

        }
        else {
            setNumError('')
        }

        if (phoneNum.length > 10 || phoneNum.length < 10) {
            setNumberError('number must be 10 digits')
            return
        }
        else {
            setNumberError('')
        }
        if(selectedAccess.length<1)
        {
            setAccessError('access required *')
            return
        }
        else
        {
            setAccessError('')
        }
        if(restriction === ''){
            setRestrictionError('restrictions required *')
            return
        }
        else{
            setRestrictionError('')
        }
        setMessage('Sending Credentials ...')
        setButtonClicked(true)
        try {
            const response = await fetch('http://localhost:8000/adminsite/addadmin', { method: "POST", body: formData, })

            console.log("response :: ", response)
            
            if (response.ok) {
                await addAccess()
            }
            else {
                const data = await response.json()
                setMessage('⚠️ '+data.message)

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
                return
                
            }
            
        }
        catch (error) {
            alert("Server Error")
        }

    }

    const addAccess = async () => {
        try {

            const response = await fetch('http://localhost:8000/getlatestadminid/')
            const responseData = await response.json()
            console.log("Response from admin :",responseData.id)
            await Promise.all(
                selectedId.map(async (val) => {
                    let adminAccess = new FormData()
                    adminAccess.append('adminId', responseData.id)
                    adminAccess.append('accessId', val)
                    adminAccess.append('restriction', restriction)
                    
                    try {

                        const response = await fetch('http://localhost:8000/addadminaccess/', { method: "POST", body: adminAccess });
                        if(response.ok){
                            setMessage('Sent SuccessFully ✅')
                            setTimeout(() => {
                                setShowMessage(false);
                            }, 3000);
                            setFname('')
                            setLname('')
                            setPhoneNum('')
                            setEmail('')
                            selectedAccess('')
                            selectedId('')
                        }
                        else{
                            setMessage('Problem while sending mail !')

                        }

                    } catch (error) {
                        //alert("Error while sending data");
                    }
                })
            );
        } catch (error) {
            console.log("Error :",error)
            alert("Error while fetching admin ID");
        }
    }

    const handleDeleteOption = (option) => {
        // Filter out the deleted access from selectedAccess
        const updatedAccess = selectedAccess.filter((selected) => selected !== option);
      
        // Create a new array to store the updated selected IDs
        let updatedSelectedIds = [];
      
        // Iterate through the remaining selectedAccess items
        updatedAccess.forEach((item) => {
          // Find the corresponding ID for the selectedAccess item
          const id = access.find((val) => val.accessName === item)?.id;
      
          // If an ID is found, add it to the updatedSelectedIds array
          if (id) {
            updatedSelectedIds.push(id);
          }
        });
      
        // Set the selectedId with the updated array
        setSelectedId(updatedSelectedIds);
      
        // Update the selectedAccess state
        setSelectedAccess(updatedAccess);
      };
      

    const handleAccessId = (id) => {

        if (!selectedId.includes(id)) {
            setSelectedId([...selectedId, id]);
        }
        console.log('Selected Id :', selectedId)
    };
    return (
        <div className='container non-selectable'>
      {buttonClicked ? (
        <MessageBox message={message} visibility='true' />
      ) : null}

      <label>Email:</label><br/>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

      <p className='text-danger small-text'>{emailError && <div className="error-message">{emailError}</div>}</p>

      <label>First name:</label>
      <input type="text" value={fname} onChange={(e) => setFname(e.target.value.replace(/[^A-Za-z]/g, ''))} /><br />

      <p className='text-danger small-text'>{fnameError && <div className="error-message">{fnameError}</div>}</p>

      <label>Last name:</label>
      <input type="text" value={lname} onChange={(e) => setLname(e.target.value.replace(/[^A-Za-z]/g, ''))} /><br />

      <p className='text-danger small-text'>{lnameError && <div className="error-message">{lnameError}</div>}</p>

      <label>Contact number:</label>
      <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value.replace(/[^0-9 ]/g, ''))} /><br />
      <p className='text-danger small-text'>{numError && <div className="error-message">{numError}</div>}</p>

      <div>
        <ul>
          {selectedAccess.map((option) => (
            <li key={option}>
              {option}{' '}
              <span
                className="delete-icon"
                onClick={() => handleDeleteOption(option)}
              >
                &#10006; {/* Delete icon (×) */}
              </span>
            </li>
          ))}
        </ul>
      </div>
            
      Accessibility:
      <select onChange={handleOptionSelect}>
        <option value="" disabled>-- Select Accessibility --</option>
        {access.map((val) => (
          <option key={val.id} value={val.accessName} onClick={() => handleAccessId(val.id)}>{val.accessName}</option>
        ))}
      </select><br />
      <b>{accessError}</b><br/>

      Restriction:
      <select onChange={(e) => { setRestriction(e.target.value) }}>
        <option value="" disabled>-- Select Restriction --</option>
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
      </select><br />
      <b>{restrictionError}</b><br/>

      <button onClick={sendDetail}><GrAdd/>  Add </button>
    </div>
    )
}

export default CreateAdmin

