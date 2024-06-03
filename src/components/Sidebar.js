import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, faListAlt, faGamepad, faHeart, faSearch, 
  faBuilding, faExclamationTriangle, faQuestionCircle, 
  faSignOutAlt, faArrowRight, faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [showFirstSet, setShowFirstSet] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(''); // Example: This should be fetched from user data

 useEffect(() => {
  fetchUserData();
}, []);

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const response = await axios.get('http://localhost:5000/api/user/getusers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    // Assuming the response contains the user data
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const user = response.data.find(user => user.email === loggedInUser.email); // Adjust this to match your logic for finding the current user
    if (user) {
      setRole(user.role);
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

  const handleItemClick = (path) => {
    navigate(path);
    
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem('token'); // Remove the token
    navigate('/signin'); // Navigate to the signin page
    toast.success('You have successfully logged out.');
  };

  const renderMenuItems = () => {
    const menuItems = {
      DOCTOR: [
   
        { path: '/dashboard/alist', icon: faHeart, label: 'APPOINTMENTS' },
       { path: '/dashboard/dolist', icon: faHeart, label: 'QUESTIONS LIST' }
      ],
      TEACHER: [
        { path: '/dashboard/browse', icon: faSearch, label: 'BROWSE' },
        { path: '/dashboard/question', icon: faQuestionCircle, label: 'THERAPY' },
        { path: '/dashboard/response', icon: faQuestionCircle, label: 'RESPONSE' },
{ path: '/dashboard/emergency', icon: faExclamationTriangle, label: 'EMERGENCY' }
      ],
      ADMIN: [
       
        { path: '/dashboard/usrman', icon: faQuestionCircle, label: 'MANAGE USERS' }
      ],
      PATIENT: [
{ path: '/dashboard/definition', icon: faBook, label: 'DEFINITION' },
        { path: '/dashboard/game', icon: faGamepad, label: 'GAME' },
        { path: '/dashboard/therapy', icon: faHeart, label: 'THERAPY' },
        { path: '/dashboard/browse', icon: faSearch, label: 'BROWSE' },
 { path: '/dashboard/centers', icon: faBuilding, label: 'CENTERS' },
{ path: '/dashboard/emergency', icon: faExclamationTriangle, label: 'EMERGENCY' }
      ]
    };

    return (menuItems[role] || []).map(item => (
      <li key={item.path} className="p-3 hover:bg-green-800 hover:text-white">
        <Link to={item.path} onClick={() => handleItemClick(item.path)} className="flex items-center space-x-2">
          <FontAwesomeIcon icon={item.icon} />
          <span className="text-lg">{item.label}</span>
        </Link>
      </li>
    ));
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
      <div className="fixed top-0 bottom-0 left-0 w-37 bg-green-600 text-white text-center font-poppins p-5">
        <div className="pb-6">
          <p className="hover:bg-green-800 hover:text-white font-bold">
            <span className="text-black text-2xl">SAFE</span><span className="text-white text-2xl">GUARD</span>
          </p>
          <ul className="font-bold space-y-1 pt-20  flex justify-center items-center flex-col">
            {renderMenuItems()}
          </ul>
        </div>
        
      </div>
    </>
  );
};

export default Sidebar;
