import React, { useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineHeart} from 'react-icons/ai';
const ProductDetail = () => {
  const product = {
    name: 'Product Name',
    description: 'Product Description',
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['Small', 'Medium', 'Large'],
    price: 567,
    images: [
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp',
    ],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const addToCart = () => {
    alert('Product added to cart!');
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-12">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img src={selectedImage} alt="Product" />
                    </div>
                  </div>
                  <ul className="preview-thumbnail nav nav-tabs">
                    {product.images.map((image, index) => (
                      <li
                        key={index}
                        className={selectedImage === image ? 'active' : ''}
                      >
                        <a
                          data-target={`#pic-${index + 1}`}
                          data-toggle="tab"
                          onClick={() => handleThumbnailClick(image)}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="detail-c">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className="mb-3">
              <h4>Color:</h4>
              <div className="btn-group" role="group" aria-label="Color">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-outline"
                    style={{
                      backgroundColor: selectedColor === color ? color : '',
                    }}
                    onClick={() => handleColorClick(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h4>Size:</h4>
              <div className="btn-group" role="group" aria-label="Size">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-outline-${
                      selectedSize === size ? 'dark' : 'darklight'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h4>Quantity:</h4>
              <div className="btn-group" role="group" aria-label="Quantity">
                <button
                  type="button"
                  className="btn btn-outline-hide"
                  onClick={decreaseQuantity}
                >
                  <FaMinus />
                </button>
                <span className="btn btn-light">{quantity}</span>
                <button
                  type="button"
                  className="btn btn-outline-hide"
                  onClick={increaseQuantity}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="mb-3">
            <button   type="submit"
                      className="btn btn-dark btn-lg rounded-pill "
                      style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }}>
                        
                        Add To Bag
              </button>
              <div className=''><br/></div>
              <button type="submit"
                      className="btn btn-dark btn-lg rounded-pill"
                      style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }}>
                        
                        Favourite <AiOutlineHeart/>
              </button>
            </div>
          </div>
         
        </div>
      </div>
        </div>
  );
};

export default ProductDetail;
