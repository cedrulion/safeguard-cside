import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown, FaCheckCircle, FaSync, FaTimesCircle, FaExchangeAlt } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import LineChart from '../statisticsComponent/lineChart';

// Register the required components
Chart.register(...registerables);

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [countsPerMonth, setCountsPerMonth] = useState(Array(12).fill(0));
  const[symptomsStats, setSymptomsStats] = useState({
    totalInquiries: 0,
    respondedSymptoms: 0
  });
  const [patientsStats, setPatientsStats] = useState({
    totalPatients: 0,
    percentageChange: 0
  });
  const [doctorsStats, setDoctorsStats] = useState({
    totalDoctors: 0,
    percentageChange: 0
  });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      try {
        const symptomsResponse = await axios.get('http://localhost:5000/api/statistics/admin/symptoms/stats',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        console.log(symptomsResponse.data)
        const patientsResponse = await axios.get('http://localhost:5000/api/statistics/admin/patients/stats',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        console.log(patientsResponse.data)
        const doctorResponse = await axios.get('http://localhost:5000/api/statistics/admin/doctor/stats',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        console.log(doctorResponse.data)
        const appointmentResponse = await axios.get('http://localhost:5000/api/statistics/admin/appointments',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        
        setSymptomsStats({
          respondedSymptoms:symptomsResponse.data.respondedSymptoms,
          totalInquiries:symptomsResponse.data.totalInquiries
        })
        setPatientsStats({
          totalPatients:patientsResponse.data.totalPatients,
          percentageChange:patientsResponse.data.percentageChange
        })
        setDoctorsStats({
          totalDoctors:doctorResponse.data.totalDoctors,
          percentageChange:doctorResponse.data.percentageChange
        })
        setPatients(appointmentResponse.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStatusIcon = (status) => {
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

  useEffect(() => {
    const fetchCountsPerMonth = async () => {
      const token = localStorage.getItem('token');
      try {
        const countsPerMonthResponse = await axios.get('http://localhost:5000/api/statistics/admin/patients/permonth', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        });
        setCountsPerMonth(countsPerMonthResponse.data.countsPerMonth.map(item => item.count));
      } catch (error) {
        console.error('Error fetching counts per month:', error);
      }
    };


    fetchCountsPerMonth();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4" style={{ fontFamily: 'inter' }}>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-600">Total number of inquiries</h2>
              <FaExchangeAlt className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold"> {symptomsStats.totalInquiries}</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
            <div className="flex items-center text-sm">
              <span className="text-red-500 font-medium">{symptomsStats.respondedSymptoms} inqury(ies)</span>
            </div>
            <div className="text-sm text-right">
              <span className="text-gray-500">Inquiries responded</span>
            </div>
          </div>

        </div>


        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className='p-6'>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-600">Number of patients</h2>
              <FaExchangeAlt className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold mb-2">{patientsStats.totalPatients} patient(s)</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center text-sm">
              {patientsStats.percentageChange > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{patientsStats.percentageChange}%</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">{patientsStats.percentageChange}%</span>
                </>
              )}
            </div>
            <span className="text-gray-500 ml-1">From last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-600">Number of doctors</h2>
              <FaExchangeAlt className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{doctorsStats.totalDoctors} doctors(s)</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
            <div className="flex items-center text-sm">
              {doctorsStats.percentageChange > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{doctorsStats.percentageChange}%</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">{doctorsStats.percentageChange}%</span>
                </>
              )}
            </div>
            <span className="text-gray-500 text-sm">From last month</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
        <LineChart statspermonth={countsPerMonth} />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Patients</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">patient name</th>
              <th scope="col" className="px-6 py-3">Doctor name</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{patient.patient.firstname} {patient.patient.lastname}</td>
                <td className="px-6 py-4">{patient.doctor.firstname} {patient.doctor.lastname}</td>
                <td className="px-6 py-4">{new Date(patient.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{getStatusIcon(patient.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default AdminDashboard;
