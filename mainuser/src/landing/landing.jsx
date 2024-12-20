import React from 'react';
import './landing.css';
import video from './blackshoes.mp4';
import Poster1 from './aesset/poster2.jpg';
import Poster2 from './aesset/poster1.jpg';
import Poster3 from './aesset/poster3.jpg';
import Men from './aesset/men.jpg';
import Women from './aesset/women.jpg';
import Kids from './aesset/kids.jpg';
import Felo from './aesset/Felo.jpg';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
const navigate = useNavigate()

const redirectTo =()=>{
  navigate("/allproduct")
}

const redirectToItem =()=>{
   navigate(`/expandproductdetail?productName=${"BlackShoe"}&id=${"49c08998-6b67-4600-b91d-a4df311cb8af"}`);
 
 }
  return (
    <div>
       
      <div className="part1" style={{paddingLeft: "50px",paddingRight: "50px"}}>
      
        <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Poster1} className="d-block w-100" alt="Image 1" onClick={redirectTo} />
            </div>
            <div className="carousel-item">
              <img src={Poster2} className="d-block w-100" alt="Image 2" onClick={redirectTo}/>
            </div>
            <div className="carousel-item">
              <img src={Poster3} className="d-block w-100" alt="Image 3" onClick={redirectTo}/>
            </div>
          </div>
          <a className="carousel-control-prev" href="#imageCarousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#imageCarousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
        <div className='' >
      <h2 className='text-center'><p className='fw-bold' style={{paddingTop: '100px',}}>Experience Cloud-Like Comfort with VaporMax 2023</p></h2>
      <p className='text-muted text-center 'style={{paddingBottom: '20px',}}>Walk on Air with VaporMax 2023</p>
      </div>
      </div>  
      <div className="part-2">
        <div className="">
          <div className="embed-responsive embed-responsive-16by9 w-100 position-relative">
            <video className="embed-responsive-item w-100 pl-3" autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>

            <div className="position-absolute bottom-0" style={{ padding: '2rem' }}>
              <h1 className="text-white fw-bold">Nike Air VaporMax 2023 Flyknit</h1>
              <h5 className="text-white">
              Step into Tomorrow with Nike Air VaporMax 2023
              </h5>
              <div className='pt-3 'style={{paddingLeft: '',paddingBottom: '60px',}}>
              <button className="btn btn-outline-light" onClick={redirectToItem}>Buy Now</button>
              </div>
              </div>
          </div>
        </div>
        <div className='part-3'>
        <div className='container'>
          <h2><p className='fw-bold' style={{paddingTop: '90px'}}> Who are you shopping for? </p></h2>
        </div>
        <div className='container pb-5' >
        <div>
            <img src={Women} alt="Women" className="category-image p-2" onClick={redirectTo}/>
            <div className='p-2'><h4 className='fw-bold'>Women</h4></div>
          </div>
          <div>
            <img src={Men} alt="Men" className="category-image p-2" onClick={redirectTo}/>
            <div className='p-2'><h4 className='fw-bold'>Men</h4></div>
          </div>
          
          <div className=''>
            <img src={Kids} alt="Kids" className="category-image p-2" onClick={redirectTo}/>
            <div className='p-2 '><h4 className='fw-bold'>Kids</h4></div>
          </div>
        </div>
      </div>

      </div>
      <div className='part4 pt-3'> 
      <div className='' >
      <h2 className='text-center'><p className='fw-bold' style={{paddingTop: '100px',}}>Unleash Your Potential</p></h2>
      <p className='text-muted text-center 'style={{paddingBottom: '20px',}}>Fuse 2.0: Elevate Your Training Experience.</p>
      </div>
      <div className='embed-responsive embed-responsive-16by9 w-100 position-relative'> 
      <img src={Felo} alt="Women" className="category-image p-2 " />
      <div className="position-absolute bottom-0" style={{ padding: '2rem' }}>
              <h1 className="text-white fw-bold">Fuse 2.0 Men's Training Shoes</h1>
              <h5 className="text-white">
              We worked with professional athletes to amplify three key training attributes—stability, fit, and traction. The FUSE 2.0 features
              </h5>
              <div className='pt-3 'style={{paddingLeft: '',paddingBottom: '30px',}}>
              <button className="btn btn-outline-light" onClick={redirectTo}>Buy Now</button>
              </div>
              </div>

      </div>
      <div className='p-5'>
      <h5 className="fw-bold">About Us</h5>
      <h6 className='text-muted'>Welcome to Useen Elegance! We're more than just a brand; we're a team of passionate individuals dedicated to providing you with the best in Products. Our mission is to revolutionize the way people approach fitness or offer stylish and sustainable fashion for all. We believe in core values such as quality, innovation, or customer satisfaction, and we're committed to delivering excellence in every product we create. Join us on this journey as we strive to To provide best quality and best product to you</h6>
    
      <h5 className="fw-bold pt-3">Our Team</h5>
      <h6 className='text-muted'>Our dedicated team at Useen Elegance is the backbone of our success. We bring together a diverse group of individuals, each contributing their unique expertise to make our brand stand out.</h6>
      
      </div>
      
      
      </div>
      

    </div>
  );
};

export default LandingPage;
