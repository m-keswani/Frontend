import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {HiFilter} from 'react-icons/hi';

const Sidebar = ({ applyFilters }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleFilterClick = (filterType, option) => {
    switch (filterType) {
      case 'size':
        setSelectedSize(option);
        break;
      case 'gender':
        setSelectedGender(option);
        break;
      case 'color':
        setSelectedColor(option);
        break;
      default:
        break;
    }

    applyFilters({ size: selectedSize, gender: selectedGender, color: selectedColor, priceRange });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    applyFilters({ size: selectedSize, gender: selectedGender, color: selectedColor, priceRange: value });
  };

  return (
    <div className="container-fluid">
      <button
        className="btn btn-dark d-md-none mb-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
      >
        <HiFilter/>Filter
      </button>
      <div className="row">
        <nav
          id="sidebar"
          className="col-md-3 col-lg-2 d-md-block bg-light offcanvas"
        >
          <div className="position-sticky">
            <h4 className="py-3"><HiFilter />Filter</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
              <h5>Price Range</h5>
            <Slider
              range
              min={0}
              max={100}
              value={priceRange}
              onChange={handlePriceChange}
            />
                <h5>Size</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('size', 'Small')}
                    >
                      Small
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('size', 'Medium')}
                    >
                      Medium
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('size', 'Large')}
                    >
                      Large
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('size', 'XL')}
                    >
                      XL
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <h5>Gender</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('gender', 'Male')}
                    >
                      Male
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('gender', 'Female')}
                    >
                      Female
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <h5>Color</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('color', 'Red')}
                    >
                      Red
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('color', 'Blue')}
                    >
                      Blue
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => handleFilterClick('color', 'Green')}
                    >
                      Green
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => handleFilterClick('color', 'Yellow')}
                    >
                      Yellow
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
