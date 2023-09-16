import React, { forwardRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import getToken from './getToken';

const Main = () => {
  const [data, setData] = useState([]);
  const formData=new FormData()  
  console.log("***IsLogged",localStorage.getItem("isLog"))
  
  
  
  useEffect(() => {
    const response = fetch('http://localhost:8000/api/product/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
      
      

  }, []);
  
  console.log("Token ::", getToken('csrftoken'))
  console.log("Data :: ", data)
  const arr = []
  for (let i = 0; i < data.length; i++) {
    arr[i] = Object.values(data.length > 0 ? data[i] : null);
  }
  console.log(arr)
  //console.log("bool :: ",location.state.bol)
  const addToCart = async(pid)=>
  {
    
    formData.append('email',localStorage.getItem("useremail").toLowerCase())
    formData.append('product_id',pid)
    formData.append('qty',1)
    console.log("Email :: ",localStorage.getItem("useremail").toLowerCase())
    console.log("PID :: ",pid)
    console.log("Data :: ",formData)
    //alert("addtoCart")
    try{
      const response = await fetch('http://localhost:8000/api/addCart/', {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          'X-CSRFToken': getToken('csrfToken'),
      },
      body: formData,
        
    });
    console.log("Response ::",response)
  }
  catch(error)
  {
    alert("error :: ",error)
  }
  }
  const buyNow =()=>
  {

  }
  
  return (
    <div className="container main-container">
    {arr.map((val) => (
        <div key={val[0]} className="card mb-3">
            <img src={"http://127.0.0.1:8000/" + val[4]} alt="Fetched Image" className="card-img-top" style={{ maxWidth: '200px', height: '200px', objectFit: 'cover' }} />

            <div className="card-body">
                <h5 className="card-title">Name :: {val[1]}</h5>
                <p className="card-text">Description :: {val[2]}</p>
                <p className="card-text">Available Quantity :: {val[3]}</p>
                <p className="card-text">Price :: {val[5]}</p>
                <button className="btn btn-primary" onClick={() => addToCart(val[0])}>Add to Cart</button>
                
            </div>
        </div>
    ))}
</div>

  )
}

export default Main
/*<button className="btn btn-success" onClick={buyNow}>Buy Now</button>
 */