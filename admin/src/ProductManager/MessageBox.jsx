import React, { useState, useEffect } from 'react';
import Product from './Product.css'


function MessageBox(props) {
  const [isVisible, setIsVisible] = useState('');

  useEffect(() => {
    if(props.visibility === 'true')
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
    <span className="success-icon">✅</span> {props.message}
    </div>
  ) : null;
}

export default MessageBox;
