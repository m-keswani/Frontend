import "./App.css";
/*import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import silder from "./Components/slider";
import ProductDisplay  from "./Components/ProductDisplay";
import EmailForm from "./Components/Email";
*/
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component }  from 'react';
import Form from "./TempComponent/Form";
import Main from "./TempComponent/Main";
import Head from "./TempComponent/Head";
import Form2 from "./TempComponent/Form2";
import Cart from "./TempComponent/Cart";
import Address from "./TempComponent/Address";
import Navbar from "./navbar/Navbar";
import ProductDisplay from "./Components/ProductDisplay";
import ShowProduct from "./DisplayProduct/ShowProduct";
import ForgotPassword from "./UserLogin/ForgotPassword";
import SignUp from "./UserLogin/SignUp"

function App() {
  return (
    <div >
      <Router>
    
    
    <Routes>
      
      <Route exact path="/" element={<SignUp/>} />
      
      
      
    </Routes>
  </Router>
    
    </div>
  );
}

export default App;

/**
 * 
 *  <EmailForm/>
 * <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
  <ProductDisplay/>   
  <Router>
    
      <Head/>
      <Routes>
        
        <Route exact path="/" element={<Main/>} />
        
        <Route path="/login" element={<Form/>} />
        <Route path="/Signin" element={<Form2/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/address" element={<Address/>} />
        
      </Routes>
    </Router>
 */