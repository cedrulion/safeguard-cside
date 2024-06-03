import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaUser, FaSignOutAlt, FaSortDown, FaSearch } from 'react-icons/fa';
import Footer from './Footer';
import HeaderNavbar from './header';

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
      <HeaderNavbar/>
        <div className='font-poppins'>
          <Outlet/>
          </div>
          
      </div>
      
  
    </div>
  );
};

export default DashboardLayout;
