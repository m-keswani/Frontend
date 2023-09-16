import React, { useEffect, useState } from 'react'



const AvailableAdmin = () => {

    const [admin,setAdmin] = useState([])

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
                const response = await fetch('http://localhost:8000/adminsite/removeadmin/' + key.toString() + '/', { method: "DELETE" });



                console.log("Response From response",response)
                if(response.ok){
                    alert("data delete")
                }
                else{
                    alert("data not delete")
                }
            }
            catch(error){
                console.log("fetching Error")
            }
            
        }

  return (
    <div class="container">

    <table class="table table-bordered table-striped">
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
                <tr>
                    <td>{val.email}</td>
                    <td>{val.username}</td>
                    <td>{val.fname}</td>
                    <td>{val.lname}</td>
                    <td>{val.number}</td>
                    <td>{val.addedOn}</td>
                    <td>{val.lastLog}</td>
                    <td><button class="btn btn-danger" onClick={() => removeAdmin(val.id)}>Remove</button></td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  )
}

export default AvailableAdmin
