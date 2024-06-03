import React from 'react';

const ViewResponseModal = ({ isOpen, onClose, data }) => {
    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'inter' }}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl w-full max-w-3xl">
                <div className="bg-green-500 text-white px-8 py-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">View Doctor's Response</h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-600 mb-1">Student Name:</p>
                            <div className="bg-gray-100 p-4 rounded-lg">  
                            <p className="text-lg font-semibold">{data.studentName}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Doctor's Name:</p>
                            <div className="bg-gray-100 p-4 rounded-lg"> 
                            <p className="text-lg font-semibold">{data.doctor.firstname} {data.doctor.lastname}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Posted on : </p>
                            <div className="bg-gray-100 p-4 rounded-lg"> 
                            <p className="text-lg font-semibold">{data.createdAt} </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Evaluation:</p>
                            <div className="bg-gray-100 p-4 rounded-lg"> 
                            <p className="text-lg font-semibold">{data.testResult}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-600 mb-1">Description:</p>
                        <div className="bg-gray-100 p-4 rounded-lg"> 
                        <p className="text-lg">{data.doctorEvaluation}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewResponseModal;
