import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Frame from "../Assets/Frame.jpg";

export default function Nav() {
  const navigate = useNavigate();

  const checkTokenAndNavigate = (path) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      toast.warn('Please sign in first.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="home" className=''>
        <div className='hidden sticky top-0 z-10 md:flex justify-between shadow-lg pt-3 m-5'>
          <div className='flex justify-between'>
            <p className="ml-9 hover:bg-green-800 hover:text-white font-bold font-Robotto">
              <span className="text-black text-2xl">SAFE</span>
              <span className='text-green-500 text-2xl'>GUARD</span>
            </p>
          </div>
          <div className=''>
            <ul className='capitalize md:flex text-[18px] space-x-9 ml-24 pt-3'>
              <li className='px-6 rounded-lg font-Ubuntu active'>
                <Link to="/">Home</Link>
              </li>
              <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => checkTokenAndNavigate('/educational-modules')}>
                Educational Modules
              </li>
              <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => checkTokenAndNavigate('/program-services')}>
                Program & Services
              </li>
              <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => checkTokenAndNavigate('/about')}>
                About Us
              </li>
              <li className='px-6 rounded-lg font-Ubuntu active' onClick={() => checkTokenAndNavigate('/search')}>
                <FaSearch className="fill-current w-4 h-4 text-black" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
