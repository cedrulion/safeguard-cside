import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  FaExchangeAlt } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';
import PercentageDoghnut from '../statisticsComponent/percentageChart';
import MultiLineChart from '../statisticsComponent/MultiLineChart';

Chart.register(...registerables);

const DoctorDashboard = () => {
    const [countsPerMonth, setCountsPerMonth] = useState(Array(12).fill(0));
    const [positiveCountsPerMonth, setPositiveCountsPerMonth] = useState(Array(12).fill(0));
    const [negativeCountsPerMonth, setNegativeCountsPerMonth] = useState(Array(12).fill(0));
    const [percentage, setPercentage] = useState({
        dataPresent:false,
        percentage:0
    });
    const [inquiriesStats, setInquiriesStats] = useState({
        total: 0,
        responded: 0
    })
    const [data, setData] = useState({
        dataPresent: false,
        positiveEvaluations: 0,
        negativeEvaluations: 0
    })
    const [appointmentsStats, setAppointmentStats] = useState({
        total: 0,
        received: 0
    })
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            try {
                const appointmentResponse = await axios.get('http://localhost:5000/api/statistics/doctor/appointments/stats', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                const doctorResponse = await axios.get('http://localhost:5000/api/statistics/doctor/inquiries/stats', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                setAppointmentStats({
                    total: appointmentResponse.data.totalAppointments,
                    received: appointmentResponse.data.totalConfirmedAppointments
                })
                setInquiriesStats({
                    total: doctorResponse.data.totalInquiries,
                    responded: doctorResponse.data.totalEvaluatedByDoctor
                })
                const response = await axios.get('http://localhost:5000/api/statistics/doctor/symptoms/permonth', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                const percentageResponse = await axios.get('http://localhost:5000/api/statistics/doctor/symptoms/percentage', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                console.log(percentageResponse.data.percentage);
                
                setPercentage({
                    dataPresent:true,
                    percentage:percentageResponse.data.percentage})
                setCountsPerMonth(response.data.totalInquiriesPerMonth.map(item => item));
                setPositiveCountsPerMonth(response.data.positiveEvaluationsPerMonth.map(item => item))
                setNegativeCountsPerMonth(response.data.negativeEvaluationsPerMonth.map(item => item))
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
                setData({
                    dataPresent: false,
                    positiveEvaluations: 0,
                    negativeEvaluations: 0
                })
                setPercentage({
                    dataPresent:false,
                    percentage:0
                });
            }
        };

        fetchTransactions();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4" style={{ fontFamily: 'inter' }}>
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-600">Total number of inquiries in the hospital</h2>
                            <FaExchangeAlt className="text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold"> {inquiriesStats.total}</div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
                        <div className="flex items-center text-sm">
                            <span className="text-red-500 font-medium">{inquiriesStats.responded} inqury(ies)</span>
                        </div>
                        <div className="text-sm text-right">
                            <span className="text-gray-500">Evaluated inquiries</span>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-600">Total number of appointments</h2>
                            <FaExchangeAlt className="text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold"> {appointmentsStats.total}</div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
                        <div className="flex items-center text-sm">
                            <span className="text-red-500 font-medium">{appointmentsStats.received} appointment(s)</span>
                        </div>
                        <div className="text-sm text-right">
                            <span className="text-gray-500">received</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xs font-semibold mb-0">Evaluation contribution relative to the total inquiries sent</h3>
                    <PercentageDoghnut percentage={percentage} />
                </div>
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-5">Monthly statistics</h3>
                    <MultiLineChart statspermonth={countsPerMonth} positiveStats={positiveCountsPerMonth} negativeStats={negativeCountsPerMonth} />
                </div>
            </div>

        </div >
    );
};

export default DoctorDashboard;
