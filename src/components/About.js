import React from 'react'

import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram ,  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaSearch, FaUsers } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Framee from "../Assets/Framee.jpg"
import Nav from './Nav';
import "../App.css"

export default function About() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <div id="home" className='min-h-screen ' style={{ fontFamily: 'roboto' }}>
<Nav />
<div className='flex justify-between gap-3'>
<div className='md:w-1/2 lg:w-1/4 mr-8 mb-6 md:mb-0'>
          <img src={Framee} alt="logo" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div class="max-w-2xl px-4 py-8">
    <p class="text-3xl text-greem-600 font-bold">About us</p>
    <p class="text-3xl text-black font-bold">Your Abstinence Journey, </p>
    <p class="text-3xl text-black font-bold">Our Shared Victory</p>
    
    <p class="mt-4 text-lg text-black pt-9">Welcome to Safeguard, your dedicated companion on the journey to sobriety. Here, we provide support, resources, and a caring community to empower you in your pursuit of a healthier, happier life. You're not alone—let's navigate this path together. Start your journey with Safeguard today</p>
    <div className=' mx-auto'>
    <button className='bg-green-600 text-white px-2 py-2 rounded-md'>Learn More</button>
    </div>
   
</div>
</div>
<footer className='grid grid-cols-3 gap-3 bg-black text-white mt-9'>
  <div className="col-span-1 ml-9">
    <p className="hover:bg-green-800 hover:text-white font-bold font-Robotto">
      <span className="text-white text-2xl">SAFE</span><span className='text-green-500 text-2xl'>GUARD</span>
    </p>
  </div>

  <div className="col-span-1">
    <ul className='capitalize text-[18px]  bg-black text-white'>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('home')}>Home</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('educational-modules')}>Educational Modules</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('program-services')}>Program & Services</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('aboutus')}>About Us</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('getus')}><FaSearch className="fill-current w-4 h-4 text-black" /></li>
    </ul>
  </div>

  <div className="col-span-1">
    <ul className='capitalize text-[18px]  bg-black text-white'>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('home')}>Home</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('educational-modules')}>Educational Modules</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('program-services')}>Program & Services</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('aboutus')}>About Us</li>
      <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => handleScrollTo('getus')}><FaSearch className="fill-current w-4 h-4 text-black" /></li>
    </ul>
  </div>
</footer>

        
    </div>
    
  )
}
