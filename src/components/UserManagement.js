import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    nID: '',
    email: '',
    role: 'PATIENT',
    
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      nID: user.nID,
      email: user.email,
      role: user.role,
      
    });
    setModalIsOpen(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      await axios.delete(`http://localhost:5000/api/user/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      if (editingUser) {
        await axios.post(`http://localhost:5000/api/user/update`, formData, {
          headers: {
            'Content-Type': 'application/json',
          Authorization: token,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/user/save', formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
      }
      setModalIsOpen(false);
      setFormData({ firstname: '', lastname: '', nID: '', email: '', role: 'PATIENT' });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add User
      </button>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <li key={user._id} className="bg-gray-200 p-4 rounded-lg">
            <p className="font-bold">{user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="User Modal"
      >
        <h2 className="text-2xl font-bold mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="font-bold">First Name</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="font-bold">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nID" className="font-bold">National ID</label>
            <input type="text" id="nID" name="nID" value={formData.nID} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role" className="font-bold">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mt-1">
              <option value="DOCTOR">Doctor</option>
              <option value="HOSPITAL">Hospital</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
              <option value="PATIENT">Patient</option>
            </select>
          </div>
        
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              {editingUser ? 'Save Changes' : 'Add User'}
            </button>
            <button type="button" onClick={() => setModalIsOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
