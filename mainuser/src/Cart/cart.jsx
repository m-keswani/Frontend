import React, { useEffect, useState } from 'react';
import './cart.css'; // Import your custom styles if necessary
import { BsArrowLeftShort, BsPlus, BsDash, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MainHead from '../Header/MainHead';

function ShoppingCart() {
  const [authUser, setAuthUser] = useState(false)
  const navigate = useNavigate()
  const [userCart, setUserCart] = useState()
  const variantDataArray = [];
  const [variantData, setVariantData] = useState([])
  const [productNames, setProductNames] = useState([])
  const [productDescr, setProductDescr] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [cartColor, setCartColor] = useState([]);
  const [cartSize, setCartSize] = useState([]);
  const [amountAfterShipCharge, setAmountAfterShipCharge] = useState(0)
  const [cartEmpty, setCartEmpty] = useState(false)
  const [email, setEmail] = useState()
  const [selectedQty, setSelectedQty] = useState({})
  const [qtyChangeItem,setQtyChangeItem] = useState()


  useEffect(() => {
    localStorage.setItem('hasDataBeenFetched', 'false');
    //alert(localStorage.getItem('hasDataBeenFetched'))
    checkAuth()

  }, []);


  const [items, setItems] = useState([
    { id: 1, name: 'Nike InfinityRN 4', description: 'Mens Workout ShoesPhantom/Khaki/Light Orewood Brown/Medium Ash', price: 120.00, quantity: 1, size: 'S' },
    { id: 2, name: 'Cotton T-shirt', description: 'Comfortable cotton t-shirt', price: 30.00, quantity: 1, size: 'M' },
    { id: 3, name: 'Cotton T-shirt', description: 'Comfortable cotton t-shirt', price: 30.00, quantity: 1, size: 'L' },
  ]);


  const checkAuth = async () => {
    const data = new FormData()

    data.append('token', localStorage.getItem('authToken'))
    const response = await fetch('https://mohitto25.pythonanywhere.com/api/verifyuser', { method: "POST", body: data })
    const responseData = await response.json()
    if (responseData.authuser === 'false') {

      navigate('/signin')
      setAuthUser(false)

    }
    else {
      setAuthUser(true)
      const email = new FormData()
      email.append('email', responseData.userEmail)
      const fetchData = await fetch('http://localhost:8000/api/cartitem', { method: "POST", body: email })
      if (fetchData.ok) {
        const data = await fetchData.json()
        setEmail(responseData.userEmail)

        setUserCart(data)

        console.log('Data :', userCart)
      }
      else {
        alert('error while getting data')
      }
    }
  }


  useEffect(() => {
    if (variantData && variantData.length > 0 && userCart && userCart.length > 0) {
      let total = 0;
      variantData.forEach((val) => {
        userCart.map((cart) => {
          if (cart.variant_id === val[0].id) {
            //alert()

            total += parseFloat(val[0]?.price) * cart.qty || 0;
            console.log('cart qty :', cart);

          }
        })
      });
      console.log('Total amount:', totalAmount);
      setTotalAmount(total);
      setAmountAfterShipCharge(total + 5)
    }
  }, [variantData]);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const updateSize = (id, newSize) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, size: newSize } : item));
    setItems(updatedItems);
  };


  const removeItem = async (id) => {
    const data = new FormData();
    data.append('variant_id', id);
    const delItem = await fetch('http://localhost:8000/api/removecartitem', { method: 'POST', body: data });
    if (delItem.ok) {

      setVariantData((prevItems) => prevItems.filter((item) => item[0].id !== id));
      checkAuth()
    } else {
      alert('Error while removing item!');
    }
  };

  const fetchData = async () => {
    if (userCart && userCart.length > 0) {
      const promises = userCart.map(async (val) => {
        const cartForm = new FormData();
        cartForm.append('variant_id', val.variant_id);
        const data = await fetch('http://localhost:8000/api/variantdata', {
          method: 'POST',
          body: cartForm,
        });

        if (data.ok) {
          return data.json();
        } else {
          // Handle error if needed
          return null;
        }
      });

      const variantDataResponses = await Promise.all(promises);
      const variantDataArray = variantDataResponses.filter((data) => data !== null);

      setVariantData(variantDataArray);
    }
  };



  useEffect(() => {
    fetchData()
    console.log('variant data :', variantData)

  }, [userCart]);


  //TO get product name and description
  useEffect(() => {

    const data = new FormData()
    if (variantData && variantData.length > 0) {
      variantData.map(async (val) => {
        data.append('product_id', val[0]?.productId)
        console.log('product Data :', val[0]?.productId)
        const product = await fetch('http://localhost:8000/api/productdata', { method: "POST", body: data })
        if (product.ok) {
          const productData = await product.json()
          const productName = await productData[0]?.name;
          const productDes = await productData[0]?.description;
          setProductNames((prevProductNames) => [...prevProductNames, productName]);
          setProductDescr((prevProductDescr) => [...prevProductDescr, productDes]);

        }
        else {
          //alert('Error while fetching product data ')
        }
      })
    }



  }, [variantData]);


  //TO get image
  useEffect(() => {

    if (variantData && variantData.length > 0) {
      variantData.map(async (val) => {
        const data = new FormData()

        data.append('variant_id', val[0]?.id)
        //console.log('product Data :', val[0]?.productId)

        const product = await fetch('http://localhost:8000/api/cartimage', { method: "POST", body: data })
        if (product.ok) {
          const productData = await product.json()
          const image_url = await productData.imageUrl;
          setImageUrl((prevUrl) => [...prevUrl, productData]);
          //console.log('image Url :', imageUrl)

        }
        else {
          //alert('Error while fetching product data ')
        }
      })
    }

    //console.log('variant Image :', imageUrl)
  }, [variantData]);

  // TO get size 


  useEffect(() => {
    if (variantData && variantData.length > 0) {

      // Use a forEach loop instead of map for side-effect operations
      variantData.forEach(async (val) => {
        const data = new FormData();
        data.append('size_id', val[0]?.sizeId);

        const response = await fetch('http://localhost:8000/api/size', { method: "POST", body: data });

        if (response.ok) {
          const sizeData = await response.json();
          //console.log('size Data :', sizeData)
          setCartSize((prevSize) => [...prevSize, sizeData]);

        } else {
          // Handle error if needed
        }
      });

    }
    //console.log('size Data :', cartSize)
  }, [variantData]);

  // To get Color
  useEffect(() => {
    if (userCart && userCart.length === 0) {
      setCartEmpty(true)
    }
  }, [userCart]);

  useEffect(() => {
    if (variantData && variantData.length > 0) {

      // Use a forEach loop instead of map for side-effect operations
      variantData.forEach(async (val) => {
        const data = new FormData();
        data.append('color_id', val[0]?.colorId);

        const response = await fetch('http://localhost:8000/api/color', { method: "POST", body: data });

        if (response.ok) {
          const colorData = await response.json();

          setCartColor((prevColor) => [...prevColor, colorData]);

        } else {
          // Handle error if needed
        }
      });

    }
    //console.log('Color Data :', cartColor)
  }, [variantData]);

  const checkOut = () => {
    navigate('/addresselection')
  }
  const handleBackToShop = () => {
    navigate('/')
  };

  const navigateToProduct = async (id) => {
    const data = new FormData()
    data.append('variant_id', id)
    const response = await fetch('http://localhost:8000/api/productid', { method: "POST", body: data })
    if (response.ok) {
      const responseData = await response.json()
      navigate(`/expandproductdetail?productName=${'productName'}&id=${responseData.product_id}`);
      console.log('productId = ', responseData.product_id)

    }

    //navigate(`/expandproductdetail?productName=${productName}&id=${id}`);
    //navigate('/')
  }

 // ...

