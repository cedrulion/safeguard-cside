import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments for the doctor
    axios.get('/api/doctor-appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleAcceptAppointment = (id) => {
    // Update appointment status to 'Accepted'
    axios.put(`/api/update-appointment/${id}`, { status: 'Accepted' })
      .then(response => {
        // Update the UI after successful update
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === id) {
            return { ...appointment, status: 'Accepted' };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  const handleDeclineAppointment = (id) => {
    // Update appointment status to 'Declined'
    axios.put(`/api/update-appointment/${id}`, { status: 'Declined' })
      .then(response => {
        // Update the UI after successful update
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === id) {
            return { ...appointment, status: 'Declined' };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment List</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Patient Name</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.patientName}</td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.status}</td>
              <td className="py-2 px-4 border-b">
                {appointment.status === 'Pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleAcceptAppointment(appointment.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDeclineAppointment(appointment.id)}
                    >
                      Decline
                    </button>
                  </>
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
