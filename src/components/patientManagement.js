import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaTrash } from 'react-icons/fa';

const PatientsManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const handleOpenDetailModal = (details) => {
    setAppointments(details.status.appointments);
    setDetailModalIsOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalIsOpen(false);
    setAppointments(null);
  };

  const token = localStorage.getItem('token');

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/statistics/admin/appointment/patients', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      handleError(error, 'Failed to fetch transactions');
    }
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleError = (error, message) => {
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      toast.error(`${message}: ${error.response.data.message}`);
    } else if (error.request) {
      console.error('Request data:', error.request);
      toast.error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      toast.error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case true:
        return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Has pending appointments</span>
      case false:
        return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">No pending appointments</span>
      default:
        return null;
    }
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">CONFIRMED</span>
      case 'DENIED':
        return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">DENIED</span>
      case 'PENDING':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">PENDING</span>
      default:
        return null;
    }
  };


  return (
    <div className="container mx-auto mt-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Names</th>
                  <th scope="col" className="px-6 py-3">National ID</th>
                  <th scope="col" className="px-6 py-3">email</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody >
                {patients.map((patient) => (
                  <tr key={patient._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{patient.firstname} {patient.lastname}</td>
                    <td className="px-6 py-4">{patient.nID}</td>
                    <td className="px-6 py-4">{patient.email}</td>
                    <td className="px-6 py-4">
                      {patient.status.appointmentCount.length === 0
                        ? getStatusIcon(false)
                        : getStatusIcon(patient.status.hasOnePendingAppointment)}
                    </td>
                    <td className="px-6 py-4">
                      <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5" style={{ cursor: "pointer" }} onClick={() => handleOpenDetailModal(patient)}>Detailed description</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Modal
        isOpen={detailModalIsOpen}
        onRequestClose={handleCloseDetailModal}
        contentLabel="Product Details"
        className="bg-white rounded-lg shadow-lg p-6 w-120 mx-auto my-4"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
            <span>Appointment details</span>
          </div>
          <button onClick={handleCloseDetailModal} className="text-2xl">&times;</button>
        </div>
        <div className='mt-2'>
          {appointments?.map((appointment, index) => (
            <div key={index} className="flex items-center justify-between mb-2 bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition duration-150 ease-in-out">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-green-800 mr-1">Doctor:</span>
                <span className="font-medium text-gray-800">{appointment.doctor}</span>
                <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-blue-800 mr-1">Date :</span>
                  <span className="text-sm font-bold text-blue-900">{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                <span className="text-xs font-semibold text-green-800 mr-1">Items:</span>
                <span className="text-sm font-bold text-green-900">{getStatusDetails(appointment.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

    </div>
  );
};

export default PatientsManagement;

