import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const RespondModal = ({ isOpen, onClose, data }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [showTakeAction, setShowTakeAction] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleRespond = async () => {
        
        try {
            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                  },
             }
             console.log(config);
            const response = await axios.put(`http://localhost:5000/api/symptoms/evaluate/${data._id}`, { testResult: selectedOption, doctorEvaluation: description },config);
            console.log(response.data);
            toast.success("Successfully responded")
            setShowTakeAction(true);
        } catch (error) {
            toast.error("Failed to respond")
            console.log();
        }

    };

    const isFormFilled = selectedOption && description;

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'inter' }}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl w-full max-w-3xl">
                <div className="bg-green-500 text-white px-8 py-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Respond to the Inquiry</h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-8">
                    {!showTakeAction && (
                        <div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-gray-600 mb-1">Student Name:</p>
                                    <p className="text-lg font-semibold">{data.studentName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-1">Teacher's Name:</p>
                                    <p className="text-lg font-semibold">{data.teacher.firstname} {data.teacher.lastname}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-1">Posted on:</p>
                                    <p className="text-lg font-semibold">{data.createdAt}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="option" className="block text-sm font-medium text-gray-700 mb-1">Select an option</label>
                                <select
                                    id="option"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="needMedicalAttention">Need Medical Attention</option>
                                    <option value="continueConsulting">Continue Consulting the Student</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    id="description"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows="4"
                                    placeholder="Enter a description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none mr-2"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded-md text-white ${isFormFilled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!isFormFilled}
                                    onClick={handleRespond}
                                >
                                    Respond
                                </button>
                            </div>
                        </div>
                    )}
                    {showTakeAction && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-gray-600">Thank you for responding. Your questions have been forwarded to the teacher.</p>
                        </div>
                    )}

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RespondModal;