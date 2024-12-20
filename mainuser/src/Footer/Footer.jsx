import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaEnvelope, FaPhone } from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='main'>
    <footer className="footer bg-dark position-static text-white p-4 mt-5">
      <Container className=''>
        <Row>
          <Col sm={12} md={4} className="mb-4">
            <h4>Contact Us</h4>
            <p>
              <FaEnvelope/> support@xyz.com
            </p>
            <p>
              <FaPhone />+123-456-7890
            </p>
          </Col>
          <Col sm={12} md={4} className="mb-4">
          


            <h4>Quick Links</h4>
            <ul>
              <li><a className='link-secondary' href="/">Home</a></li>
              <li><a className='link-secondary' href="/products">Products</a></li>
              <li><a className='link-secondary' href="/about">About Us</a></li>
              <li><a className='link-secondary' href="/contact">Contact Us</a></li>
            </ul>
          </Col>
          <Col sm={12} md={4}>
          <h4>Follow Us</h4>
            <div className="social-icons p-2">
              <a href="https://facebook.com"> 
                <FaFacebook className='link-secondary pr-2' size={40} style={{paddingBottom: '10px' }} />
              </a>
              <a href="https://twitter.com">
                <FaTwitter className='link-secondary pr-2' size={40} style={{paddingBottom: '10px' }} />
              </a>
              <a href="https://instagram.com">
                <FaInstagram className='link-secondary pr-2' size={40} style={{paddingBottom: '10px' }} />
              </a>
              
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center small">
              &copy; {new Date().getFullYear()} Your E-commerce Store
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
};

export default Footer;
