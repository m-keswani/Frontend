import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getToken from './getToken'
const Cart = () => {
    const navigate =useNavigate()
    const [data,setData] =useState('')
    const [pdata,setPdata]=useState('')
    const arr = []
    useEffect(() => {
      const response = fetch('http://localhost:8000/api/addCart/'+localStorage.getItem('useremail'), { headers: { 'X-CSRFToken': getToken('csrftoken') } })  // Replace with your Django API endpoint

      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
      
      
      if(localStorage.getItem("isLog")==="true")
        {
            //document.write("You are :: ",localStorage.getItem("useremail"))
        }
        else
        {
            alert("you are not logged In")
            navigate("/Signin")
        }
      }, []);
      console.log("Data ::",data)
      
      for (let i = 0; i < data.length; i++) {
        arr[i] = Object.values(data.length > 0 ? data[i] : null);
        }

      console.log("Array : :", arr)
      
      useLayoutEffect(()=>{
      arr.map((val)=>{
        console.log("*** Product Data ***",val[3])
          
      const response = fetch('http://localhost:8000/api/addProduct/'+val[3], { headers: { 'X-CSRFToken': getToken('csrftoken') } })  // Replace with your Django API endpoint

      .then(response => response.json())
      .then(pdata => setPdata(pdata))
      .catch(error => console.error('Error fetching data:', error));
        
        console.log("Product respose ::",response)
      })
    }, []);
    async function productData(e)
    {
      arr.map((val)=>{
        console.log("***Product Data***",val[3])
          
      const response = fetch('http://localhost:8000/api/addProduct/'+e, { headers: { 'X-CSRFToken': getToken('csrftoken') } })  // Replace with your Django API endpoint

      .then(response => response.json())
      .then(pdata => setPdata(pdata))
      .catch(error => console.error('Error fetching data:', error));
        
      console.log("Product respose ::",response)
      
    })
    }
    
    
    const gotoBuy = () =>{
      navigate('/address')
    }
    return (
      <>
      <div class='container'>
      {localStorage.getItem("isLog")==="true" ? (
        <p>You are: {localStorage.getItem("useremail")}</p>
      ) : (
        <p>In User Cart (You are not logged in)</p>
      )}
      {arr.map((val)=>(
        
        <><div>{val[2]} </div><div>{val[3]}</div></>
      ))}
    </div>
    <div class='container'>
      <button onClick={gotoBuy}>Proceed to Buy </button>
    </div>
    </>
  )
}

export default Cart
