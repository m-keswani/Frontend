import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Product.css";

const EditProduct = () => {
  const [fetchedProductData, setFetchedProductData] = useState([]);
  const navigate = useNavigate();
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [fetchedSubCategory, setFetchedSubCategory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData,setFilteredData] = useState([])
  const [dupFetchedProducts,setDupFetchedProducts] = useState('')

  useEffect(() => {
    fetchProduct();
    getCategory();
    getSubCategory();
  }, []);  

  const fetchProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/adminsite/productdetails');
      const responseData = await response.json();
      setFetchedProductData(responseData);
      setDupFetchedProducts(responseData);
    } catch (error) {
      console.log("Error fetching product data");
    }
  }
  const getCategory = async () => {
    try {
      const response = await fetch("http://localhost:8000/adminsite/categorymaster/");
      const responseData = await response.json();
      setFetchedCategory(responseData);
    } catch (error) {
      console.log("Error in fetching category");
    }
  }

  const getSubCategory = async () => {
    try {
      const response = await fetch("http://localhost:8000/adminsite/getsubcategory");
      const responseData = await response.json();
      setFetchedSubCategory(responseData);
    } catch (error) {
      console.log("Error in fetching Subcategory");
    }
  }

  const expand = (value) => {
    navigate(`/productvariant?value=${value}`);
  }

  const getCategoryName = (categoryId) => {
    const category = fetchedCategory.find((category) => category.id === categoryId);
    return category ? category.categoryName : '';
  }

  const getSubCategoryName = (subCategoryId) => {
    const subcategory = fetchedSubCategory.find((subcategory) => subcategory.id === subCategoryId);
    return subcategory ? subcategory.subCategoryName : '';
  }

  const toggleAllCheckboxes = () => {
    if (selectedItems.length === fetchedProductData.length) {
     
      setSelectedItems([]);
    } else {
      setSelectedItems(fetchedProductData.map((val) => val.id));
    }
  }

  const toggleCheckbox = (itemId) => {
    if (selectedItems.includes(itemId)) {
     
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      
      setSelectedItems([...selectedItems, itemId]);
    }
  }

  const handleRemove = async() => {
    
    setShowDeleteDialog(false);
    selectedItems.map(async (val)=>{
    await fetch('http://localhost:8000/adminsite/productdelete/' + val.toString(),{method:"DELETE"})
    fetchProduct()
    })
    
  }
  const filteredProducts = fetchedProductData.filter((product) =>
  product.name.toLowerCase().includes(searchInput.toLowerCase()),console.log(searchInput)
  
  );

  console.log("FilteredData",filteredData)
  
  return (
    <div>
      
      <div className="button-bar">
        {selectedItems.length > 0 ?<button onClick={() => setShowDeleteDialog(true) }>Remove</button>:''}
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products"
          
          onChange={(e) => {setSearchInput(e.target.value);setFetchedProductData(e.target.value !== '' ? filteredProducts: dupFetchedProducts)}}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={toggleAllCheckboxes} checked={selectedItems.length === fetchedProductData.length} />
            </th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Gender</th>
            <th>Category Name</th>
            <th>Sub Category Name</th>
            <th>Added On (In UTC)</th>
          </tr>
        </thead>
        <tbody>
          {fetchedProductData.map((val, key) => (
            <tr key={key} onClick={() => expand(val.id)} className={selectedItems.includes(val.id) ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleCheckbox(val.id)}
                  checked={selectedItems.includes(val.id)}
                  onClick={(e) => e.stopPropagation()} // Prevent row click event propagation when clicking the checkbox
                />
              </td>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.description}</td>
              <td>{val.gender}</td>
              <td>{getCategoryName(val.categoryId)}</td>
              <td>{getSubCategoryName(val.subCategoryId)}</td>
              <td>{val.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteDialog && (
        <div className="delete-dialog">
          <p>Are you sure you want to delete the selected items?</p>
          <button onClick={handleRemove}>Yes</button>
          <button onClick={() => setShowDeleteDialog(false)}>No</button>
        </div>
      )}
    </div>
  )
}

export default EditProduct;
