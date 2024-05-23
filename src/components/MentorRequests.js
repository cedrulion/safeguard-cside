import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaSearch, FaUser } from 'react-icons/fa';

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response:', response.data);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const updateRequestStatus = async (requestId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Request status updated:', response.data);
      // Optionally, you can update state or show a notification on successful status update
    } catch (error) {
      console.error('Error updating request status:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-gray-300 to-orange-200">
      <div className="m-6 bg-transparent flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="text-2xl font-bold py-2 px-4 rounded">Requests</div>
      </div>
      {requests.length === 0 ? (
        <div className="text-center text-gray-800 font-semibold">No requests available</div>
      ) : (
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learner Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaUser className="h-6 w-6 text-blue-400" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.learnerFirstName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.classType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.classTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => updateRequestStatus(request._id, 'accepted')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateRequestStatus(request._id, 'declined')}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MentorRequests;
