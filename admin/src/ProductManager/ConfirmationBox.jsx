import React, { useState, useEffect } from 'react';
import Confirmation from './Confirmation.css'


function ConfirmationBox(props) {
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
    <div className='overlay'>
        <div className="message-box">
        <span className="success-icon"></span> {props.message}
        <div>
        <button className='confirm m-2 button'  onClick={props.onConfirm}>Yes</button>
        <button className='confirm button' onClick={props.onCancel}>No</button>
        
        </div>
        </div>
    </div>
  ) : null;
}

export default ConfirmationBox;
