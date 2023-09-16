import React from 'react'
import BannerImage from "../Assets/home-banner-image.png";

const slider = () => {
  return (
    <div className='slider-container'>
        <div> 
            <div className="home-image-section">
                <img src={BannerImage} alt="" />
            </div>          
        </div> 
      
    </div>
  )
}

export default slider
