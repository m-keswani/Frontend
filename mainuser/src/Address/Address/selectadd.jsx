import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import "./selectadd.css";
import { useNavigate } from 'react-router-dom';

function AddressSelectionPage() {
  const [addresses, setAddresses] = useState([
    '123 Main St, City 1, State 1',
    '456 Elm St, City 2, State 2',
    '789 Oak St, City 3, State 3',
  ]);

  const [authUser,setAuthUser] = useState(false)
  const [email,setEmail] = useState()
  const [userAddress,setUserAddress] = useState([])
  const navigate = useNavigate()
  const [openEditAddress,setOpenEditAddress] = useState(false)

  const [selectedAddress, setSelectedAddress] = useState('123 Main St, City 1, State 1');
  const [currentAddress,setCurrentAddress] = useState()

  const handleAddressSelection = async(address) => {
    
    const address_id = await address.id
    setCurrentAddress(address_id)

    setSelectedAddress(address);
    setOpenEditAddress(true)
  }

  const handleDeliverClick = () => {
    navigate(`/order?addressId=${currentAddress}`)
    
  }

  const handleEditClick = () => {
    //alert(currentAddress);
    navigate(`/editaddress?addressId=${currentAddress}`)
  }

  const handleAddNewAddress = () => {
    navigate('/addaddress')
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const data = new FormData();
    data.append('token', localStorage.getItem('authToken'));
    const response = await fetch('https://mohitto25.pythonanywhere.com/api/verifyuser', { method: "POST", body: data });
    const responseData = await response.json();
    if (responseData.authuser === 'false') {
      setAuthUser(false);
    } else {
      const email = await responseData.userEmail;
      setEmail(email);
      setAuthUser(true);
    }
  }
  useEffect(() => {
    fetchUserAddress()
  }, [email]);

  const fetchUserAddress =async()=>{
    const data = new FormData()
    data.append('email',email)
    const response = await fetch('https://mohitto25.pythonanywhere.com/api/useraddresses',{method:"POST",body:data})
    if(response.ok){
      const responseData = await response.json()
      setUserAddress(responseData)
    }
    else{
      console(response)
      alert('error while fetching data !')
    }
  }



  return (
    
    <div className="container justify-content-center">
      {authUser?(
      <form>
        <ListGroup>
          { userAddress && userAddress.length>0 ?  userAddress.map((address, index) => (
            <ListGroup.Item

              className='selected-address'
              key={index}
              onClick={() => handleAddressSelection(address)}
              active={selectedAddress === address}
            >
              {address.address+' '+address.city+','+address.state}
            </ListGroup.Item>
          )):null}
        </ListGroup>
        {selectedAddress && openEditAddress && (
          <div className='text-center pt-3'>
            <button className="btn btn-dark mr-2" onClick={handleDeliverClick}>Delivery to this Address</button>
            <button className="btn btn-outline-dark" onClick={handleEditClick}>Edit Address</button>
          </div>
        )}
        <div className='p-3'>
          <button className="btn btn-lg btn-block btn-outline-dark" onClick={handleAddNewAddress}>Add New Address</button>
        </div>
      </form>):null}
    </div>
  );
}

export default AddressSelectionPage;
