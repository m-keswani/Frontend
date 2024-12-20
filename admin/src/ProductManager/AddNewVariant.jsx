import React, { useEffect, useState,useRef   } from 'react'
import "./Product.css";
import MessageBox from './MessageBox';
import { IoMdClose } from 'react-icons/io';
const AddNewVariant = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    const [fetchedProduct,setFetchedProduct] = useState([])
    const [fetchedCategory,setFetchedCategory] = useState([])
    const [fetchedSubCategory,setFetchedSubCategory] = useState([])
    const [selectedColor,setSelectedColor] = useState('')
    const [selectedSize,setSelectedSize] = useState('')
    const [price,setPrice] = useState('')
    const [qty,setQty] = useState('')
    const [fetchedColorArray, setFetchedColorArray] = useState([])
    const [fetchedSizeArray, setFetchedSizeArray] = useState([])
    const [selectedImage, setSelectedImage] = useState([])
    const [variantId,setVariantId] = useState('')
    const variantData = new FormData()
    const [showMessage, setShowMessage] = useState(false);


    //Validations 
    const [colorError, setColorError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [qtyError, setQtyError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [imageError, setImageError] = useState("");

    const colorRef = useRef(null);
    const sizeRef = useRef(null);
    const qtyRef = useRef(null);
    const priceRef = useRef(null);
    const imageRef = useRef(null);


    useEffect(() => {
        fetchProduct()
        fetchColorData()
        fetchSizeData()
        
    }, []);
    
    const fetchSizeData = async () => {
        try {
            const response = await fetch('http://localhost:8000/adminsite/sizemaster');
            const fetchedSize = await response.json();

            if (Array.isArray(fetchedSize)) {
                const tempSizeArray = fetchedSize.map((size) => Object.values(size));
                setFetchedSizeArray(tempSizeArray);
            }
        } catch (error) {

            console.error('Error fetching color data:', error);
        }
    }

    const fetchProduct = async()=>{
        try{
            const response = await fetch('http://localhost:8000/adminsite/getproduct/' + value.toString())
            const responseData = await response.json()
            setFetchedProduct(responseData)
            await fetchCategory(responseData[0]?.categoryId)
            await fetchSubCategory(responseData[0]?.subCategoryId)

        }
        catch{
            console.log("Error in fetching data")
        }
        
    }

    const fetchCategory = async (cid)=>{
        const response = await fetch ('http://localhost:8000/adminsite/getcategory/' + cid.toString())
        const resposeData = await response.json()
        //console.log("fetched Category",resposeData)
        setFetchedCategory(resposeData)
        //console.log("Response Data from fetchcategory",resposeData)
    }

    const fetchSubCategory = async (scid)=>{
        const response = await fetch ('http://localhost:8000/adminsite/getsubcategory/' + scid.toString())
        const responseData = await response.json()
        //console.log("response :: ",responseData)
        setFetchedSubCategory(responseData)
        //console.log("Response Data from fetchSubcategory",responseData)
    }

    const fetchColorData = async () => {
        try {
            const response = await fetch('http://localhost:8000/adminsite/colormaster');
            const fetchedColor = await response.json();

            if (Array.isArray(fetchedColor)) {
                const tempColorArray = fetchedColor.map((color) => Object.values(color));
                setFetchedColorArray(tempColorArray);
            }
        } catch (error) {
            console.error('Error fetching color data:', error);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
        setSelectedImage(current => [...current, event.target.files[0]]);
        }
    };

    const delImg = (img) => {

        const Img = selectedImage.filter((val) => val !== img)
        setSelectedImage(Img)

    }

    const variantMasterData =async()=>{
        
        const response = await fetch("http://localhost:8000/adminsite/productmaster/")
        const r = await response.json()
        
        //console.log("***************Get Response",r.id)
        variantData.append("productId",value)
        variantData.append("sizeId",selectedSize)
        variantData.append("colorId",selectedColor)
        variantData.append("qty",qty)
        variantData.append("price",price)
        
       // console.log("variant Data",variantData)

        try {
            
            await fetch('http://localhost:8000/adminsite/productvariantmaster',
                {
                    method: 'POST',
                    body: variantData,

                })
          
         
        }
        catch (error) {
            console.log("Error ", error)
        }

    }

    const imageMaster =async()=>{
        const response = await fetch("http://localhost:8000/adminsite/productvariantmaster")
        const r = await response.json()
        //setProductId(r.id)
        //console.log("Get Response variant id",r.id)
        setVariantId(r.id)
        selectedImage.map((val) =>{
            const sendData = async()=>{
            const imageToUpload = new FormData()
           // console.log("variant Id" ,variantId)
            imageToUpload.append('variantId', r.id)

            imageToUpload.append('imageUrl', val)
            try {
                    const response = await fetch('http://localhost:8000/adminsite/imagemaster/',
                    {
                        method: 'POST',
                        body: imageToUpload,
                    })
                    
            }
            catch (error) {
                console.log("Error ", error)
            }

        }
        sendData()
        })
    }

    const addNewVariant =async()=>{
        if (!validateForm()) {
            
            return; // Validation failed, do not submit the form
        }

        setSelectedColor('')
        setSelectedSize('')
        setQty('')
        setPrice('')
        setSelectedImage([])
        await variantMasterData()
        await imageMaster()
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }

    //Validation 
    const validateForm = () => {
        let isValid = true;
       
        //For color
        if (selectedColor.trim() === "") {
            setColorError("color required *");
            isValid = false;
            colorRef.current?.focus();
        } else {
            setColorError("");
        }
        //For size
        if (selectedSize.trim() === "") {
            setSizeError("size required *");
            isValid = false;
            sizeRef.current?.focus();
        } else {
            setSizeError("");
        }//For qty
        if (qty.trim() === "") {
            setQtyError("quantity required *");
            isValid = false;
            qtyRef.current?.focus();
        } else {
            setQtyError("");
        }
        //For price
        if (price.trim() === "") {
            setPriceError("price required *");
            isValid = false;
            priceRef.current?.focus();
        } else {
            setPriceError("");
        }

        //For image
        if (selectedImage.length < 1) {
            setImageError("atleast one image required *");
            isValid = false;
            imageRef.current?.focus();
        } else {
            setImageError("");
        }
        return isValid;
    };



    


return (
    <div className='container'>
    
        <label>Product Name :: </label>
        <input type="text" value={fetchedProduct[0]?.name} readOnly /><br/>
        <label>Description :</label>
        <textarea name="description" value={fetchedProduct[0]?.description} rows="4" cols="50" readOnly ></textarea><br />
        <label>Gender :: </label>
        <input type="text" value={fetchedProduct[0]?.gender} readOnly /><br/>
        <label>Category :: </label>
        <input type="text" value={fetchedCategory?.categoryName} readOnly /><br/>
        <label>SubCategory :: </label>
        <input type="text" value={fetchedSubCategory[0]?.subCategoryName} readOnly /><br/>
        
        <label>Color ::</label>

            <select name='selectedColor' onChange={(e) => { setSelectedColor(e.target.value) }} ref={colorRef}>
                <option value="" selected disabled>--select color</option>
                {fetchedColorArray.map((val) => (

                    <option value={val[0]}>{val[1]}</option>

                ))}


            </select><br/>

            <p className='text-danger 9px'>{colorError && <div className="error-message">{colorError}</div>}</p>
            

            <label>Size ::</label>
            <select name='selectedSize' onChange={(e) => { setSelectedSize(e.target.value) }} ref={sizeRef} >
                <option value="" selected disabled>--select Size</option>
                {fetchedSizeArray.map((val) => (

                    <option value={val[0]}>{val[1]}</option>

                ))}
            </select> <br/>   

            <p className='text-danger 9px'>{sizeError && <div className="error-message">{sizeError}</div>}</p>
            

            <label>Quantity ::</label>
            <input type="number" name='qty' min={1} value={qty} onChange={(e) => { setQty(e.target.value.replace(/[^0-9]/g, '')) }} ref={qtyRef}/><br />
            
            <p className='text-danger 9px'>{qtyError && <div className="error-message">{qtyError}</div>}</p>

            <label>Price ::</label>
            <input type="text" name='price' value={price} onChange={(e) => { setPrice(e.target.value.replace(/[^0-9.]/g, '')) }} ref={priceRef} /><br />

            <p className='text-danger 9px'>{priceError && <div className="error-message">{priceError}</div>}</p>


            <label>Image ::</label>
            <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} ref={imageRef} />

            {selectedImage.map((val, index) => (
                <>

                    <div key={index} className="image-container">
                        <img src={URL.createObjectURL(val)} alt="" className="image" />
                      
                            <IoMdClose className="remove-button" onClick={() => delImg(val)} />
                    </div>
                </>
            ))}

            <p className='text-danger 9px'>{imageError && <div className="error-message">{imageError}</div>}</p>

            <button className='button' onClick={addNewVariant}>Add</button>

            {showMessage && <MessageBox message="New Variant Added Successfully" visibility='true' />}
    </div>
  )
}

export default AddNewVariant
