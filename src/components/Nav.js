import React from 'react'

import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram ,  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaSearch, FaUsers } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Frame from "../Assets/Frame.jpg"

export default function Nav() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <div id="home" className=''>
<div className='hidden sticky top-0 z-10 md:flex justify-between shadow-lg pt-3 m-5'>
  <div className='flex justify-between'>
  <p className="ml-9 hover:hover:bg-green-800 hover:text-white font-bold font-Robotto">
          <span className=" text-black  text-2xl">SAFE</span><span className=' text-green-500 text-2xl'>GUARD</span>
        
      </p>
  </div>
        <div className=''>
        <ul className='capitalize md:flex text-[18px] space-x-9 ml-24 pt-3'>
            <li className='  px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('home')}>Home</li>
            <li className='  px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('home')}>Educational Modules</li>
            <li className='  px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('home')}>Program & Services</li>
            <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('aboutus')}>About Us</li>
            <li className=' px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('getus')}><FaSearch className="fill-current w-4 h-4 text-black" /></li>
           
        </ul>
        </div>
        </div>

        
    </div>

    
      
    
  )
}
