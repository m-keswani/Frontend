import React, { useState } from 'react'

const Product = () => {
  const [pname, setPname] = useState('')
  const [description, setDescription] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);


  console.log('Pname :: ',pname)
  console.log('Descrition :: ',description)
  console.log('Qty :: ',qty)
  console.log('price :: ',price)
  
  function getToken(name) {
    let cookieval = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieval = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieval;
  }
  function editProduct()
  {
    alert("In edit Product")
  }  
  
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  async function UploadImage(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', pname);
    formData.append('description', description);
    formData.append('qty', qty);
    
    formData.append('image', selectedImage);
    formData.append('price', price);
    
    try {
      console.log("headers ::", ' ');
      const response = await fetch('http://localhost:8000/api/product/', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrfToken'),
        },
        body: formData,
    });
      
      console.log("Response ::", response);
      console.log("photo :: ",selectedImage)
    }
    catch (error) {
      console.error("Error :: ",error);
    }
  }
  console.log("Image :: ",selectedImage)
 
  return (
        <>
        <div class="container">
    <form>
        <div class="mb-3">
            <label class="form-label">Product Name:</label>
            <input class="form-control" type="text" name="pname" value={pname} onChange={(e) => setPname(e.target.value)} />
        </div>
        
        <div class="mb-3">
            <label class="form-label">Description:</label>
            <textarea class="form-control" name="description" value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        
        <div class="mb-3">
            <label class="form-label">Quantity:</label>
            <input class="form-control" type="number" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        
        <div class="mb-3">
            <label class="form-label">Upload Image:</label>
            <input class="form-control" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        
        <div class="mb-3">
            <label class="form-label">Price:</label>
            <input class="form-control" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        
        <button class="btn btn-primary" onClick={UploadImage}>Add Product</button>
    </form>
</div>

    </>
  )
}

export default Product
