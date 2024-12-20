import React, { useEffect, useState } from 'react'
import "./Product.css";
import SubCategory from './SubCategory.css'
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';

import MessageBox from './MessageBox';
const AddSubCategory = () => {
    const [category,setCategory] = useState('')
    const [subCategory,setSubCategory] = useState('')
    
    const [categoryId,setCategoryId] = useState('')
    const categoryArray = []
    const formData = new FormData()
    const [subCategoryError,setSubCategoryError] = useState('')
    const [categoryError,setCategoryError] = useState('')
    const [fetchedCategory,setFetchedCategory] = useState([])
    const [fetchedSubCategory,setFetchedSubCategory] = useState([])
    const [showMessage, setShowMessage] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    useEffect(() => {
        fetchCategory()
        fetchSubCategory()
    }, []);

    const fetchCategory =async()=>{
        try{
            const response = await fetch('http://localhost:8000/adminsite/categorymaster/')
            const responseData = await response.json()
            setFetchedCategory(responseData)
            console.log("catgeory",responseData)
        }   
        catch(error)
        {
            alert("unable to fetch category")
        }
        
    }

    const fetchSubCategory = async()=>{
        try{
            const response = await fetch('http://localhost:8000/adminsite/subcategorymaster/')
            const responseData = await response.json()
            setFetchedSubCategory(responseData)
            console.log("subcategory",responseData)
        }
        catch(error){
            alert("unable to fetch sub category")
        }    
    }


    const addSubCategory =async()=>{
        let isValid = true
        if(category === '')
        {
            setCategoryError("category required *")
            isValid = false
        }
        else
        {
            setCategoryError('')
        }

        if(subCategory === '')
        {
            setSubCategoryError("subcategory required *")
            isValid = false
        }
        else
        {
            setSubCategoryError('')
        }
        
        
        
        formData.append('categoryId',category)
        formData.append('subCategoryName',subCategory.toLowerCase())
        if(isValid)
        {
            try {
                    const reponse = await fetch('http://localhost:8000/adminsite/subcategorymaster/',
                    {
                    method: 'POST',
                    body: formData,
                })
                if (reponse.ok)
                {
                    setShowMessage(true);
                    setCategory('')
                    setSubCategory('')
                
                }
                
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            }
            catch (error) {
            alert("Error to add !")
            }

            fetchSubCategory()
        }
    }
    
    const delCat =async (key)=>{
        const response = await fetch("http://localhost:8000/adminsite/subcategorymaster/"+key.toString(),{method:"DELETE"});
        if(response.ok)
        {
            setShowDeleteMessage(true);
            setTimeout(() => {
                setShowDeleteMessage(false);
            }, 3000);
            fetchSubCategory()
        }
        console.log("response from del :",response)
    }

    return (
    <>
    <div className='container'>
    {showMessage && <MessageBox message="SubCategory Added Successfully" visibility='true' />}
    {showDeleteMessage && <MessageBox message="SubCategory Removed Successfully" visibility='true' />}
    
    

    <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>Select Category</option>
        {fetchedCategory.map((val)=>(
            
            <option value={val.id}>{val.categoryName}</option>
            
        ))}
    </select>
    <p className='text-danger 9px'>{categoryError && <div className="error-message">{categoryError}</div>}</p>

      <input type="text" name='subCategory' maxLength="20" value={subCategory} onChange={(e) => setSubCategory(e.target.value.replace(/[^A-Za-z' ']/g, ''))}/>
      <p className='text-danger 9px'>{subCategoryError && <div className="error-message">{subCategoryError}</div>}</p>
        {fetchedSubCategory.some((dict) => Object.values(dict).includes(subCategory.toLowerCase()))?(<p >already added</p>):null}
        
      <button className='button' onClick={addSubCategory}><GrAdd/> Add SubCategory</button>
    </div>
    <br/>
    <div className='container'>
        <table>
            <tr >
                <th className='text-center'>
                    Category
                </th>
                <th className='text-center'>
                    SubCategory
                </th>
                <th>

                </th>
            </tr>

            
                {fetchedSubCategory.map((val)=>(
                    <tr className='non-selectable h5'>
                        <td className=' text-center pt-5'>
                            {fetchedCategory.map((item)=>(
                               <p> {val.categoryId === item.id ? item.categoryName:''}</p>
                            ))}
                        </td>
                        <td className='text-center'>
                            {val.subCategoryName}
                        </td>
                        
                        <td >
                            <button className='button float-right' onClick={() => delCat(val.id)}>Delete <AiFillDelete /></button>

                        </td>
                    </tr>
                ))}
            
        </table>
    </div>
    </>
  )
}

export default AddSubCategory
