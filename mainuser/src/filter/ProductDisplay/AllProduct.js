import React, { useState } from 'react';
import './AllProduct.css';
import { BsCart3, BsFillHeartFill } from 'react-icons/bs';
import { MdZoomOutMap } from 'react-icons/md';
import Sidebar from "../FliterSidebar/Sidebar"
import A1 from "./image/a1.jpg";
import A2 from "./image/a2.jpg";
import A3 from "./image/a3.jpg";

const AllProduct = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  const [minPrice, maxPrice] = selectedPriceRange;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const products = [
    {
      id: 1,
      title: 'Product Title 1',
      oldPrice: '$79.99',
      price: '$49.99',
      discount: '15% off',
      isNew: false,
      size: 'small',
      gender: 'male',
      color: 'red',
    },
    {
      id: 2,
      title: 'Product Title 2',
      price: '$49.99',
      isNew: true,
      size: 'medium',
      gender: 'female',
      color: 'blue',
    },
  ];

  const handleMinPriceChange = (event) => {
    const newMinPrice = parseFloat(event.target.value);
    setSelectedPriceRange([newMinPrice, maxPrice]);
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = parseFloat(event.target.value);
    setSelectedPriceRange([minPrice, newMaxPrice]);
  };

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.price.replace('$', ''));
    const sizeMatch = !selectedSize || product.size === selectedSize;
    const genderMatch = !selectedGender || product.gender === selectedGender;
    const colorMatch = !selectedColor || product.color === selectedColor;

    return sizeMatch && genderMatch && colorMatch && productPrice >= minPrice && productPrice <= maxPrice;
  });

  return (
    <section className="section-products">
      <div className="container">
        <div className="row">
            
          <div className="col-md-5  pr-5">
            <div className="filter-panel">
              <h4>Filter By Price Range</h4>
              <div className="mb-3">
                <label htmlFor="minPrice" className="form-label">Min Price</label>
                <input
                  type="range"
                  className="form-range "
                  id="minPrice"
                  min={0}
                  max={100}
                  step={5}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="maxPrice" className="form-label">Max Price</label>
                <input
                  type="range"
                  className="form-range"
                  id="maxPrice"
                  min={0}
                  max={100}
                  step={5}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </div>
              <div className="selected-range-label text-center mb-4">
                Price Range: ${minPrice} - ${maxPrice}
              </div>
              
              <h4 className='filter-panel'>Filter By Size</h4>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <h4 className='filter-panel'>Filter By Gender</h4>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <h4 className='filter-panel'>Filter By Color</h4>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">All Colors</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="header">
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
            </div>
            <div className="row">
            <Sidebar/> 
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-12 mb-4"
                >
                  <div
                    id={`product-${product.id}`}
                    className={`single-product ${product.isNew ? 'new' : ''}`}
                  >
                    <div className="part-1">
                      <img
                        src={A1}
                        alt={product.title}
                        className="img-fluid"
                      />
                      <ul className="product-icons">
                        <li>
                          <a href="#"><BsCart3 /></a>
                        </li>
                        <li>
                          <a href="#"><BsFillHeartFill /></a>
                        </li>
                        <li>
                          <a href="#"><MdZoomOutMap /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="part-2">
                      <h3 className="product-title">{product.title}</h3>
                      {product.oldPrice && (
                        <h4 className="product-old-price">{product.oldPrice}</h4>
                      )}
                      <h4 className="product-price">{product.price}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