const handleSelectChange = (e, itemId) => {
  const newQty = e.target.value;
  
  // Update the selectedQty state
  setSelectedQty((prevSelectedQty) => ({
    ...prevSelectedQty,
    [itemId]: newQty,
  }));

  // Update the quantity for the selected item in the userCart state
  const updatedUserCart = userCart.map((cartItem) =>
    cartItem.variant_id === itemId
      ? { ...cartItem, qty: newQty }
      : cartItem
  );
  setUserCart(updatedUserCart);
};

useEffect(() => {
  // Recalculate total amount when selectedQty or userCart changes
  if (variantData && variantData.length > 0 && userCart && userCart.length > 0) {
    let total = 0;
    variantData.forEach((val) => {
      userCart.forEach((cart) => {
        if (cart.variant_id === val[0].id) {
          total += parseFloat(val[0]?.price) * cart.qty || 0;
        }
      });
    });
    setTotalAmount(total);
    setAmountAfterShipCharge(total + 5);
  }
}, [variantData, userCart]);

  useEffect(() => {

    updateQty()


  }, [selectedQty]);

  const updateQty = async () => {
    // Iterate over the keys (item IDs) in selectedQty
    for (const itemId in selectedQty) {
      const data = new FormData();
      data.append('email', email);
      data.append('qty', selectedQty[itemId]); // Use the quantity for the specific item
      data.append('item_id', itemId);
  
      const response = await fetch('http://localhost:8000/api/changeqty', {
        method: 'POST',
        body: data,
      });
  
    }
  };
  
  return (
    <div className="container my-5">
      
      
      {authUser ?
        (<div className="row">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-4 text-black">Bag</h1>
            <hr className="my-3" />

            {variantData && variantData.length > 0 && userCart && userCart.length > 0 && productNames && productNames.length > 0 && imageUrl && imageUrl.length > 0 && productDescr && productDescr.length > 0 ? (

              <div >
                {variantData.map((item, index) => (
                  <>

                    <div className="row mb-4" key={index} >
                      <div className="col-4 col-lg-2">

                        {imageUrl && imageUrl.length > 0 ? (
                          <div>
                            {(() => {

                              for (let i = 0; i < imageUrl.length; i++) {
                                const val = imageUrl[i];
                                if (val.variantId === item[0]?.id) {
                                  return <div key={val.id}>
                                    <img

                                      onClick={() => navigateToProduct(item[0]?.id)}
                                      src={"http://localhost:8000" + val.imageUrl}
                                      className="img-fluid rounded-3"
                                      alt={item.name}

                                    />
                                  </div>;
                                }
                              }
                              return null; // If the condition is not met, return null
                            })()}


                          </div>
                        ) : null}

                      </div>
                      <div className="col-8 col-lg-4">
                        <h6 className="text-muted">{productNames[index]}</h6>
                        <p className="text-black mb-0">Description: <br />{productDescr[index]}</p>
                      </div>
                      <div className="col-8 col-lg-3 d-flex align-items-center">
                        <div className="quantity">

                          {cartSize && cartSize.length > 0 ? (
                            <div>
                              {(() => { //for size
                                for (let i = 0; i < cartSize.length; i++) {
                                  const val = cartSize[i];
                                  if (val.id === item[0]?.sizeId) {
                                    return <div key={val.id}>Size: {val.size.toUpperCase()}</div>;
                                  }
                                }
                                return null; // If the condition is not met, return null
                              })()}
                              <br />
                              {(() => { // for color
                                for (let i = 0; i < cartColor.length; i++) {
                                  const val = cartColor[i];
                                  if (val.id === item[0]?.colorId) {
                                    return <div key={val.id}>Color: {val.colorName}</div>;
                                  }
                                }
                                return null; // If the condition is not met, return null
                              })()}

                            </div>
                          ) : null}

                          <br />
                          
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedQty}
                            onChange={(e) => handleSelectChange(e, item[0]?.id)}
                          >
                            <option selected>Quantity</option>
                            {[...Array(Math.min(5, item[0]?.qty)).keys()].map((value, index) => (
                              <option key={index + 1} value={index + 1}>
                                Qty. {index + 1}
                              </option>
                            ))}
                          </select>
                          Qty.{userCart[index]?.qty}

                        </div>
                      </div>
                      <div className="col-4 col-lg-3">
                        <h6 className="mb-0">$ {item[0]?.price}</h6>
                      </div>
                      <div className="col-4 col-lg-1 text-end">
                        <button className="btn btn-link text-muted" onClick={() => removeItem(item[0]?.id)}>
                          <BsTrash />
                        </button>
                      </div>
                    </div >

                  </>

                ))}
              </div>

            ) : (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <p>No Cart data found.</p>
                  </div>
                </div>

              </>
            )}

            <div className="pt-3" >
              <h6 className="mb-0">
                <a className="text-body" onClick={handleBackToShop} >
                  <BsArrowLeftShort />
                  Back to shop
                </a>
              </h6>
            </div>
          </div>

          {!cartEmpty ?
            (
              <div className="col-lg-4 bg-grey">
                <h3 className="fw-bold mb-4 mt-3 pt-2">Summary</h3>
                <hr className="my-4" />
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="text-uppercase">Items {variantData.length}</h5>
                  <h5>$ {totalAmount}</h5>

                </div>
                <h5 className="text-uppercase mb-3">Shipping</h5>
                <div className="mb-3 pb-2">
                  <h6 className='text-muted'>Standard Delivery   +$5.00</h6>
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between">

                  <h5 className="text-uppercase">Total price</h5>
                  <h5>$ {amountAfterShipCharge.toFixed(2)}</h5>
                </div>

                <button
                  type="button"
                  className="btn btn-dark btn-block btn-lg mt-4"
                  data-mdb-ripple-color="dark"
                  onClick={checkOut}
                >
                  Checkout
                </button>

              </div>) : null
          }
        </div>) : null
      }
    </div >
  );
}

export default ShoppingCart;
