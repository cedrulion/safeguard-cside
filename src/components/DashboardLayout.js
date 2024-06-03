import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaUser, FaSignOutAlt, FaSortDown, FaSearch } from 'react-icons/fa';
import Footer from './Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage on logout
    navigate('/signin'); // Redirect to signin page
  };

  return (
    <div className="flex h-screen ">
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}

      <div className={`flex-grow ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="fixed top-0 ">
          <button className="text-black focus:outline-none text-2xl" onClick={toggleSidebar}>
            <FaBars  />
          </button>
        </div>
        <div className="flex justify-center bg-transparent pt-3">
          <div className='flex gap-4 rounded-lg'>
            <FaSearch className="fill-current w-4 h-4 m-3" />
            <input type="text" placeholder='      Search here ...' className=' bg-gray-300  text-gray-600 rounded-lg font-bold' />
            </div>
          </div>
        <div className='font-poppins'>
          <Outlet/>
          </div>
          
      </div>
      
  
    </div>
  );
};

export default DashboardLayout;
