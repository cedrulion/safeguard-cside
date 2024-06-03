import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Framee from '../Assets/Framee.jpg';
import axios from 'axios';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState('PATIENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      nID: e.target.nID.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);

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
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center'>
        <div className='w-1/2 mr-8 mb-6 md:mb-0'>
          <img src={Framee} alt="logo" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className='w-full'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-2'>Sign Up</h2>
            {error && <div className='text-red-500 mb-2'>{error}</div>}
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8'>
              <div>
                <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>First name</label>
                <input type='text' id='firstname' name='firstname' placeholder='First name' className='input-style' />
              </div>
              <div>
                <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>Last name</label>
                <input type='text' id='lastname' name='lastname' placeholder='Last name' className='input-style' />
              </div>
              <div>
                <label htmlFor='nID' className='block text-sm font-medium text-gray-700'>National Id</label>
                <input type='text' id='nID' name='nID' placeholder='National Id' className='input-style' />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
                <input type='email' id='email' name='email' placeholder='Email address' className='input-style' />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                <input type='password' id='password' name='password' placeholder='Password' className='input-style' />
              </div>
              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Select Role</label>
                <select
                  id='role'
                  name='role'
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className='input-style'
                >
                  <option value='PATIENT'>Patient</option>
                  <option value='DOCTOR'>Doctor</option>
                  <option value='HOSPITAL'>Hospital</option>
                  <option value='TEACHER'>Teacher</option>
                  <option value='ADMIN'>Admin</option>
                </select>
              </div>
              <div>
                <button type='submit' disabled={loading} className='btn-style'>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>
            <div className='mt-2 text-sm text-gray-600'>
              <p>Already have an account? <Link to='/signin' className='text-green-600 hover:underline'>Log in here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
