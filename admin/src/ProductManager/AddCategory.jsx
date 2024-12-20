import React, { useEffect, useState } from 'react'
import "./Product.css";
import MessageBox from './MessageBox';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
const AddCategory = () => {

  const [categoryData, setCategoryData] = useState('')
  const [category, setCategory] = useState('')
  const categoryArray = []
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  
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
      return
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
          setShowMessage(true);
          setCategory('')

          setTimeout(() => {
              setShowMessage(false);
          }, 3000);

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
        setShowDeleteMessage(true);
        setTimeout(() => {
            setShowDeleteMessage(false);
        }, 3000);
      }
      catch(error){
        alert("Delete unsuccessful")
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
      {showMessage && <MessageBox message="Category Added Successfully" visibility='true' />}
      {showDeleteMessage && <MessageBox message="Category Removed Successfully" visibility='true' />}
      
      <div className='container main-container '>

        <label htmlFor="" className='text-bold'>Category:</label>
        <input
          type='text'
          name='category'
          maxLength='20'
          value={category}
          onChange={(e) => setCategory(e.target.value.replace(/[^A-Za-z]/g, ''))}
          className='input-field'
        />
        <br />
        {categoryError && <div className="error-message"><p className='text-danger'>{categoryError}</p></div>}
        {categoryArray.some(row => row.includes(category.toLowerCase())) ? <p className='text-info'>Category already added</p> : null}
        <button type='submit' onClick={addCategory} className='button' ><GrAdd className=''/> Add Category</button>

      </div>
      <br />
      <br />
      <div className='container main-container non-selectable'>
        <table className='table '>
          <thead>
            <tr>
              <th>Available Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoryArray.map((val) => (
              <tr key={val[0]}>
                <td className='h5 text-center pt-4'>{val[1]}</td>
                <td><button className='button float-right' onClick={() => deleteCategory(val[0])}>Delete <AiFillDelete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )

}
export default AddCategory
