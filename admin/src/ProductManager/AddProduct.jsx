import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import "./Product.css";
import MessageBox from './MessageBox';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';



const AddProduct = () => {

    const [categoryData, setCategoryData] = useState('')
    const [subCategoryData, setSubCategoryData] = useState('')
    const categoryArray = []
    const subCategoryArray = []

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubCategory, setSelectedSubCategory] = useState('')

    const [qty, setQty] = useState('')
    const [price, setPrice] = useState('')
    const [selectedImage, setSelectedImage] = useState([])

    const productData = new FormData()
    const variantData = new FormData()

    const [fetchedColor, setFetchedColor] = useState('')
    const [fetchedSize, setFetchedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [fetchedColorArray, setFetchedColorArray] = useState([])
    const [fetchedSizeArray, setFetchedSizeArray] = useState([])
    const [edit,setEdit] = useState(false)
    const [executed,setExecuted] = useState(false)

    const [productId,setProductId] = useState('')
    const [variantId,setVariantId] = useState('')

    //Errors Variables 
    const [productNameError, setProductNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [subCategoryError, setSubCategoryError] = useState("");
    const [colorError, setColorError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [qtyError, setQtyError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [imageError, setImageError] = useState("");
    //For focus
    const productNameRef = useRef(null);
    const descriptionRef = useRef(null);
    const genderRef = useRef(null);
    const categoryRef = useRef(null);
    const subCategoryRef = useRef(null);
    const colorRef = useRef(null);
    const sizeRef = useRef(null);
    const qtyRef = useRef(null);
    const priceRef = useRef(null);
    const imageRef = useRef(null);

    const [showMessage,setShowMessage] =useState('')

    useEffect(() => {
        fetchCategoryData()
        fetchColorData()
        fetchSizeData()

    }, []);

    const fetchCategoryData = async () => {

        await fetch("http://localhost:8000/adminsite/categorymaster/")
            .then(response => response.json())
            .then(categoryData => setCategoryData(categoryData))
            .catch(error => console.error('Error fetching data:', error));


    }
    const fetchSubCategory = async (selectedCategory) => {

            const response = await fetch("http://localhost:8000/adminsite/getselectedcategory/" + selectedCategory.toString())
            //const responseData = await response.json()
            //console.log("Response subcat Data :: ",responseData)
            .then(response => response.json())
            .then(subCategoryData => setSubCategoryData(subCategoryData))
            .catch(error => console.error('Error fetching data:', error));

    }
    for (let i = 0; i < categoryData.length; i++) {
        categoryArray[i] = Object.values(categoryData.length > 0 ? categoryData[i] : null);
    }
    for (let i = 0; i < subCategoryData.length; i++) {
        subCategoryArray[i] = Object.values(subCategoryData.length > 0 ? subCategoryData[i] : null);
    }

    const productMasterData = async () => {

        productData.append('name', productName)
        productData.append('description', description)
        productData.append('gender', gender)
        productData.append('categoryId', selectedCategory)
        productData.append('subCategoryId', selectedSubCategory)
        
        try {
                await fetch('http://localhost:8000/adminsite/productmaster/',
                {
                    method: 'POST',
                    body: productData,

                })
            
        }
        catch (error) {
            console.log("Error ", error)
        }

        
    }
    

    const variantMasterData =async()=>{
        
        const response = await fetch("http://localhost:8000/adminsite/productmaster/")
        const r =await response.json()
        
        console.log("***************Get Response Product ID :: ",r.id)
        variantData.append("productId",r.id)
        variantData.append("sizeId",selectedSize)
        variantData.append("colorId",selectedColor)
        variantData.append("qty",qty)
        variantData.append("price",price)
        console.log("variant Data",variantData)

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

        
        setVariantId(r.id)
        selectedImage.map((val) =>{
            const sendData = async()=>{
            const imageToUpload = new FormData()
            console.log("variant Id" ,variantId)
            imageToUpload.append('variantId', r.id)

            imageToUpload.append('imageUrl', val)
            try {
                    const response = await fetch('http://localhost:8000/adminsite/imagemaster/',
                    {
                        method: 'POST',
                        body: imageToUpload,
                    })
                    if(response.ok)
                    {
                        setShowMessage(true)
                        setTimeout(() => {
                            setShowMessage(false);
                          }, 2000);
                    }
                    
            }
            catch (error) {
                alert("Error to add")
            }

        }
        sendData()
        })
    }

    const submitProductDetails = async () => {
        if (!validateForm()) {
            return; // Validation failed, do not submit the form
        }

        if(!executed)
        {
            await productMasterData();
            setExecuted(true);
        }
        //set editable data fields
        setEdit(false)

        await variantMasterData();
        await imageMaster();
        //set execution
        setExecuted(false)
        //clear data
        setProductName('')
        setDescription('')
        setSelectedCategory('')
        setSelectedSubCategory('')
        setSelectedColor('')
        setSelectedSize('')
        setQty('')
        setPrice('')
        setSelectedImage([])

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
        setSelectedImage(current => [...current, event.target.files[0]]);
        }
        console.log('Selected Images :',selectedImage)


    };

    const delImg = (img) => {

        const Img = selectedImage.filter((val) => val !== img)
        setSelectedImage(Img)

    }

    const fetchColorData = async () => {
        try {
            const response = await fetch('http://localhost:8000/adminsite/colormaster');
            const fetchedColor = await response.json();
            setFetchedColor(fetchedColor);

            if (Array.isArray(fetchedColor)) {
                const tempColorArray = fetchedColor.map((color) => Object.values(color));
                setFetchedColorArray(tempColorArray);
            }
        } catch (error) {
            console.error('Error fetching color data:', error);
        }
    }

    const fetchSizeData = async () => {
        try {
            const response = await fetch('http://localhost:8000/adminsite/sizemaster');
            const fetchedSize = await response.json();
            setFetchedSize(fetchedSize);

            if (Array.isArray(fetchedSize)) {
                const tempSizeArray = fetchedSize.map((size) => Object.values(size));
                setFetchedSizeArray(tempSizeArray);
            }
        } catch (error) {

            console.error('Error fetching color data:', error);
        }
    }

    const submitNewVariant =async()=>{
        
        

        if (!validateForm()) {

            return; 
        }

        if(!executed)
        {
            setEdit(true)
            await productMasterData();
        }
        await variantMasterData()
        await imageMaster()
        setSelectedColor('')
        setSelectedSize('')
        setQty('')
        setPrice('')
        setSelectedImage([])
        setExecuted(true)
        setColorError("");
        setSizeError("");
        setQtyError("");
        setPriceError("");
    }
    

    //Validations 
    const validateForm = () => {
        let isValid = true;
        //For product name
        if (productName.trim() === "") {
            setProductNameError("product name required *");
            isValid = false;
            productNameRef.current?.focus();
        } else {
            setProductNameError("");
        }
        //For Description
        if (description.trim() === "") {
            setDescriptionError("description required *");
            isValid = false;
            descriptionRef.current?.focus();
        } else {
            setDescriptionError("");
        }
        //For Gender
        if (gender.trim() === "") {
            setGenderError("gender required *");
            isValid = false;
            genderRef.current?.focus();
        } else {
            setGenderError("");
        }
        //For category
        if (selectedCategory.trim() === "") {
            setCategoryError("category required *");
            isValid = false;
            categoryRef.current?.focus();
        } else {
            setCategoryError("");
        }
        //For subcategory
        if (selectedSubCategory.trim() === "") {
            setSubCategoryError("subcategory required *");
            isValid = false;
            subCategoryRef.current?.focus();
        } else {
            setSubCategoryError("");
        }
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
        <div className="container non-selectable">
            
            {showMessage && <MessageBox message="Added Successfully" visibility='true' />}

            <br />
            <div className=''>
            <label>Product Name </label>
            <input  type="text" name="productName" value={productName} onChange={(e) => {setProductName(e.target.value)}} className={productNameError || productName.trim() === "" ? "" : ""} ref={productNameRef} readOnly={edit} />
            <p className='text-danger 9px'>{productNameError && <div className="error-message">{productNameError}</div>}</p>
            
            <label>Description </label>
            <textarea  name="description" value={description} rows="4" cols="50" onChange={(e) => {setDescription(e.target.value)}} className={descriptionError || description.trim() === "" ? "" : ""}  ref={descriptionRef} readOnly={edit} ></textarea><br />
            <p className='text-danger 9px'>{descriptionError && <div className="error-message">{descriptionError}</div>}</p>


            <label>Gender </label>
            <select disabled={edit} className="form-select" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} ref={genderRef} ><br />
                <option  value="" disabled>Select option</option>
                <option  value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <p className='text-danger 9px'>{genderError && <div className="error-message">{genderError}</div>}</p>


            <label>Select Category </label>
            <select  disabled={edit} className="form-select" name="selectedCategory" value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); fetchSubCategory(e.target.value)  }} ref={categoryRef} ><br />
                <option value="" disabled>Select Category</option>
                {categoryArray.map((val) => (
                    <option key={val[0]} value={val[0]} onClick={fetchSubCategory} >{val[1]}</option>

                ))}

            </select> <br />

            <p className='text-danger 9px'>{categoryError && <div className="error-message">{categoryError}</div>}</p>
            


            <label>Select SubCategory </label>
            <select disabled={edit} className="form-select" name="selectedSubCategory" value={selectedSubCategory} onChange={(e) => { setSelectedSubCategory(e.target.value) }} ref={subCategoryRef} ><br />
                <option value="" disabled>Select SubCategory</option>
                {subCategoryArray.map((val) => (
                    <option key={val[0]} value={val[0]}>{val[1]}</option>
                ))}

            </select><br />

            <p className='text-danger 9px'>{subCategoryError && <div className="error-message">{subCategoryError}</div>}</p>
            


            <label>Color </label>

            <select name='selectedColor' onChange={(e) => { setSelectedColor(e.target.value) }} ref={subCategoryRef} >
                <option value="" selected disabled>--select color</option>
                {fetchedColorArray.map((val) => (

                    <option value={val[0]}>{val[1]}</option>

                ))}
            </select><br/>

            <p className='text-danger 9px'>{colorError && <div className="error-message">{colorError}</div>}</p>
            

            <label>Size </label>
            <select name='selectedSize' onChange={(e) => { setSelectedSize(e.target.value) }} ref={sizeRef} >
                <option value="" selected disabled>--select Size</option>
                {fetchedSizeArray.map((val) => (

                    <option value={val[0]}>{val[1]}</option>

                ))}
            </select> <br/>   

            <p className='text-danger 9px'>{sizeError && <div className="error-message">{sizeError}</div>}</p>
                


            <label>Quantity </label>
            <input  type="number" name='qty' min={1} value={qty} onChange={(e) => { setQty(e.target.value) }} ref={qtyRef} /><br />

            <p className='text-danger 9px'>{qtyError && <div className="error-message">{qtyError}</div>}</p>
            

            <label>Price </label>
            <input type="text" name='price' value={price} onChange={(e) => { setPrice(e.target.value.replace(/[^0-9.]/g, '')) }} ref={priceRef} /><br />

            <p className='text-danger 9px'>{priceError && <div className="error-message">{priceError}</div>}</p>

            <label>Image </label>
            <input class="form-control" type="file" accept="image/*" onChange={handleImageChange}  />

                {selectedImage.map((val, index) => (
                    <div key={index} className="image-container">
                        <img src={URL.createObjectURL(val)} alt="" className="image" />
                      
                            <IoMdClose className="remove-button" onClick={() => delImg(val)} />
                    </div>
                ))}


            <p className='text-danger 9px'>{imageError && <div className="error-message">{imageError}</div>}</p>

            <button className='button' onClick={submitNewVariant} ><VscNewFile/> Save and add other variant</button>
            <button className='button' onClick={() => { submitProductDetails(); setEdit(false);  }}><MdOutlineSaveAlt/> Save</button>

            </div>

        </div>
    )
}

export default AddProduct
