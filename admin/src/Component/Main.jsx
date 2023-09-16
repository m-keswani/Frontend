import React, { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import './admin.css';



const Main = () => {
    const navigate = useNavigate();
    
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
    const [data,setData] =useState('')
    const [userdata,setUserdata] =useState('')
    
    useEffect(() => {
        const response = fetch('http://localhost:8000/api/product/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
          //console.log("Response :: ",response)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
    
      }, []); 
      useEffect(() => {
        const response = fetch('http://localhost:8000/api/adduser/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
          //console.log("Response :: ",response)
          .then(response => response.json())
          .then(userdata => setUserdata(userdata))
          .catch(error => console.error('Error fetching data:', error));
    
      }, []);
      console.log("Latest Data ",userdata)
    console.log("Get Data :: ",data)
    const arr = []
    for (let i = 0; i < data.length; i++) {
        arr[i] = Object.values(data.length > 0 ? data[i] : null);
    }
    const arr1 = []
    for (let i = 0; i < userdata.length; i++) {
        arr1[i] = Object.values(userdata.length > 0 ? userdata[i] : null);
    }
    console.log("latest Aray :: ", arr1)
    function updateProduct (pid,name,des,qty,image,price)
    {
        console.log(pid,name,des,qty,image,price)
        try{
            //fetch("http://localhost:8000/api/product/"+pid.toString()+'/',{method:"PUT"});
            navigate('/EditProduct', { state: { id: pid,name:name,des:des,qty:qty,image:image,price:price } });
            
        }
        catch(error)
        {
            console.log("Error ",error)
        }
    }
    function deleteProduct (pid)
    {
        try{
            fetch("http://localhost:8000/api/product/"+pid.toString()+'/',{method:"DELETE"});
            
            
        }
        catch(error)
        {
            console.log("Error ",error)
        }
    }
    function deleteUser (pid)
    {
        try{
            fetch("http://localhost:8000/api/adduser/"+pid.toString()+'/',{method:"DELETE"});
            
            
        }
        catch(error)
        {
            console.log("Error ",error)
        }
    }
    const redirectToaddProduct = () => {
        navigate('/addProduct'); // Redirects to the login page
        
        };
    const redirectToadduser = () => {
      navigate('/adduser'); // Redirects to the login page
         
    };
          
  return (
    <>
   <div class="container  mt-10">
        <h1 class="mt-5">User Admin</h1>
        
    </div>
    <div className="container main-container">
    
    <h1>Register Users</h1>

    <table className="table table-bordered product-table" border="1" width="100%">
        <tr>
                <td colspan="7" class="text-right">
                    <button class="btn btn-primary" onClick={redirectToadduser}>
                        Add User
                    </button>
                </td>
            </tr>
        <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            
        </tr>
        {arr1.map((val)=>(
        <tr key={val[0]}>
          <td>{val[0]}</td>
          <td>{val[3]}</td>
          <td>{val[4]}</td>
          <td>{val[5]}</td>
          
          
          
          
        </tr>
      ))}
    </table>
    
    </div>
  
    <div class="container  mt-10">
        <h1 class="mt-5"></h1>
        
    </div>
    <div className="container main-container">
    
    <h1>Register Product</h1>

    <table className="table table-bordered product-table" border="1" width="100%">
        <tr>
                <td colspan="7" class="text-right">
                    <button class="btn btn-primary" onClick={redirectToaddProduct}>
                        Add Product
                    </button>
                </td>
            </tr>
        <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        {arr.map((val)=>(
        <tr key={val[0]}>
          <td>{val[0]}</td>
          <td>{val[1]}</td>
          <td>{val[2]}</td>
          <td>{val[3]}</td>
          <td>{val[5]}</td>
          <td>
            
            <button class='btn btn-success' onClick={() => updateProduct(val[0],val[1],val[2],val[3],val[4],val[5])}>Edit
          
          </button></td>
          <td><button class='btn btn-danger' onClick={() => deleteProduct(val[0])}>Delete</button></td>
          
        </tr>
      ))}
    </table>
    
    </div>
  
    
    </>

  )
}

export default Main;
