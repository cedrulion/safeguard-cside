import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/appointment/getall', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  const handleAcceptAppointment = (id) => {
    // Update appointment status to 'Accepted'
    axios.put(`http://localhost:5000/api/appointment/update/${id}`, { status: 'CONFIRMED' })
      .then(response => {
        // Update the UI after successful update
        const updatedAppointments = appointments.map(appointment => {
          if (appointment._id === id) {
            return { ...appointment, status: 'CONFIRMED' };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  const handleDeclineAppointment = (id) => {
    // Update appointment status to 'Declined'
    axios.put(`/api/update-appointment/${id}`, { status: 'CANCELLED' })
      .then(response => {
        // Update the UI after successful update
        const updatedAppointments = appointments.map(appointment => {
          if (appointment._id === id) {
            return { ...appointment, status: 'CANCELLED' };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  return (
    <div className="container mx-auto p-4" style={{ fontFamily: 'roboto' }}>
      <h1 className="text-2xl font-bold mb-4">Appointment List</h1>
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className='bg-gray-50'>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.patient.firstname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {appointment.status === 'PENDING' && (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleAcceptAppointment(appointment._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDeclineAppointment(appointment._id)}
                    >
                      Decline❌
                    </button>
                  </>
                )}
                {appointment.status === 'CONFIRMED' && (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded"

                  >
                    Done✔
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AppointmentList;
