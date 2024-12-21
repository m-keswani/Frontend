import React, { useEffect, useState } from 'react'
import Rating from '../Rating/Rating';
const ExpandProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [fetchedVariant, setFetchedVariant] = useState([])
  const [fetchedImages, setFetchedImages] = useState([])
  const [fetchedColor, setFetchedColor] = useState([])
  const [fetchedSize, setFetchedSize] = useState([])
  const [currentVariant,setCurrentVariant] = useState([])
  const [colorId,setColorId] = useState('')
  const [sizeId,setSizeId] = useState('')

  const product_id = urlParams.get('id');

  useEffect(() => {
    fetchVariants()


  }, []);

  const fetchVariants = async () => {
    try {
      const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getproductvariant/' + product_id.toString())
      const responseData = await response.json()
      console.log("Response Data in fetchvariants :", responseData)
      setFetchedVariant(responseData)

      await fetchColor(responseData)

      await fetchSize(responseData)
      await fetchImages(responseData)

    }
    catch (error) {

    }
  }
  const fetchImages = async (variantData) => {
    const newArray = [];

    for (const val of variantData) {
      try {
        const response = await fetch(`https://mohitto25.pythonanywhere.com/adimsite/productImages/${val.id}`);
        const responseData = await response.json();

        newArray.push(responseData);

      } catch (error) {
        // Handle errors here if needed
        console.error(error);
      }
    }

    setFetchedImages(newArray);
    console.log("Product variant img data", newArray);
  };

  const fetchColor = async (variantData) => {
    try {
      const uniqueColors = {}; // Use an object to store unique color IDs and colors
  
      await Promise.all(
        variantData.map(async (val) => {
          try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getcolor/' + val.colorId);
            const responseData = await response.json();
  
            // Store the unique color ID and color in the object
            uniqueColors[responseData[0]?.id] = responseData[0]?.colorName;
          } catch (error) {
            console.error("Error:", error);
            // Handle the error as needed
          }
        })
      );
  
      // Convert the object to an array if needed
      const colorDataArray = Object.entries(uniqueColors).map(([id, color]) => ({ id, color }));
  
      // Set the fetchedColor state with the array of unique color data
      setFetchedColor(colorDataArray);
      console.log("fetched colors :", colorDataArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  
  const fetchSize = async (variantData) => {
    try {
      const uniqueSizes = {}; // Use an object to store unique size IDs and sizes
  
      await Promise.all(
        variantData.map(async (val) => {
          try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/getsize/' + val.sizeId);
            const responseData = await response.json();
  
            uniqueSizes[responseData[0]?.id] = responseData[0]?.size;
          } catch (error) {
            console.error("Error:", error);
          }
        })
      );
  
      // Convert the object to an array if needed
      const sizeDataArray = Object.entries(uniqueSizes).map(([id, size]) => ({ id, size }));
  
      // Set the fetchedSize state with the array of unique size data
      setFetchedSize(sizeDataArray);
      //console.log("fetched sizes:", sizeDataArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  const handleColor = (color) => {
    //console.log('original variant: ',fetchedVariant)
    const matchingVariants = fetchedVariant.filter((variant) => variant.colorId === color);
    
    //console.log('filtered color array :',matchingVariants)
    fetchSize(matchingVariants)
    matchingVariants.forEach((variant) => {
      //alert(variant.color);
    });
  };

  const handleCart = (variantId) => {
    
  };

  const handleSize =(size)=>{
    console.log('before current variant: ',fetchedVariant)
    const variant = fetchedVariant.filter((variant) => variant.sizeId === size && variant.colorId === colorId);
    setCurrentVariant(variant)
    console.log('current variant id: ',variant[0]?.id)
  }

  return (

    <>
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          {/* Display fetched images */}
          {fetchedImages.map((val) => (
            <>
              {val.map((item) => (
                <div key={item.id}>
                  <img
                    src={'https://mohitto25.pythonanywhere.com' + item.imageUrl}
                    style={{ maxWidth: '200px', height: '200px' }}
                    alt={`Image ${item.id}`}
                  />
                  <br />
                </div>
              ))}
            </>
          ))}
        </div>
        <div class="col-sm-4">
          Product Id: {product_id}
          <br />
          available colors
          <br />


            <div>
              {fetchedColor.map((colorItem, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name="color" 
                      value={colorItem.id}
                      onChange={(e) => setColorId(e.target.value)}

                      onClick={() => {handleColor(colorItem.id);handleSize(sizeId)}}

                    />
                    {colorItem.color}
                  </label>
                </div>
              ))}
            </div>

          available sizes
          <br />
          {fetchedSize.map((val) => (
            <div key={val.id}>
            <label>
              <input
                type="radio"
                name="size" // Make sure each radio button within the group has the same 'name'
                value={val.id}

                //onClick={() => handleSize(val.id)}
                onChange={(e) => {setSizeId(e.target.value);handleSize(sizeId)}} // Handle the color selection event
              />
              {val.size}
            </label>
          </div>
          ))}
         
        </div>
      </div>
    </div>
  </>
  
  )
}

export default ExpandProduct
