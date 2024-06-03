import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');  // Set the root element for accessibility

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [showFirstSet, setShowFirstSet] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem('token');  // Remove the token
    navigate('/signin');  // Navigate to the signin page
    toast.success('You have successfully logged out.');
  };

  const renderMenuItems = () => {
    if (showFirstSet) {
      return (
        <>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/definition"
              onClick={() => handleItemClick('/dashboard/definition')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">DEFINITION</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/requests"
              onClick={() => handleItemClick('/dashboard/requests')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">FACTS</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/game"
              onClick={() => handleItemClick('/dashboard/game')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">GAME</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/therapy"
              onClick={() => handleItemClick('/dashboard/therapy')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">THERAPY</span>
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/browse"
              onClick={() => handleItemClick('/dashboard/browse')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">BROWSE</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/centers"
              onClick={() => handleItemClick('/dashboard/centers')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">CENTERS</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/emergency"
              onClick={() => handleItemClick('/dashboard/emergency')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">EMERGENCY</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-green-800 hover:text-white">
            <Link
              to="/dashboard/question"
              onClick={() => handleItemClick('/dashboard/question')}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">QUESTION</span>
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Logout Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
          },
        }}
      >
        <div className="p-4">
          <h2>Are you sure you want to logout?</h2>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-gray-300 p-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="bg-red-500 text-white p-2 rounded" onClick={confirmLogout}>Yes</button>
          </div>
        </div>
      </Modal>
      <div className="fixed top-0 bottom-0 left-0 w-37 bg-green-600 text-white text-center font-poppins p-12">
        <div>
          <p className="hover:bg-green-800 hover:text-white font-bold">
            <span className="text-black text-2xl">SAFE</span><span className='text-white text-2xl'>GUARD</span>
          </p>
          <ul className="font-bold space-y-1 pt-32 flex justify-center items-center flex-col">{renderMenuItems()}</ul>
        </div>
        <div className="pt-32 right-0 flex justify-center space-x-2">
          {showFirstSet ? (
            <button
              className="text-black text-2xl bg-green-500 rounded-lg p-2"
              onClick={() => setShowFirstSet(false)}
            >
              Next
            </button>
          ) : (
            <button
              className="text-black text-2xl bg-green-500 rounded-lg p-2"
              onClick={() => setShowFirstSet(true)}
            >
              Back
            </button>
          )}
          <button
            className="text-black text-2xl bg-red-500 rounded-lg p-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
