import React, { useState, useEffect } from 'react';
import axios from 'axios';



const InquiriesManagement = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
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
        const fetchReports = async () => {
            const token = localStorage.getItem('token');
            try {
                const appointmentResponse = await axios.get('http://localhost:5000/api/statistics/admin/appointments', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                setPatients(appointmentResponse.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <h3 className="text-lg font-semibold mb-4 mx-3 mt-3">Patients</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-2">
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
        </>
    )
}



export default InquiriesManagement;