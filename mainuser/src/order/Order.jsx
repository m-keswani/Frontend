import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


function Order() {
  const [authUser, setAuthUser] = useState(false)
  const [email, setEmail] = useState()
  const [cartData, setCartData] = useState([])
  const urlParams = new URLSearchParams(window.location.search);
  const addressId = urlParams.get('addressId');
  const [address, setAddress] = useState()
  const [variantData, setVariantData] = useState([])
  const [productData, setProductData] = useState([])
  const navigate = useNavigate()
  let grandTotal = 0
  //const [grandTotal,setGrandTotal]  = useState(0)
  useEffect(() => {
    checkAuth();
    getAddress();
    //getProduct()
  }, []);

  const getAddress = async () => {
    const data = new FormData()
    data.append('address_id', addressId)
    const response = await fetch('http://localhost:8000/api/getaddress', { method: "POST", body: data })
    if (response.ok) {
      const responseData = await response.json()
      //console.log(' current adddress :',responseData)
      setAddress(responseData)
    }
    else {
      alert('select address properly')
      navigate('/addresselection')
    }
  }


  const checkAuth = async () => {
    const data = new FormData();
    data.append('token', localStorage.getItem('authToken'));
    const response = await fetch('http://localhost:8000/api/verifyuser', { method: "POST", body: data });
    const responseData = await response.json();
    if (responseData.authuser === 'false') {
      setAuthUser(false);
    } else {
      const email = await responseData.userEmail;
      setEmail(email);
      setAuthUser(true);
    }
  }

  const getCartData = async () => {
    const data = new FormData()
    data.append('email', email)
    //alert()
    //fetching cart
    const response = await fetch('http://localhost:8000/api/cartitem', { method: "POST", body: data })
    if (response.ok) {
      const responseData = await response.json()
      console.log('cart data :', responseData)

      setCartData(responseData)
    }
    else {
      alert('error while fetching product')
    }
  }


  /**responseData.map(async (val) => {
          const variantId = await val.variant_id;
          const data = new FormData()
          data.append('variant_id', variantId)
          
          // fetching variants
          const variantresponse = await fetch('http://localhost:8000/api/variantdata', { method: "POST", body: data })
          if (variantresponse.ok) {
            const variantData = await variantresponse.json()
            const productId = await variantData[0].productId
            const data = new FormData()
            data.append('product_id', productId)
            // fetching product data
            const productresponse = await fetch('http://localhost:8000/api/productdata', { method: "POST", body: data })
            if (productresponse.ok) {
              const productData = await productresponse.json()
              const pName = await productData[0].name
              console.log('product name :',pName)
              
              return (
                <div>
                  {pName}
                </div>
              )
              //const productId = await variantData[0].productId
  
            }
            else {
              alert('error while fetching products')
            }
          }
          else {
            alert('error while fetching variants')
          }
        }) */

  useEffect(() => {
    getCartData();
  }, [email]);


  useEffect(() => {
    getVariantData();
  }, [cartData]);

  useEffect(() => {
    getProductData();

  }, [variantData]);



  const getVariantData = async () => {
    const allVariantData = [];

    await Promise.all(
      cartData.map(async (val) => {
        const variantId = val.variant_id;
        const data = new FormData();
        data.append('variant_id', variantId);
        const variantresponse = await fetch('http://localhost:8000/api/variantdata', {
          method: 'POST',
          body: data,
        });

        if (variantresponse.ok) {
          const variantData = await variantresponse.json();
          allVariantData.push(variantData[0]);
        }
      })
    );

    setVariantData(allVariantData);
  };

  const getProductData = async () => {
    const allProductData = [];

    await Promise.all(
      variantData.map(async (val) => {
        const productId = val.productId;
        const data = new FormData();
        data.append('product_id', productId);

        const productresponse = await fetch('http://localhost:8000/api/productdata', {
          method: 'POST',
          body: data,
        });

        if (productresponse.ok) {
          const productData = await productresponse.json();
          allProductData.push(productData[0]);
        }
      })
    );

    setProductData(allProductData);
  };
  //TO get color name
  function GetColor({ colorId }) {
    const [colorName, setColorName] = useState('');

    useEffect(() => {
      const getColorName = async () => {
        const data = new FormData();
        data.append('color_id', colorId);

        const response = await fetch('http://localhost:8000/api/color', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          const data = await response.json();
          const name = await data.colorName;

          setColorName(name);
        } else {
          setColorName('Error fetching name');
        }
      };

      getColorName();
    }, [colorId]);

    return (
      <span>{colorName}</span>
    );
  }
  //TO get size 
  function GetSize({ sizeId }) {
    const [sizeName, setSizeName] = useState('');

    useEffect(() => {
      const getSize = async () => {
        const data = new FormData();
        data.append('size_id', sizeId);
        console.log('size', sizeId)
        const response = await fetch('http://localhost:8000/api/size', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          const data = await response.json();
          const name = await data.size;

          setSizeName(name);
        } else {
          setSizeName('Error fetching name');
        }
      };

      getSize();
    }, [sizeId]);

    return (
      <span>{sizeName}</span>
    );
  }

  const placeOrder = async () => {
    const data = new FormData()
    data.append('email', email)
    data.append('address_id', addressId)
    data.append('totalPrice', grandTotal)

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
            navigate('/')
          }


        }
        else {
          alert('Failed to Placeholder')
        }
      })

    }
    else {
      alert('Failed to Placeholder')
    }

  }

  //encrypt data 

  const secretKey = '12345678';

  function encryptData(data) {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encrypted;
  }
  const encryptedEmail = encryptData(email);
  //const encryptedGrandTotal = encryptData(grandTotal.toString());
  const encryptedAddressId = encryptData(addressId);


  const proceedWithPayment = async () => {
    navigate(`/payment?email=${encodeURIComponent(encryptedEmail)}&grandTotal=${grandTotal}&addressId=${encodeURIComponent(encryptedAddressId)}`);

  }

  return (
    <div className="App">
      {authUser ? (
        <div className="container-lg justify-content-center">

          <div className="row">
            <br />
            <div className="col-lg-6">


            </div>
            <div class="card">

              <div class="card-body">
                <h5 class="card-title">Order Now</h5>

              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className=" mb-4">
                    <div className="card-header bg-dark text-white">
                      Products

                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {variantData && variantData.length > 0
                              ? variantData.map((val) => {
                                const matchingProduct = productData.find((item) => val.productId === item.id);
                                const matchingCartProduct = cartData.find((item) => val.id === item.variant_id);

                                if (matchingProduct) {
                                  const totalProductPrice = val.price * matchingCartProduct.qty;

                                  // Add the total product price to the grand total
                                  grandTotal += totalProductPrice;

                                  return (
                                    <tr key={val.id}>
                                      <td>{matchingProduct.name}</td>
                                      <td><GetColor colorId={val.colorId} /></td>
                                      <td><GetSize sizeId={val.sizeId} /></td>
                                      <td>${val.price}</td>
                                      <td>{matchingCartProduct.qty}</td>
                                      <td>${totalProductPrice}</td>
                                    </tr>
                                  );
                                }
                                return null;
                              })
                              : null
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="card-body">
                      <h4>Grand Total: ${grandTotal}</h4>
                    </div>

                  </div></li>

                <li class="list-group-item">
                  <div className=" mb-4">
                    <div className="card-header bg-dark text-white">
                      Payment Details
                    </div>
                    <div className="card-body">
                      {/* Payment details go here */}
                      <p> Order total: ${grandTotal}</p>

                      <p>Pay with: Pay on delivery</p>
                    </div>
                  </div></li>
                <li class="list-group-item">
                  <div className="mb-4">
                    <div className="card-header bg-dark text-white">
                      Delivery Details
                    </div>
                    <div className="card-body">
                      {address && address.length > 0 && address.map((val) => (
                        <>
                          <p>Deliver to: {val.fullName}</p>
                          <p>Address: {val.address}</p>
                          <p>Contact Number : {val.phoneNum}</p>
                          <p>Area : {val.area}</p>
                          <p>Landmark : {val.landmark}</p>
                          <p>Pincode : {val.pincode}</p>
                          <p>City : {val.city}</p>
                          <p>State : {val.state}</p>
                        </>
                      ))}
                      {/* Delivery details go here */}

                      {/* Add more delivery details as needed */}
                    </div>
                  </div></li>
              </ul>
              <div class="card-body">
                <button className='btn btn-dark rounded-pill p3' onClick={proceedWithPayment}>Proceed to Payment </button>
              </div>
            </div>


          </div>
        </div>) : null}
    </div>
  );

}

export default Order;
