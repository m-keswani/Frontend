import React, { useState, useEffect } from 'react';
import Product from './Product.css'


function MessageBox(props) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setIsVisible(props.visibility)
    if (!isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 10 seconds

      return () => {
        clearTimeout(timer);
      };
    }
    else{
    }
  }, [isVisible]);

  return isVisible ? (
    <div className="message-box">
    <span className="success-icon">✅</span> {props.message}
  </div>
  ) : null;
}

export default MessageBox;
