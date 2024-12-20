import React, { useEffect, useState } from 'react'
import MessageBox from './Message';
import './AdminCss.css'
import { AiFillDelete } from 'react-icons/ai';
const AvailableAdmin = () => {

    const [admin,setAdmin] = useState([])
    const [message,setMessage] = useState('')
    const [showMessage,setShowMessage] = useState('')


    useEffect(() => {
        fetchAdmins()
        
    }, []);

    const fetchAdmins =async()=>{
        const response = await fetch('http://localhost:8000/adminsite/addadmin')
        const responseData = await response.json()
        setAdmin(responseData)
    }

        const removeAdmin =async(key)=>{
            try{
                setShowMessage(true)

                setMessage('Removing...')

                const response = await fetch('http://localhost:8000/adminsite/removeadmin/' + key.toString() + '/', { method: "DELETE" });

                console.log("Response From response",response)
                if(response.ok){
                    setMessage("🚮 Removed Successfully")
                    setTimeout(() => {
                        setShowMessage(false);
                      }, 3000);
                    fetchAdmins()

                }
                else{
                    setMessage('❗Error while removing')
                    setTimeout(() => {
                        setShowMessage(false);
                      }, 3000);
                    fetchAdmins()
                }
            }
            catch(error){
                console.log("fetching Error")
            }
            
        }

  return (
    <div class="container-xl non-selectable">
  {showMessage && <MessageBox message={message} visibility='true' />}

  <table class="table table-bordered table-striped custom-table">
    <thead>
      <tr>
        <th>Email</th>
        <th>Username</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        <th>Added on</th>
        <th>Last Log</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {admin.map((val) => (
        <tr key={val.id}>
          <td>{val.email}</td>
          <td>{val.username}</td>
          <td>{val.fname}</td>
          <td>{val.lname}</td>
          <td>{val.number}</td>
          <td>{val.addedOn}</td>
          <td>{val.lastLog}</td>
          <td><button class="button" onClick={() => removeAdmin(val.id)}><AiFillDelete/> Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  )
}

export default AvailableAdmin
