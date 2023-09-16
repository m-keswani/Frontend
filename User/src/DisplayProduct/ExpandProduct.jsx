import React from 'react'

const ExpandProduct = () => {



const fetchVariant =async()=>{
    try{
        const response = await fetch('http://localhost:8000/api/showproduct' + )
        const respnseData = await response.json()
        console.log("Product data", respnseData)
    }
    catch(error)
    {
        console.log("Error while fetching data")
    }
}
  return (
    <div>
      
    </div>
  )
}

export default ExpandProduct
