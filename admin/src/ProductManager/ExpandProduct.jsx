import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from "./Product.css";
import MessageBox from './MessageBox';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { RxUpdate } from 'react-icons/rx';

const ExpandProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('value');
  const [variantData, setVariantData] = useState([]);
  const [variantImages, setVariantImages] = useState([]);
  const [variantColor, setVariantColor] = useState([]);
  const [variantSize, setVariantSize] = useState([]);
  const [isEditableQty,setIsEditableQty] = useState(false)
  const [isEditablePrice,setIsEditablePrice] = useState(false)
  const [newQty,setNewQty] = useState('')
  const [newPrice,setNewPrice] = useState('')
  const navigate = useNavigate()
  const [editingVariantIndex, setEditingVariantIndex] = useState(-1);
  const [showMessage,setShowMessage] = useState('')
  const [showDeleteMessage,setShowDeleteMessage] = useState('')
  const data = new FormData()

  useEffect(() => {
    fetchProductVariant();
  }, []);

  const fetchProductVariant = async () => {
    console.log("product id", value);

    try {
      const response = await fetch('http://localhost:8000/adminsite/getproductvariant/' + value.toString());
      const responseData = await response.json();
      setVariantData(responseData);
      console.log("Response", responseData);

      // Fetch images for each variant
      const imagePromises = responseData.map((val) => showImages(val.id));
      const images = await Promise.all(imagePromises);
      setVariantImages(images);

      // Fetch sizes and colors for each variant
      const sizePromises = responseData.map((val) => fetchSize(val.sizeId));
      const sizes = await Promise.all(sizePromises);
      setVariantSize(sizes);

      const colorPromises = responseData.map((val) => fetchColor(val.colorId));
      const colors = await Promise.all(colorPromises);
      setVariantColor(colors);
    } catch (error) {
      console.log("Error in fetching");
    }
  }

  const showImages = async (vid) => {
    console.log(vid);
    try {
      const response = await fetch('http://localhost:8000/adimsite/productImages/' + vid.toString());
      const responseData = await response.json();
      console.log("Response Data Images :: ", responseData);
      return responseData;
    } catch (error) {
      console.log("Error in fetching data");
    }
  }

  const fetchSize = async (sid) => {
    try {
      const response = await fetch('http://localhost:8000/adminsite/getsize/' + sid.toString());
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("Error in fetching size");
    }
  }

  const fetchColor = async (cid) => {
    try {
      const response = await fetch('http://localhost:8000/adminsite/getcolor/' + cid.toString());
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("Error in fetching Color");
    }
  }

  const update =async(index)=>{
    
    setIsEditableQty(true)
    setIsEditablePrice(true)
    setEditingVariantIndex(index)
  }

  const remove =async(vid)=>{

    try{
      const response  = await fetch('http://localhost:8000/adminsite/productvariantmaster/' + vid.toString(),{method:'DELETE'})
      if(response.ok){
      fetchProductVariant()

        setShowDeleteMessage(true)
        setTimeout(() => {
          setShowDeleteMessage(false);
      }, 3000);
      }
    }
    catch(error)
    {
      console.log("Not Found")
    }
  }

  const addNewVariant =()=>{
    navigate(`/addnewvariant?value=${value}`);
  }

  const updateData =async(vid)=>{


    data.append('id',vid)
    data.append('newQty',newQty)
    data.append('newprice',newPrice)

    console.log('newprice',newPrice)
    console.log('newQty',newQty)

    try{
      const response = await fetch('http://localhost:8000/adminsite/productvariantmaster' ,{method:"PUT",body:data})      
      if(response.ok)
      {
        fetchProductVariant()
        setIsEditablePrice(false)
        setIsEditableQty(false)
        setEditingVariantIndex(-1)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false);
      }, 3000);
      }

    }
    catch(error)
    {
      console.log("Failed to update product variant")
    }
    
  }

    const [selectedImage, setSelectedImage] = useState(null);
  
    const openImage = (imageUrl) => {
      setSelectedImage(imageUrl);
      document.body.style.overflow = 'hidden'; // Disable scrolling when the image is open
    };
  
    const closeImage = () => {
      setSelectedImage(null);
      document.body.style.overflow = 'auto'; // Enable scrolling when the image is closed
    };
    
  return (
    <div>

      {showMessage && <MessageBox message="Updated Successfully" visibility='true' />}
      {showDeleteMessage && <MessageBox message="Deleted Successfully" visibility='true' />}

      <div className='container mb-5 mt-3'>
        <button className='button' onClick={() => addNewVariant() }>
          Add New Variant
        </button>
      </div>
      {variantData.map((val, key) => (
        <>
        <div key={key} className='container '>
             
          <div>
          <button className='float-right button' onClick={() => remove(val.id) }><AiFillDelete/> Delete</button>
          </div>
          <div>
          {editingVariantIndex === key ? '' : (<button className='float-right button' onClick={() => update(key,val.id) }><FiEdit2/> Edit</button>)}
          
          </div>
          <p>Variant Id: {val.id}</p>
          <p>Product Id: {val.productId}</p>
          <p>Size: {variantSize[key]?.[0]?.size}</p>
          <p>Color: {variantColor[key]?.[0]?.colorName}</p>
          Quantity: <input type="number" name='qty' min={1} value={key === editingVariantIndex ? newQty : val.qty} onChange={(e) => { setNewQty(e.target.value) }} readOnly={key !== editingVariantIndex}/><br />
          Price: <input
            type="number"
            name='price'
            value={key === editingVariantIndex ? newPrice : val.price}
            onChange={(e) => {
              if (key === editingVariantIndex) {
                setNewPrice(e.target.value.replace(/[^0-9.]/g, ''));
              }
            }}
            readOnly={key !== editingVariantIndex}
          />
          <br />
          <br />
          
          <div>
            {variantImages[key] && (
              <div>
                {variantImages[key].map((image, imageKey) => (
                  <img className=" rounded border" 
                    style={{ width: '200px', height: '200px' }}
                    key={imageKey}
                    src={image.imageUrl}
                    alt={`Image ${imageKey}`}
                  />
                ))}
              </div>
            )}
          </div>
          {editingVariantIndex === key ? <button className='button' onClick={() => updateData(val.id,val.productId,variantSize[key]?.[0]?.size,variantColor[key]?.[0]?.colorName) }><RxUpdate/> Update</button> : ''}
        </div>
        <br/>
        </>
      ))}
      
    </div>
  );
}

export default ExpandProduct;
