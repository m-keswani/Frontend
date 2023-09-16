import React, { useEffect, useState } from 'react'
import "./Product.css";

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
                    await fetch('http://localhost:8000/adminsite/subcategorymaster/',
                    {
                    method: 'POST',
                    body: formData,
                })
            }
            catch (error) {
            console.log("Error ", error)
            }

            fetchSubCategory()
        }
    }
    
    const delCat =async (key)=>{
        const response = await fetch("http://localhost:8000/adminsite/subcategorymaster/"+key.toString(),{method:"DELETE"});
        if(response.ok)
        {
            fetchSubCategory()
        }
        console.log("response from del :",response)
    }

    return (
    <>
    <div>
    <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>Select Category</option>
        {fetchedCategory.map((val)=>(
            
            <option value={val.id}>{val.categoryName}</option>
            
        ))}
    </select>
    <p className='text-danger 9px'>{categoryError && <div className="error-message">{categoryError}</div>}</p>

      <input type="text" name='subCategory' maxLength="20" value={subCategory} onChange={(e) => setSubCategory(e.target.value.replace(/[^A-Za-z' ']/g, ''))}/>
      <p className='text-danger 9px'>{subCategoryError && <div className="error-message">{subCategoryError}</div>}</p>

      <button onClick={addSubCategory}>Add SubCategory</button>
    </div>
    <div>
        <table>
            <tr>
                <th>
                    Category
                </th>
                <th>
                    SubCategory
                </th>
                <th>

                </th>
            </tr>

            
                {fetchedSubCategory.map((val)=>(
                    <tr>
                        <td>
                            {val.subCategoryName}
                        </td>
                        <td>
                            {fetchedCategory.map((item)=>(
                               <p> {val.categoryId === item.id ? item.categoryName:''}</p>
                            ))}
                        </td>
                        <td>
                            <button onClick={() => delCat(val.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
            
        </table>
    </div>
    </>
  )
}

export default AddSubCategory
