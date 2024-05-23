import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Forum from './Forum';
import Modal from './Modal';
import { FaArrowRight } from 'react-icons/fa';

function Uresource() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Webinar');
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [selectedResource, setSelectedResource] = useState(null); // New state for selected resource
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
      setUserId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [token, filterType]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await Axios.get('http://localhost:5000/api/resources', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching resources. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleLearnMore = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true); // Open the modal when learning more about a resource
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderResource = (resource) => {
    if (resource.type === 'Video') {
      return (
        <video controls width="400">
          <source src={`http://localhost:5000/uploads/1712824370722-843057638.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (resource.type === 'Article') {
      return (
        <a href={`http://localhost:5000${resource.articleUrl}`} target="_blank" rel="noopener noreferrer">
          View Article
        </a>
      );
    } else if (resource.type === 'Webinar') {
      return (
        <iframe title="Webinar" src={resource.webinarUrl} width="800" height="600"></iframe>
      );
    }
    return null;
  };

  return (
    <div>
      <Forum />
      <div className='min-h-screen bg-gradient-to-r from-slate-500 to-orange-200 shadow-lg'>
        <div className='container mx-auto py-8'>
          <p className='text-center text-xl m-9'>Explore the wealth of information, tools, and insights curated to enhance your skills, knowledge, and career development</p>
          <div className='flex justify-center gap-8 pt-6 text-2xl'>
            <h1 className='py-2 px-4 font-bold'>Content Types</h1>
            <button className={`bg-yellow-200 py-2 px-4 ${filterType === '' ? 'font-bold' : ''}`} onClick={() => setFilterType('')}>All</button>
            <button className={`bg-yellow-200 py-2 px-4 ${filterType === 'Webinar' ? 'font-bold' : ''}`} onClick={() => setFilterType('Webinar')}>Webinar</button>
            <button className={`bg-yellow-200 py-2 px-4 ${filterType === 'Video' ? 'font-bold' : ''}`} onClick={() => setFilterType('Video')}>Video</button>
            <button className={`bg-yellow-200 py-2 px-4 ${filterType === 'Module' ? 'font-bold' : ''}`} onClick={() => setFilterType('Module')}>Module</button>
            <button className={`bg-yellow-200 py-2 px-4 ${filterType === 'Article' ? 'font-bold' : ''}`} onClick={() => setFilterType('Article')}>Articles</button>
          </div>
          {loading && <p className='text-center mt-4'>Loading...</p>}
          {/* {error && <p className='text-center text-red-500 mt-4'>{error}</p>} */}

          <div className='mt-8'>
            <ul className='mt-4 grid grid-cols-3 gap-5'>
              {resources
                .filter(resource => filterType === '' || resource.type === filterType) // Filter based on selected filterType
                .map((resource) => (
                  <li key={resource._id} className='bg-gray-200 border border-gray-300 rounded-md p-4 mb-4 '>
                    <span className='bg-orange-300 text-red-800 rounded-lg p-1'>{resource.type}</span>
                    <p className='font-bold font-Interi pt-5 text-2xl'>{resource.title}</p>
                    <p>{resource.description}</p>
                    <button onClick={() => handleLearnMore(resource)} className='text-red-800 px-3 py-1 mt-2 rounded-md flex items-center'>
                    view More <FaArrowRight className='ml-1' />
                   </button>

                  </li>
                ))}
            </ul>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal} resource={selectedResource} />
        </div>
      </div>
    </div>
  );
}

export default Uresource;
