import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Framee from '../Assets/safeguard1.PNG';
import axios from 'axios';
import AuthFooter from './authFooter';
import "../App.css"

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    nID: "",
    email: "",
    password: "",
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', data);

      if (response.status === 200) {
        console.log(response.data); // Handle success response
        setLoading(false);
        navigate('/signin'); // Navigate to login page after successful signup
      } else {
        setError(response.data.message || 'Signup failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100' style={{ fontFamily: 'roboto' }}>
        <div className='max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center'>
          <div className='w-full mr-8 mb-6 md:mb-0'>
            <img src={Framee} alt="logo" className="w-full h- object-cover " />
          </div>
          <div className='w-full' style={{ width: "2500px" }}>
            <div className='bg-white p-6 rounded-t-xl shadow-md'>
              <h2 className='text-lg font-semibold mb-2'>Sign Up</h2>
              {error && <div className='text-red-500 mb-2'>{error}</div>}
              <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8'>
                <div>
                  <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>First name</label>
                  <input type='text' value={data.firstname} onChange={(e)=>setData({...data,firstname:e.target.value})} id='firstname' name='firstname' placeholder='First name' className='input-style' />
                </div>
                <div>
                  <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>Last name</label>
                  <input type='text' id='lastname' value={data.lastname} onChange={(e)=>setData({...data,lastname:e.target.value})} name='lastname' placeholder='Last name' className='input-style' />
                </div>
                <div>
                  <label htmlFor='nID' className='block text-sm font-medium text-gray-700'>National Id</label>
                  <input type='text' value={data.nID} onChange={(e)=>setData({...data,nID:e.target.value})} id='nID' name='nID' placeholder='National Id' className='input-style' />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
                  <input type='email' id='email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} name='email' placeholder='Email address' className='input-style' />
                </div>
                <div>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                  <input type='password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} id='password' name='password' placeholder='Password' className='input-style' />
                </div>
              </form>
              <div>
                <button type='submit' disabled={loading} onClick={(e) => handleSubmit(e)} className='btn-style mt-5'>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              <div className='mt-2 text-sm text-gray-600'>
                <p>Already have an account? <Link to='/signin' className='text-green-600 hover:underline'>Log in here</Link></p>
              </div>
            </div>
            <div className='bg-green-600 rounded-b-xl' style={{ width: "100%" }}>
              <div className='flex justify-center '>
                <span className="text-black text-2xl ">SAFE</span><span className="text-white text-2xl">GUARD</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5' style={{ marginLeft: "140px" }}>
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default Signup;
