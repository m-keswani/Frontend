import React, { useEffect, useState } from 'react'
import "./Product.css";

const AddCategory = () => {

  const [categoryData, setCategoryData] = useState('')
  const [category, setCategory] = useState('')
  const categoryArray = []
  
  const formData = new FormData()
  const [categoryError,setCategoryError] = useState('')
  const [categoryDuplicate,setCategoryDuplicate] = useState('')


  useEffect(() => {
      fetchData()
  }, []);



  for (let i = 0; i < categoryData.length; i++) {
    categoryArray[i] = Object.values(categoryData.length > 0 ? categoryData[i] : null);
  }



  const addCategory = async () => {

    let isValid = true

    if (category.trim() === '') {
      setCategoryError("empty category not allowed")
      isValid = false
    }
    else{
      setCategoryError('')
    }
    
    if (categoryArray.some(row => row.includes(category.toLowerCase())) && isValid ) {
      console.log("In dup")
      setCategoryDuplicate("already added")
    }
    else {
      setCategoryDuplicate("")

      formData.append('categoryName', category.toLowerCase())
      try {
          await fetch('http://localhost:8000/adminsite/categorymaster/',
          {
            method: 'POST',
            body: formData,
          })
       

      }
      catch (error) {
        console.log("Error ", error)
      }
      fetchData()
    }
    
  }



  const deleteCategory =async(key) =>{
      
      try{
        await fetch("http://localhost:8000/adminsite/categorymaster/"+key.toString()+'/',{method:"DELETE"});
        
      }
      catch(error){
        console.log("Delete unsuccessful")
      }
      fetchData()
  }
  const fetchData =()=>{
    fetch('http://localhost:8000/adminsite/categorymaster/')
    .then(response => response.json())
    .then(categoryData => setCategoryData(categoryData))
    .catch(error => console.error('Error fetching data:', error));
     
  }
  return (
    <>
      
      <div className='container main-container'>
        <label>Enter Category Name ::</label>
        <input type="text" name='category' maxLength="20" value={category} onChange={(e) => setCategory(e.target.value.replace(/[^A-Za-z]/g, ''))} />
        
        <p className='text-danger 9px'>{categoryError && <div className="error-message">{categoryError}</div>}</p>
        <p className='text-danger 9px'>{categoryDuplicate && <div className="error-message">{categoryDuplicate}</div>}</p>

        <button type='submit' onClick={addCategory} >Add Category</button>

      </div>
      <div className='container main-container'>
        <table border='1'>
          <tr>
            <th>
              Available Category
            </th>
            <th>

            </th>
          </tr>
          {categoryArray.map((val) => (
            <tr key={val[0]}>
              <td>{val[1]}</td>
              <td><button className='button' onClick={() => deleteCategory(val[0])}>Delete</button></td>

            </tr>
          ))}
        </table>
      </div>
    </>
  )

}
export default AddCategory
