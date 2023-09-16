import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const EditForm = () => {
  const location = useLocation();
  console.log("Passed Location :: ",location)
  const pid = location.state?.id;
  const image =location.state?.image;

const [pname, setPname] = useState(location.state?.name)
  const [description, setDescription] = useState(location.state?.des)
  const [qty, setQty] = useState(location.state?.qty)
  const [price, setPrice] = useState(location.state?.price)
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = new useNavigate()
  const formData = new FormData();
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
  
  formData.append('id', pid);
  
  formData.append('name', pname);
  formData.append('description', description);
  formData.append('qty', qty);
  formData.append('image', selectedImage);
  formData.append('price', price);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  async function EditProductList()
  {
    console.log("In Edit Product Function")
    const response = await fetch('http://localhost:8000/api/product/'+pid.toString()+'/', {
        method: 'PUT',
        headers: {
            //'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrfToken'),
        },
        body: formData,
    });
    console.log("Response :: ",response)
    if(pname ==='' || description ==='' || qty ==='' || price ==='' || selectedImage === null )
      {
      
        alert('Data not Sent');
      
      }
      else{
        //document.write('data sent')
        alert('Data Sent');
        navigate('/dashboard')
      }
      
    
    //alert("Data Updated",pid)
  }
  return (
    <div class="container">
    <label class="form-label">Product Name:</label>
    <input class="form-control" type="text" name="pname" value={pname} onChange={(e) => setPname(e.target.value)} /><br />

    <label class="form-label">Description:</label>
    <textarea class="form-control" name="description" value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)}></textarea><br />

    <label class="form-label">Quantity:</label>
    <input class="form-control" type="number" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} /><br />

    <label class="form-label">Upload Image:</label>
    <input class="form-control" type="file" accept="image/*" onChange={handleImageChange} /><br />
    <p class="form-text">Available Image:</p>
    <img src={"http://127.0.0.1:8000/" + image} alt="Fetched Image" class="img-thumbnail" style={{ width: '200px', height: '200px' }} /><br />

    <label class="form-label">Price:</label>
    <input class="form-control" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />

    <button class="btn btn-primary" onClick={EditProductList}>Update Product</button>
</div>

  )
}

export default EditForm
