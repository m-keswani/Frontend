import React, { useEffect, useState } from 'react';
import Header from './Header.css';
import logo from "./logo-white2.png";
import { BsCart3, BsPerson, BsFillSuitHeartFill, BsSearch } from 'react-icons/bs';
import {FaShoppingBag} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MainHead = () => {
  return (
    <div className='row'>
      <div className='col-12 bg-secondary'>
        <div className='textbold'>
            <p className='text-center text-white ml-3'>✨EXTRA 20% OFF ON EVERYTHING*✨<br/>
                UMA BIG LEAP SALE.</p>
                </div>
      </div>
    </div>
  );

  }
export default MainHead;
