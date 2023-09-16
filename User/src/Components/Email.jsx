import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', message);
    
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
      
    try {
        await fetch('http://localhost:8000/api/mail/', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrfToken'),
        },
        body: formData,
    });;
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default EmailForm;
