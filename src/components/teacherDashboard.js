import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';
import EmployeeLineChart from '../statisticsComponent/employeeLineChart';
import PercentageEmployeeSalesDoughnutChart from '../statisticsComponent/percentageChart';

// Register the required components
Chart.register(...registerables);

const TeacherDashboard = () => {
  const [countsPerMonth, setCountsPerMonth] = useState(Array(12).fill(0));
  const [teacherInquiries, setTeacherInquiries] = useState({
    totalInquiries: 0,
    percentageChange: 0
  })
  const [data, setData] = useState({
    dataPresent: false,
    positiveEvaluations:0,
    negativeEvaluations:0
  })
  const [teacherResponses, setTeacherResponses] = useState({
    totalResponse: 0,
    percentageChange: 0
  })
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      try {
        const statsPerMonthResponse = await axios.get('http://localhost:5000/api/statistics/teacher/symptoms/permonth', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const dataResponse = await axios.get('http://localhost:5000/api/statistics/teacher/evaluation/stats', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        console.log("data response",dataResponse.data)
        const positive = (dataResponse.data.positiveEvaluations / dataResponse.data.totalEvaluated) * 100
        const negative = (dataResponse.data.negativeEvaluations / dataResponse.data.totalEvaluated) * 100
        setData({
          dataPresent: dataResponse.data.totalEvaluated > 0 ? true : false,
          positiveEvaluations: positive.toFixed(0),
          negativeEvaluations: negative.toFixed(0)
        })
        const response = await axios.get('http://localhost:5000/api/statistics/teacher/symptoms/stats', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        
        setTeacherInquiries({
          totalInquiries: response.data.totalInquiries,
          percentageChange: response.data.inquiryPercentageChange
        })
        setTeacherResponses({
          totalResponse: response.data.totalResponses,
          percentageChange: response.data.responsePercentageChange
        })
        setCountsPerMonth(statsPerMonthResponse.data.countsPerMonth.map(item => item.count));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
        setData({
          dataPresent:  false,
          positiveEvaluations: 0,
          negativeEvaluations: 0
        })
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className='p-6'>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-600">Total inquiries sent</h2>
              <FaExchangeAlt className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold mb-2"> {teacherInquiries.totalInquiries} inquiry(ies)</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center text-sm">
              {teacherInquiries.percentageChange > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{teacherInquiries.percentageChange}%</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">{teacherInquiries.percentageChange}%</span>
                </>
              )}
            </div>
            <span className="text-gray-500 ml-1">From last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-600">Total inquiries eveluated</h2>
              <FaExchangeAlt className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{teacherResponses.totalResponse} response(s)</div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center mt-auto">
            <div className="flex items-center text-sm">
              {teacherResponses.percentageChange > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{teacherResponses.percentageChange}%</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">{teacherResponses.percentageChange}%</span>
                </>
              )}
            </div>
            <span className="text-gray-500 text-sm">From last month</span>
          </div>
        </div>

      </div>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xs font-semibold mb-0">Positive affected students over Negative affected students</h3>
          <PercentageEmployeeSalesDoughnutChart percentage={data} />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-5">Monthly statistics</h3>
          <EmployeeLineChart statspermonth={countsPerMonth} />
        </div>
      </div>

    </div >
  );
};

export default TeacherDashboard;
