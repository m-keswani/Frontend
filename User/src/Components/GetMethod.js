import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const response = fetch('http://localhost:8000/api/data/',{headers:{'X-CSRFToken':getToken('csrftoken')}},Credential="include")  // Replace with your Django API endpoint
   // console.log("Response :: ",response)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    
  }, []);
  //CSRF TOKEN
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
  console.log("Token ::",getToken('csrftoken'))
  console.log("Data :: ",data)
 
  return (
    <div>
      <h1>Your Data from Django</h1>
      
    </div>
  );
}

export default App;
