import React, { useEffect, useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { IoBagCheckOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExpandProductDetail = () => {
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);

  const [fetchedVariant, setFetchedVariant] = useState([])
  const [fetchedImages, setFetchedImages] = useState([])
  const [fetchedColor, setFetchedColor] = useState([])
  const [fetchedSize, setFetchedSize] = useState([])
  const [currentVariant, setCurrentVariant] = useState([])
  const [colorId, setColorId] = useState('')
  const [sizeId, setSizeId] = useState('')
  const [selectedPrice, setSelectedPrice] = useState()
  const product_id = urlParams.get('id');
  const product_name = urlParams.get('productName');
  const [availableQty, setAvailableQty] = useState()
  const [newFetchedVariant,setNewFetchedVariant] = useState([])
  const [newImage,setNewImage] = useState([])
  const [selectedSizeId,setSelectedSizeId] = useState('')
  const [selectedVariant,setSelectedVariant] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageArray,setImageArray] = useState([])
  const [currentproductData,setCurrentProductData] = useState([])

  useEffect(() => {
    fetchVariants()
    fetchProductDetails()

  }, []);

  const fetchProductDetails =async()=>{
    const data = new FormData()
    data.append('product_id',product_id)
    const response = await fetch('https://mohitto25.pythonanywhere.com/api/productdata',{method:"POST",body:data})
    if(response.ok){
      const responseData = await response.json()
      setCurrentProductData(responseData)
    }

  }


  const fetchVariants = async () => {
    try {
      const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getproductvariant/' + product_id.toString())
      const responseData = await response.json()
      //console.log("Response Data in fetchvariants :", responseData)
      setSizeId(responseData[0]?.sizeId)
      setColorId(responseData[0]?.colorId)
      setFetchedVariant(responseData)

      await fetchColor(responseData)

      await fetchSize(responseData)
      await fetchImages(responseData)

      // unique color array
      const uniqueArrayOfObjects = responseData.reduce((uniqueArray, currentObject) => {
        // Check if the colorId of the current object is not already in the uniqueArray
        const isColorIdUnique = !uniqueArray.some((obj) => obj.colorId === currentObject.colorId);
      
        // If it's unique, add it to the uniqueArray
        if (isColorIdUnique) {
          uniqueArray.push(currentObject);
        }
      
        return uniqueArray;
      }, [fetchedVariant]);
      
      setNewFetchedVariant(uniqueArrayOfObjects)
      
      console.log('unique eArray: ',uniqueArrayOfObjects);

    }
    catch (error) {

    }
  }

  
  const fetchImages = async (variantData) => {
    const newArray = [];

    for (const val of variantData) {
      try {
        const response = await fetch(`https://mohitto25.pythonanywhere.com/adimsite/productImages/${val.id}`);
        const responseData = await response.json();

        newArray.push(responseData);
        setFetchedImages(newArray);
      } catch (error) {
        // Handle errors here if needed
        console.error(error);
      }
    }

    setFetchedImages(newArray);
    //console.log("Product variant img data", fetchedImages);
  };

  const fetchColor = async (variantData) => {
    try {
      const uniqueColors = {}; // Use an object to store unique color IDs and colors

      await Promise.all(
        variantData.map(async (val) => {
          try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getcolor/' + val.colorId);
            const responseData = await response.json();

            // Store the unique color ID and color in the object
            uniqueColors[responseData[0]?.id] = responseData[0]?.colorName;
          } catch (error) {
            console.error("Error:", error);
            // Handle the error as needed
          }
        })
      );

      // Convert the object to an array if needed
      const colorDataArray = Object.entries(uniqueColors).map(([id, color]) => ({ id, color }));

      // Set the fetchedColor state with the array of unique color data
      setFetchedColor(colorDataArray);
      //console.log("fetched colors :", colorDataArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fetchSize = async (variantData) => {
    try {
      const uniqueSizes = {}; // Use an object to store unique size IDs and sizes

      await Promise.all(
        variantData.map(async (val) => {
          try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getsize/' + val.sizeId);
            const responseData = await response.json();

            uniqueSizes[responseData[0]?.id] = responseData[0]?.size;
          } catch (error) {
            console.error("Error:", error);
          }
        })
      );

      // Convert the object to an array if needed
      const sizeDataArray = Object.entries(uniqueSizes).map(([id, size]) => ({ id, size }));

      // Set the fetchedSize state with the array of unique size data
      setFetchedSize(sizeDataArray);
      //console.log("fetched sizes:", sizeDataArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleColor = (color) => {
    //console.log('original variant: ',fetchedVariant)
    const matchingVariants = fetchedVariant.filter((variant) => variant.colorId === color);

    //console.log('filtered color array :',matchingVariants)
    fetchSize(matchingVariants)
    matchingVariants.forEach((variant) => {
      //alert(variant.color);
    });
  };

  
  const handleSize = (size) => {
    //console.log('before current variant: ', fetchedVariant)
    if(selectedColor !== '' || selectedSize !==''){
      
      const variant = fetchedVariant.filter((variant) => variant.sizeId === sizeId && variant.colorId === colorId);
      setCurrentVariant(variant)
      //console.log('current variant id: ', variant[0]?.id)
    }

  }

  useEffect(() => {

    const variant = fetchedVariant.filter((variant) => variant.sizeId === sizeId && variant.colorId === colorId);
    setSelectedPrice(variant[0]?.price)
    setAvailableQty(variant[0]?.qty)

    //console.log('selected Price: ', variant[0]?.price)
    //console.log('available qty: ', variant[0]?.qty)

  }, [colorId, sizeId]);

  useEffect(() => {
    if (newFetchedVariant.length > 0 && fetchedImages.length > 0) {
      const imagesByColor = {};
  
      newFetchedVariant.forEach((val) => {
        const variantId = val.id;
  
        const imagesWithColor = fetchedImages.filter((image) => image[0]?.variantId === variantId);
  
        imagesByColor[variantId] = imagesWithColor;
      });
  
      setNewImage(imagesByColor);
      console.log('image By color: ', newImage);
      
    }
  }, [fetchedImages, newFetchedVariant]);
  

  const product = {
    name: product_name,
    description: 'Product Description',
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['Small', 'Medium', 'Large'],
    price: selectedPrice,
    images: [
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp',
    ],
  };

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const addToBag = async() => {
    //alert('Product added to cart!');
    if(selectedSizeId !== '' && colorId !=='' && selectedColor !== '' && quantity !== '' )
    {
        const variant = fetchedVariant.filter((variant) => variant.sizeId === selectedSizeId && variant.colorId === colorId);
      
        const data = new FormData()
        if(!localStorage.getItem('authToken'))
        {
          //navigate('/signin')
          alert('Sign in First')
        }
        else{
          data.append('token',localStorage.getItem('authToken'))
          const response = await fetch('https://mohitto25.pythonanywhere.com/api/verifyuser',{method:"POST",body:data})
          const responseData = await response.json()
          if(responseData.authuser === 'false'){
            alert('you are not authorised ! ')
            //navigate('/signin')
          }
          else{

            const cartData = new FormData()
            cartData.append('email',responseData.userEmail)
            cartData.append('variant_id', variant[0]?.id)
            cartData.append('qty',quantity)


            console.log('cart email :',responseData.userEmail)
            console.log('cart variant_id :', variant[0]?.id)
            console.log('cart qty :',quantity)
            
            const response = await fetch('https://mohitto25.pythonanywhere.com/api/addtocart',{method:"POST",body:cartData})
            if(response.ok){
              alert('added to cart')
            }
            else{
              alert('error while adding in cart')
            }
          }

        }
        
        
    }
    else{
      alert('select variant properly !')
    }
    const variant = fetchedVariant.filter((variant) => variant.sizeId === selectedSizeId );
    setSelectedVariant(variant)
    console.log('current variant id: ', variant[0]?.id)
    console.log('Total variant ',fetchedVariant)
    console.log('selected sizeid',selectedSizeId)
    console.log('selected color ',selectedColor)
    console.log('selected qty',quantity)

  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorClick = (color) => {
    setSelectedColor('gray');
  };



  const handleLeftArrowClick = () => {
    const newIndex =
      currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    
  };

  const handleRightArrowClick = () => {
    const newIndex =
      currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      if(currentImageIndex === imageArray.length -1 ){
        setCurrentImageIndex(0)
      }
  };

  const handleImageChange =(image)=>{
    setImageArray(image)
    console.log('current Images :',image)
  }

  // Collect the images in a separate array
  useEffect(() => {
    if (Object.keys(newImage).length > 0) {
      //const firstImage = await Object.values(newImage)[0][0];
      
       console.log('First Image',Object.values(newImage)[1][0]) 
      setImageArray(Object.values(newImage)[1][0]);
    }
  
  }, [newImage]);
  

  



  return (
    <>

    <div className="container mt-4">
    
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-12">

                <div className="preview">
                <div className="preview-pic tab-content">
                  <div className=''></div>
                  <div className=" position-relative tab-pane active" id="pic-1">
                    
                    <img src={'https://mohitto25.pythonanywhere.com/'+imageArray[currentImageIndex]?.imageUrl} alt="Product" />
                    <div className="position-absolute bottom-0 end-0 p-4">
                      <FaChevronLeft
                        size={25}
                        className='pr-2 '
                        onClick={handleLeftArrowClick}
                      />
                      <FaChevronRight
                        size={25}
                        className='pl-2  '
                        onClick={handleRightArrowClick}
                      />
                    </div>
                  </div>
                </div>
                
              </div>
               
                  <ul className="preview-thumbnail nav nav-tabs">
              

                  








                    {Object.entries(newImage).map(([key, value]) => (
                       value.map((val)=>(
                      <li
                        key={key}
                      >
                        <a
                          data-target={`#pic-${key+ 1}`}
                          data-toggle="tab"
                        >

                          <img src={'https://mohitto25.pythonanywhere.com'+val[0]?.imageUrl} alt={`Thumbnail ${key + 1}`} 
                         
                          onClick={() => handleImageChange(val)}
                          
                          />
                        </a>
                      </li>
                    ))))}

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="detail-c pt-5">
          {currentproductData.length > 0 ? (
                <div>
                  <h2>{currentproductData[0]?.name}</h2>   

                  <p>{currentproductData[0]?.description}</p>      
                  {/* Include the content you want to display here */}
                </div>
              ) : null}

            <p>₹ {product.price}</p>
            <div className="mb-3">
              <h4>Color:</h4>
              <div className="btn-group" role="group" aria-label="Color">

                
                {fetchedColor.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-outline-${
                      selectedColor === color ? 'dark' : 'darklight'
                    }`}
                    onChange={(e) => { setSelectedSizeId('') }}
                    onClick={() => {  handleColorClick(color); handleSize(sizeId); setSelectedColor(color.color); setSelectedSize(''); setColorId(color.id);setQuantity(1) }}
                  >
                    {color.color}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h4>Size:</h4>
              <div className="btn-group" role="group" aria-label="Size">



                {fetchedSize.map((val) => (
                  <button
                    key={val.id}
                    type="button"
                    className={`btn btn-outline-${selectedSize === val.size ? 'dark' : 'darklight'
                      }`}
                    onChange={(e) => { handleSize(sizeId) }} // Handle the color selection event

                    onClick={() => { setSelectedSize(val.size);setSelectedSizeId(val.id); setSizeId(val.id); handleSize(sizeId);setQuantity(1) }}
                  >
                    {val.size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {availableQty > 0 ? (
              <>
                <div className="mb-3">
                  <h4>Quantity:</h4>
                  <div className="btn-group" role="group" aria-label="Quantity">
                    <button
                      type="button"
                      className="btn btn-outline-hide"
                      onClick={decreaseQuantity}
                    >
                      <FaMinus />
                    </button>
                    <span className="btn btn-light">{quantity}</span>
                    {availableQty!==quantity?(<button
                      type="button"
                      className="btn btn-outline-hide"
                      onClick={increaseQuantity}
                    >
                      <FaPlus />
                    </button>):<button
                      type="button"
                      disabled
                      className="btn btn-outline-hide"
                      onClick={increaseQuantity}
                    >
                      <FaPlus />
                    </button>}
                    
                  </div>
                </div>

                <div className="mb-3">
                  <button type="submit"
                    className="btn btn-dark btn-lg rounded-pill "
                    onClick={addToBag}
                    style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }}>
                    
                    Add To Bag <BsBag size={20} style={{paddingBottom: "4px"}}/>
                  </button>
                  <div className=''><br /></div>
                 
                </div>
              </>
            ) : ( <p className="text-danger">Out of Stock</p>)}


          </div>

        </div>
      </div>
       
    </div>
    <div className="mb-3">
      <Rating />
      
    </div>
      </>
    
  );
};

export default ExpandProductDetail;
