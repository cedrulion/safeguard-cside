import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faListAlt, faGamepad, faHeart, faSearch,
  faBuilding, faExclamationTriangle, faQuestionCircle,
  faSignOutAlt, faArrowRight, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('')
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setRole(loggedInUser.role);
    if(loggedInUser.role==="DOCTOR"){
      navigate("/dashboard/alist")
      setActiveItem("/dashboard/alist")
    }
    else if(loggedInUser.role==="PATIENT"){
      navigate("/dashboard/definition")
      setActiveItem("/dashboard/definition")
    }
    else if(loggedInUser.role==="TEACHER"){
      navigate("/dashboard/browse")
      setActiveItem("/dashboard/browse")
    }
    else{
      navigate("/dashboard/usrman")
      setActiveItem("/dashboard/usrman")
    }
  }, []);

  const handleItemClick = (path) => {
    setActiveItem(path)
    navigate(path);
  };

  const renderMenuItems = () => {
    const menuItems = {
      DOCTOR: [
        { path: '/dashboard/doctor/stats', icon: "fa-home", label: 'DASHBOARD' },
        { path: '/dashboard/alist', icon: "fa-calendar-check", label: 'APPOINTMENTS' },
        { path: '/dashboard/dolist', icon: "fa-list", label: 'QUESTIONS LIST' },
        { path: '/dashboard/doctor/questionlist', icon: "fa-bars-progress", label: 'ANSWERED QUESTIONS' }
      ],
      TEACHER: [
        { path: '/dashboard/teacher/stats', icon: "fa-home", label: 'DASHBOARD' },
        { path: '/dashboard/browse', icon: "fa-search", label: 'BROWSE' },
        { path: '/dashboard/question', icon: "fa-notes-medical", label: 'THERAPY' },
        { path: '/dashboard/response', icon: "fa-question-circle", label: 'RESPONSE' },
        { path: '/dashboard/emergency', icon: "fa-exclamation-triangle", label: 'EMERGENCY' },
      ],
      ADMIN: [

        { path: '/dashboard/admin/stats', icon: "fa-home", label: 'DASHBOARD' },
        { path: '/dashboard/usrman', icon: "fa-people-roof", label: 'MANAGE USERS' },
        { path: '/dashboard/admin/patient', icon: "fa-notes-medical", label: 'PATIENTS DETAILS' },
        { path: '/dashboard/admin/inquiries', icon: "fa-bars-progress", label: 'INQUIRIES SENT' }
      ],
      PATIENT: [
        { path: '/dashboard/definition', icon: "fa-desktop", label: 'DEFINITION' },
        { path: '/dashboard/game', icon: "fa-gamepad", label: 'GAME' },
        { path: '/dashboard/appointment', icon: "fa-gamepad", label: 'APPOINTMENT' },
        // { path: '/dashboard/therapy', icon: "fa-hospital", label: 'THERAPY' },
        // { path: '/dashboard/browse', icon: "fa-book", label: 'BROWSE' },
        // { path: '/dashboard/centers', icon: "fa-building", label: 'CENTERS' },
        { path: '/dashboard/emergency', icon: "fa-exclamation-triangle", label: 'EMERGENCY' }
      ]
    };

    return (menuItems[role] || []).map(item => (
      <li key={item.path} className="p-4 hover:bg-green-800 hover:text-white" style={{backgroundColor: activeItem === item.path ? "black" : "",width:"100%",fontFamily:"roboto",borderLeft: activeItem === item.path?"4px solid #3b82f6":""}} >
        <Link to={item.path} onClick={() => handleItemClick(item.path)} className="flex items-start space-x-2">
        <i className={`fa-solid ${item.icon} mt-1`}></i>
          <span className="text-lg">{item.label}</span>
        </Link>
      </li>
    ));
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 w-37 bg-green-600 text-white text-center font-poppins" style={{width:"255px"}}>
        <div className="pb-6">
          <p className="hover:bg-green-800 hover:text-white font-bold p-5">
            <span className="text-black text-2xl">SAFE</span><span className="text-white text-4xl">GUARD</span>
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
