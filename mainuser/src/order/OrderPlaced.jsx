import React from 'react'


import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";




const OrderPlaced = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const payMode = urlParams.get('payMode');


    const goToHome = () => {
        // Navigate to the home page
        navigate('/');
    };

    return (
        <div className="success-page">
            <div className="success-container">
            <FaCircleCheck size={90}/>
                <h2>Order Placed Successful !</h2>
                <p>Your order has been confirmed. Thank you for your purchase!</p>
                <p>Payment mode : {payMode}</p>
                <div className="order-details clickable" onClick={goToHome}>
                    <h3 className="link-style"> Home</h3>
                </div>
            </div>
        </div>
    );
}

export default OrderPlaced
