import React, { useState, useEffect } from 'react';
import Message from'./Message.css'


function MessageBox(props) {
  const [isVisible, setIsVisible] = useState('');

  useEffect(() => {
    if(props.visibility)
    {
      ShowMessage()
    }
  }, [isVisible]);

  const ShowMessage =()=>{
    setIsVisible(props.visibility)
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); 

      return () => {
        clearTimeout(timer);
      };
    }
    else{
    }
  }

  return isVisible ? (
    <div className="message-box">
        <div className="spinner"></div>{props.message}  </div>
  ) : null;
}

export default MessageBox;
