import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import "../App.css"

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


  const handleEdit = async (e) => {
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
    <div className="container mx-auto py-10" style={{ fontFamily: 'roboto' }}>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <li key={user._id} className="bg-gray-200 p-4 rounded-lg mx-3">
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
      <div>
        {modalIsOpen &&
          <EditUserModal
            modalIsOpen={modalIsOpen}
            toggleModal={() => setModalIsOpen(false)}
            data={formData}
            setData={setFormData}
            updateHandler={handleEdit}
          />
        }
      </div>
    </div>
  );
};

export default UserManagement;
