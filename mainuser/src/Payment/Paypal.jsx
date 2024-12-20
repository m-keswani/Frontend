// PaymentComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './paypal.css'; // Import the CSS file
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
const PaymentComponent = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedAddressId = urlParams.get('addressId');
    //const encryptedGrandTotal = urlParams.get('grandTotal');
    const encryptedEmail= urlParams.get('email');
    const grandTotal = urlParams.get('grandTotal');
    const navigate = useNavigate()

    let payMode = ''



    //decrypt data
    // Assuming this code is running in a React component or some other client-side code


    // Your decryption key (should match the key used for encryption on the server)
    const secretKey = '12345678';

    function decryptData(encryptedData) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } catch (error) {
            console.error('Error during decryption:', error);
            return null; // or handle the error in a way that makes sense for your application
        }
    }
    

    //Decrypt the data received from the server
    const decryptedEmail = decryptData(decodeURIComponent(encryptedEmail));
    //const decryptedGrandTotal = parseFloat(decryptData(decodeURIComponent(encryptedGrandTotal)));
    const decryptedAddressId = decryptData(decodeURIComponent(encryptedAddressId));

    const handlePayment = async () => {
        try {
            if (!selectedPaymentMethod) {
                alert('Please select a payment method');
                return;
            }

            let response;

            if (selectedPaymentMethod === 'paypal') {


                try {
                    const data = new FormData()

                    data.append('addressId',decryptedAddressId)
                    data.append('price',grandTotal)
                    data.append('email',decryptedEmail)

                    const response = await axios.post('http://localhost:8000/process-payment',data);
                    console.log(response)
                    alert('Redirecting to payment page...')
                    window.location.href = response.data.approval_url;
                } catch (error) {
                    console.error('Error initiating payment:', error);
                }
            } else if (selectedPaymentMethod === 'cod') {

                alert('Cash on Delivery selected. Order confirmed.');
                navigate(`/success?grandTotal=${grandTotal}&addressId=${decryptedAddressId}&email=${decryptedEmail}&payMode=${"COD"}`)

            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };
    

    //Now you can use decryptedEmail, decryptedGrandTotal, and decryptedAddressId in your application

    return (

        <div className="PaymentComponent">
            <h2>Select Payment Method</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        onChange={() => setSelectedPaymentMethod('paypal')}
                    />
                    Pay with PayPal
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        onChange={() => setSelectedPaymentMethod('cod')}
                    />
                    Cash on Delivery
                </label>
            </div>
            <button className='btn btn-dark rounded-pill p3' onClick={handlePayment} disabled={!selectedPaymentMethod}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default PaymentComponent;
