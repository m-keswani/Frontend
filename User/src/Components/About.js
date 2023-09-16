import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slideshow.css';
import nike1 from "../Assets/nike1.jpg";
import nike2 from "../Assets/nike2.jpg";
import nike3 from "../Assets/nike3.jpg";
import { useState, useEffect } from 'react';
import DataItem from './DataItem';
//hello world
function getToken(name) {
  let cookieval = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieval = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieval;
}
/*const products = [
  
  {
    id: 1,
    name: 'Nike Air Max 1',
    description: 'The classic Nike Air Max 1 with revolutionary cushioning.',
    image: nike1,
    buyUrl: 'https://example.com/product1',
  },
  {
    id: 2,
    name: 'Nike Free RN',
    description: 'Experience the freedom of natural motion with Nike Free RN.',
    image: nike2,
    buyUrl: 'https://example.com/product2',
  },
  {
    id: 3,
    name: 'fly with nike',
    description: 'run your life with nike.',
    image: nike3,
    buyUrl: 'https://example.com/product2',
  },


];*/

const Api = () => {

}

const About = () => {

  const [data, setData] = useState('')
  const arr = []
  for (let i = 0; i < data.length; i++) {
    arr[i] = Object.values(data.length > 0 ? data[i] : null);
  }
  console.log("New Aray :: ", arr[0])
  const products = [
    {
      //id:
    }
  ]
  useEffect(() => {
    const response = fetch('http://localhost:8000/api/listedproduct/', { headers: { 'X-CSRFToken': getToken('csrftoken') } }, Credential = "include")  // Replace with your Django API endpoint
      // console.log("Response :: ",response)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
    console.log("In function")

  }, []);

  arr.map((val) => {
    val.map((val1) => {
      console.log(val1)
    })
    console.log(val[0])
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>

          {arr.map((product) => (

            <div key={product[0]} className="slide">
              <div className="slide-content">
                <img src={"http://127.0.0.1:8000/"+product[3]} alt={product[1]} />
                <h3>{product[1]}</h3>
                <p>{product[2]}</p>

                <a href={product.buyUrl} className="buy-button">
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </>
  );
};

export default About;


