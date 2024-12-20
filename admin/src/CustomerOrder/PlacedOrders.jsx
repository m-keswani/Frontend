import React, { useState } from 'react'
import { useEffect } from 'react';
import "./placedorder.css";

const PlacedOrders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    getOrders()
  }, []);

  const getOrders = async () => {
    const response = await fetch('http://localhost:8000/orders', { method: "GET" })
    if (response.ok) {
      const responseData = await response.json()
      console.log('orders are :', responseData)
      setOrders(responseData)
    }
    else {
      alert('unable to fetch orders ')
    }
  }

  

  function GetAddress({ addressId }) {
    const [address,setAddress] = useState([]);

    useEffect(() => {
      const getAddress = async () => {
        const data = new FormData();
        data.append('address_id', addressId);
        const response = await fetch('http://localhost:8000/api/getaddress', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          const data = await response.json();

          setAddress(data)
        } else {
          alert('error while getting address data ')          
        }
      };

      getAddress();
    }, [addressId]);

    return (
      <span>{address.map((item)=>(
        <div>
          {item.address},{item.city},{item.state}
        </div>
      ))}</span>
    );
  }


  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              Total Order :-
            </th>
            <td className="bold-text">
              {orders.length}
            </td>

          </tr>
          <tr>
            <th>Sr No.</th>
            <th>Order Id</th>
            <th>User Email</th>
            <th>Order Date</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>
                {new Date(item.orderDate).toLocaleString('en-IN', {
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
              <td>
                <GetAddress addressId={item.address_id} />
              </td>
              <td>{item.totalPrice}</td>
              <td>{item.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default PlacedOrders
