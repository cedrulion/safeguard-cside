import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
  };

  const renderMenuItems = () => (
    <>
        
      <li className="p-3 hover:hover:bg-green-800 hover:text-white ">
        <Link
          to="/dashboard/profile"
          onClick={() => handleItemClick('/dashboard/profile')}
          className="flex items-center space-x-2"
        >
         
          <span className="text-lg">DEFINITION</span>
        </Link>
      </li>
      <li className="p-3 hover:hover:bg-green-800 hover:text-white">
        <Link
          to="/dashboard/requests"
          onClick={() => handleItemClick('/dashboard/requests')}
          className="flex items-center space-x-2"
        >
         
          <span className="text-lg">FACTS</span>
        </Link>
      </li>
      <li className="p-3 hover:bg-hover:bg-green-800 hover:text-white">
        <Link
          to="/dashboard/chat"
          onClick={() => handleItemClick('/dashboard/chat')}
          className="flex items-center space-x-2"
        >
          
          <span className="text-lg">GAME</span>
        </Link>
      </li>
      <li className="p-3 hover:bg-green-800 hover:text-white">
        <Link
          to="/dashboard/usrman"
          onClick={() => handleItemClick('/dashboard/usrman')}
          className="flex items-center space-x-2"
        >
          <span className="text-lg">THOUGHT OF THE DAY</span>
        </Link>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 bottom-0 left-0 w-37 bg-green-600 text-white text-center font-serif">
      <div className="">
      <p className=" hover:hover:bg-green-800 hover:text-white font-bold font-Robotto">
          <span className=" text-black  text-2xl">SAFE</span><span className=' text-white  text-2xl'>GUARD</span>
        
      </p>
        <ul className="font-bold font-Robotto space-y-1 pt-32 flex justify-center items-center flex-col">{renderMenuItems()}</ul>
      </div>
      <p className="pt-32  ml-36 fixed bottom-0 hover:hover:bg-green-800 hover:text-white font-bold font-Roboto">
          <span className=" text-black  text-2xl bg-green-500 rounded-lg">Back</span>
        
      </p>
    </div>
  );
};

export default Sidebar;
