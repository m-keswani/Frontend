import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataItem from './DataItem';
import img from './img.png';

function ProductDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const response = fetch('http://localhost:8000/api/listedproduct/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
      // console.log("Response :: ",response)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));

  }, []); 
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
  console.log("Token ::", getToken('csrftoken'))
  console.log("Data :: ", data)
  const arr=[]
  for(let i=0;i<data.length;i++)
  {
    arr[i]=Object.values(data.length > 0 ? data[i] : null);
  }
  
  

  return (
    <><div>
      <h1>Your Data from Django</h1>

      {arr.map((val)=>(
        <div>
          <p>{val[0]}</p>
          <p>{val[1]}</p>
          <p>{val[2]}</p>
          <p>{val[3]}</p>
          <img src={"http://127.0.0.1:8000/"+val[3]} alt="Fetched Image" />
          
        </div>
      ))}

      </div>
    </>
  );
}

export default ProductDisplay;
