import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');  // Set the root element for accessibility

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    // Fetch appointments for the patient
    axios.get('/api/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));

    // Fetch doctors
    axios.get('/api/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !appointmentDate) {
      toast.error('Please select a doctor and date.');
      return;
    }

    const newAppointment = {
      doctorId: selectedDoctor,
      date: appointmentDate,
    };

    // Book the appointment
    axios.post('/api/book-appointment', newAppointment)
      .then(response => {
        toast.success('Appointment booked successfully!');
        setAppointments([...appointments, response.data]);
        setIsModalOpen(false);
      })
      .catch(error => {
        toast.error('Error booking appointment.');
        console.error('Error booking appointment:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
       + Book Appointment
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Doctor</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.doctorName}</td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Book Appointment"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            textAlign: 'center',
          },
        }}
      >
        <h2 className="text-xl mb-4">Book Appointment</h2>
        <form>
          <div className="mb-4">
            <label className="block text-left">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left">Doctor</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
