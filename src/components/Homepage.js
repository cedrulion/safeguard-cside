import React from 'react'

import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram ,  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaSearch, FaUsers } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Frame from "../Assets/Frame.jpg"
import Nav from './Nav';

export default function Homepage() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <div id="home" className='min-h-screen'>
<Nav />
        <div class="max-w-2xl px-4 py-8 ml-6">
    <p class="text-5xl text-black font-bold">Embrace </p>
    <p class="text-5xl text-black font-bold">the Clarity, </p>
    <p class="text-5xl text-black font-bold"> Live in</p>
    <h2 class="text-5xl font-bold text-green-600 ">Abstinence</h2>
    <p class="mt-4 text-lg text-black pt-9 font-Interi">Welcome to Safeguard, your dedicated companion on the journey to sobriety. Here, we provide support, resources, and a caring community to empower you in your pursuit of a healthier, happier life. You're not alone—let's navigate this path together. Start your journey with Safeguard today</p>
    <div className=' mx-auto'>
    <button className='bg-green-600 text-white px-4 py-3 font-bold'>ChatBox</button>
    </div>
   
</div>

        <div className=''>
        <img src={Frame} alt="logo" className="fixed top-0 right-0 h-screen" />
        </div>
    </div>
    
  )
}
