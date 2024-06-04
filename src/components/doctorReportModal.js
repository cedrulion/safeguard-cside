import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import generatePDF from '../helpers/doctorReport';
import "../App.css"

const DoctorReportModal = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/symptoms/getall', {});
            console.log(response.data);

            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handlePrintPdf = (answer) => {
        const answers = {
            teacherNames:answer.teacher.firstname+answer.teacher.lastname,
            studentName:answer.studentName,
            createdAt:answer.createdAt,
            questionOne: answer.questionOne,
            questionTwo: answer.questionTwo,
            questionThree: answer.questionThree,
            questionFour: answer.questionFour,
            questionFive: answer.questionFive,
            questionSix: answer.questionSix,
            questionSeven: answer.questionSeven,
            questionEight: answer.questionEight,
            questionNine: answer.questionNine,
            questionTen: answer.questionTen,
        };
        generatePDF([answers]);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'roboto' }}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-6xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Reporting</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted On</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((dataItem, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{dataItem.teacher.firstname} {dataItem.teacher.lastname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{dataItem.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(dataItem.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-indigo-600 bg-green-300 rounded-lg p-3 hover:text-indigo-900 mr-2" onClick={() => handlePrintPdf(dataItem)}>Print Report</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DoctorReportModal;
