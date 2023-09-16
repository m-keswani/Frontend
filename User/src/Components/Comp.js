import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie'

function Comp() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [cookies, setCookies] = useCookies('');
  const [csrfToken, setCsrfToken] = useCookies('');
  
  const handle = () => {
    setCookies('fname', fname, { path: '/' });

    setCookies('Lname', lname, { path: '/' });

  
  }


  async function handleSubmit(e) {
      e.preventDefault();

      //console.log("New CSRFTOKEN :: ", csrfToken)
      console.log("New Cookie :: ", cookies);



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
      setCsrfToken(getToken('csrftoken'))
      console.log("Newly token are :: ", csrfToken );
      console.log("Cookies Token :: ", Cookies.get('csrftoken'));
      
      const headers = {
        'X-CSRFToken': "5FF1xJagJh40Oan5Wa9ymfizyn2326E9",
        'Content-Type': 'application/json', // Add the content type header
      };

      // Prepare data
      const data = {
        //Credential: 'include',
        data: { "field1":fname, "field2":lname },
      };
      try {
        console.log("headers ::", ' ');
        const response = await fetch('http://localhost:8000/api/data/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ "field1":fname, "field2":lname }),
      });
        console.log("Response ::", response);
        alert('Data Sent');

      }
      catch (error) {
        console.error("Error :: ",error);
      }
    }
  return (

    <div>
      <form onSubmit={handleSubmit} onClick={handle} method='POST'>
      
        <label>First Name </label>
        <input type="text" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
        <label>Last Name </label>
        <input type="text" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Comp;