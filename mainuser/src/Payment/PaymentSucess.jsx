// PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import './paymentsuccess.css';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";




const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([])
    const [authUser, setAuthUser] = useState(false)
    //const [email, setEmail] = useState()
    const urlParams = new URLSearchParams(window.location.search);

    const grandTotal = urlParams.get('grandTotal');
    const addressId = urlParams.get('addressId');
    const email = urlParams.get('email');
    const payMode = urlParams.get('payMode');
    const paymentId = urlParams.get('paymentId')
    const payerId = urlParams.get('PayerID')
    


    useEffect(() => {
      const hasDataBeenFetched = localStorage.getItem('hasDataBeenFetched');

      if (hasDataBeenFetched==='false') {
          getCartData();
          localStorage.setItem('hasDataBeenFetched', 'true');
      }

      console.log('useEffect run..');
  }, []);
    const goToHome = () => {
        // Navigate to the home page
        navigate('/');
    };

    /*const checkAuth = async () => {
        const data = new FormData();
        data.append('token', localStorage.getItem('authToken'));
        const response = await fetch('http://localhost:8000/api/verifyuser', { method: "POST", body: data });
        const responseData = await response.json();
        if (responseData.authuser === 'false') {
          setAuthUser(false);
        } else {
          const email = await responseData.userEmail;
          setEmail(email);
          console.log("++++--",email)
          
          setAuthUser(true);
        }
      }*/
    
      const getCartData = async () => {
        const data = new FormData()
        data.append('email', email)

        const response = await fetch('http://localhost:8000/api/cartitem', { method: "POST", body: data })
        if (response.ok) {
          const responseData = await response.json()
          console.log('cart data :', responseData)
    
          placeOrder(responseData)
        
        }
        else {
          alert('error while fetching product')
        }
      }

      const placeOrder = async (cartData) => {
        const data = new FormData()
        data.append('email', email)
        data.append('address_id', addressId)
        data.append('totalPrice', grandTotal)
        data.append('paymentMethod',payMode)
        
        const response = await fetch('http://localhost:8000/api/order', { method: "POST", body: data })
        if (response.ok) {
          const responseData = await response.json()
          const orderId = await responseData.id;
          console.log('Order Data :', orderId)
    
    
          cartData.map(async (item) => {
            const orderItem = new FormData()
            orderItem.append('orderId', orderId)
            orderItem.append('variantId', item.variant_id)
            orderItem.append('qty', item.qty)
            const response = await fetch('http://localhost:8000/api/orderitem', { method: "POST", body: orderItem })
            if (response.ok) {
              //alert('order placed Successfully continue Shopping...')
    
              // To clear user cart
              const currentUserEmail = new FormData()
              currentUserEmail.append('email', email)
              const response = await fetch('http://localhost:8000/api/clearcart', { method: "POST", body: currentUserEmail })
              if (response.ok) {
                if (payMode !== "COD") {
                  const data = new FormData()

                  data.append('paymentId', paymentId)
                  data.append('payerId', payerId)
                  data.append('orderId', orderId)
                  data.append('email', email)
                  data.append('paymentAmount', grandTotal)


                  const payment_response = await fetch('http://localhost:8000/payment-detail', { method: "POST", body: data })
                  if (payment_response.ok) {
                    navigate(`/order-placed?payMode=${payMode}`)
                  }
                  else {
                    alert('failed to add payment details')
                    navigate('/')
                  }
                }
                navigate(`/order-placed?payMode=${payMode}`)



                //navigate('/')
              }
    
            }
            else {
                alert('Failed to Placeholder 1')
                navigate('/cart')

            }
          })
    
        }
        else {
          alert('Failed to Placeholder 2')
          navigate('/cart')

        }
    
      }

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
};

export default PaymentSuccess;
