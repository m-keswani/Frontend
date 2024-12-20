import React, { useEffect, useState } from 'react'
import "./paymentdetail.css";

const PaymentDetail = () => {
    const [paymentDetail,setPaymentDetail] = useState([])
    useEffect(() => {
        getPaymentDetails()

    }, []);

    const getPaymentDetails = async()=>{

        const response = await fetch('http://localhost:8000/get-payment-detail',{method:"GET"})
        if(response.ok){
            const responseData = await response.json()
            setPaymentDetail(responseData)
            console.log(responseData)
        }
    }




    return (
        <div className="table-container">
            <table>
                <thead>

                    <tr>
                        <th>Sr no.</th>

                        <th>Payment Id</th>
                        <th>Payer Id</th>
                        <th>Order Id</th>
                        <th>Email</th>
                        <th>Payment Date</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentDetail.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.paymentId}</td>
                            <td>{item.payerId}</td>
                            <td>{item.orderId}</td>
                            <td>{item.email}</td>
                            <td>
                                {new Date(item.paymentDate).toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </td>
                            
                            <td>{item.paymentAmount}</td>
                            <td>{item.paymentMethod}</td>
                            <td>{item.currency}</td>
                        </tr>
                            ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentDetail
