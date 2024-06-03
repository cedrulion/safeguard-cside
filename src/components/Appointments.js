import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/appointment/getpatientappointment', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  const fetchDoctors = async () => {
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

      // Filter users to get only doctors
      const doctors = response.data.filter(user => user.role === 'DOCTOR');
      setDoctors(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (!selectedDoctor || !time) {
      toast.error('Please select a doctor and date.');
      return;
    }

    const newAppointment = {
      doctorId: selectedDoctor,
      time: time,
      description: description,
    };

    axios
      .post('http://localhost:5000/api/appointment/create', newAppointment, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        toast.success('Appointment booked successfully!');
        fetchAppointments(); // Fetch appointments again to update the list
        setIsModalOpen(false);
      })
      .catch((error) => {
        toast.error('Error booking appointment.');
        console.error('Error booking appointment:', error);
      });
  };

  const handleDeleteAppointment = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/appointments/erase/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        toast.success('Appointment deleted successfully!');
        fetchAppointments(); // Fetch appointments again to update the list
      })
      .catch((error) => {
        toast.error('Error deleting appointment.');
        console.error('Error deleting appointment:', error);
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
            <th className="py-2 px-4 border-b">Doctor's name</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="pl-5">
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
             <td className="py-2 px-4 border-b">{appointment.doctor.firstname}</td>
              <td className="py-2 px-4 border-b">{appointment.time}</td>
              <td className="py-2 px-4 border-b">{appointment.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </td>
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left">Description</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.firstname}
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