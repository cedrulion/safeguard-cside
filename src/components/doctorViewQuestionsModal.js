import React from 'react';
import "../App.css"

const DoctorViewModal = ({ isOpen, onClose, answers }) => {
    const questions = [
        {
            question: "How often do they drink alcohol, including beer, wine, or liquor?",
            name: "questionOne",
            options: ['Never', 'Monthly or less', '2-4 times a month', '2-3 times a week', '4 or more times a week']
        },
        {
            question: "How many drinks containing alcohol do they have on a typical day when they are drinking?",
            name: "questionTwo",
            options: ['1 or 2', '3 or 4', '5 or 6', '7 to 9', '10 or more']
        },
        {
            question: "How often do they have six or more drinks on one occasion?",
            name: "questionThree",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "How often during the last year have they found that they were not able to stop drinking once they had started?",
            name: "questionFour",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "How often during the last year have they failed to do what was normally expected from them because of drinking?",
            name: "questionFive",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "How often during the last year have they needed a first drink in the morning to get themselves going after a heavy drinking session?",
            name: "questionSix",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "How often during the last year have they had a feeling of guilt or remorse after drinking?",
            name: "questionSeven",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "How often during the last year have they been unable to remember what happened the night before because of their drinking?",
            name: "questionEight",
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
        },
        {
            question: "Have they or someone else been injured because of their drinking?",
            name: "questionNine",
            options: ['No', 'Yes, but not in the last year', 'Yes, during the last year']
        },
        {
            question: "Has a relative, friend, doctor, or another health worker been concerned about their drinking or suggested they cut down?",
            name: "questionTen",
            options: ['No', 'Yes, but not in the last year', 'Yes, during the last year']
        }
    ];

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'roboto' }}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[80vh] overflow-hidden">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
                        <h2 className="text-lg font-semibold">Doctor Questions</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-y-auto p-4">
                        {questions.map((question, index) => (
                            <div key={question.name} className="mb-4">
                                <p className="text-gray-600 mb-2">{index + 1}. {question.question}</p>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p>Answer: {answers[question.name]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white">
                        <div className="flex justify-end">
                            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorViewModal;