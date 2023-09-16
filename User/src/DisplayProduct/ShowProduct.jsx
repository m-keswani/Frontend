import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ShowProduct = () => {
    const [fetchedProduct,setFetchedProduct] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchProduct()    
    }, []);
    
    const fetchProduct =async() =>{
        try{
            const response = await fetch('http://localhost:8000/api/showproduct')
            const respnseData = await response.json()
            setFetchedProduct(respnseData)
            console.log("Product data", respnseData)
        }
        catch(error)
        {
            console.log("Error while fetching data")
        }
        
    }
    
    const expandProduct =async(id)=>{
       navigate('/productvariant')
    }

  return (
    <div>
        <div className='container'>
        {fetchedProduct.map((val,key)=>(
            <div onClick={() => expandProduct(val.id)} className='contianer main-container hover'>
                <img src="" alt="" />
                
                  <>
                  <p>{val.name}</p>  
                  <p>{val.gender}</p>
                  </>  
               
            </div>
        ))}
        </div>
    </div>
  )
}

export default ShowProduct
