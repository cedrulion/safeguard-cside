import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Framee from '../Assets/Framee.jpg';
import "../App.css"

const Activation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [user, setUser] = useState(null);

  const handleEmailConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/checkemail", { email });
      const { confirm, user: userData, message } = response.data;

      if (confirm === true) {
        toast.success('Email confirmed successfully!');
        setUser(userData);
        setPassword("");
        setShowPasswordInput(true);
      } else if (confirm === false && message) {
        toast.warning('Account already activated');
      } else {
        toast.error('No record found!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/activatepassword", { id: user._id, password });
      toast.success('Password created successfully!');
      setShowPasswordInput(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to create password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center " style={{ fontFamily: 'roboto' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 lg:w-1/3 mr-8 mb-6 md:mb-0">
          <img src={Framee} alt="logo" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 lg:w-2/3">
          <div className="card shadow p-4 rounded">
            <h2 className="text-xl text-primary font-semibold mb-4">Activate Account</h2>
            <form onSubmit={handleEmailConfirm}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  Confirm Email
                </button>
              </div>
            </form>
            {showPasswordInput && (
              <form onSubmit={handlePasswordCreate}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    Create Password
                  </button>
                </div>
              </form>
            )}
            {!showPasswordInput && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setShowPasswordInput(false);
                  }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-left" autoClose={5000} />
    </div>
  );
};

export default Activation;
