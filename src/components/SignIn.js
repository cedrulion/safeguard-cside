import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Framee from '../Assets/safeguard1.PNG';
import AuthFooter from './authFooter';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);

      if (response.status === 200) {
        const { token, user,loggedInUser } = response.data;
        console.log(response.data);
        localStorage.setItem('token', token);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
        localStorage.setItem("USER", JSON.stringify(user))
        // Display success toast
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center'>
        <div className='md:w-1/2  lg:w-1/3 mr-8 mb-6 md:mb-0'>
          <img src={Framee} alt="logo" className="w-full h-1/2 object-cover " />
        </div>
        <div className='md:w-1/2 lg:w-2/3'>
          <div className='bg-white p-8 rounded-t-xl shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                  className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                  required
                />
              </div>
              <div>
                <button
                  type='submit'
                  className={`w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </form>
            <div className='mt-4 text-sm text-gray-600'>
              <p>Don't have an account? <Link to='/signup' className='text-green-600 hover:underline'>Sign up here</Link></p>
              <p>Activate account <Link to='/activate' className='text-green-600 hover:underline'>Activate</Link></p>
            </div>
          </div>
          <div className='bg-green-600 rounded-b-xl' style={{ width: "100%" }}>
              <div className='flex justify-center '>
                <span className="text-black text-2xl ">SAFE</span><span className="text-white text-2xl">GUARD</span>
              </div>
            </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={6000} />
      <div className='mt-5' style={{ marginLeft: "280px" }}>
          <AuthFooter />
        </div>
    </div>
  );
};

export default Signin;
