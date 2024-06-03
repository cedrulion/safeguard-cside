import React, { useState } from 'react';
import axios from 'axios';

// Modal component to display thank you message
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl mb-4 text-green-600 font-semibold">Thank you for your response!</h2>
        <p className="mb-4 text-gray-700">
          Your responses have been recorded. Please encourage your friend or loved one to seek professional help if necessary.
        </p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Step1 = ({ formData, setFormData, nextStep }) => (
  <div className="flex flex-col items-center p-6">
    <h2 className="text-3xl mb-6 text-blue-600 font-semibold">Help us match you to the right therapist.</h2>
    <p className="mb-6 text-gray-700 text-lg">
      What type of therapy are you looking for?
    </p>
    <div className="grid gap-4 w-full max-w-md">
      <button
        className={`p-4 rounded-lg text-lg font-semibold ${formData.concernedAbout === 'Teen' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'Teen' });
          
        }}
      >
        Teen
      </button>
      <button
        className={`p-4 rounded-lg text-lg font-semibold ${formData.concernedAbout === 'Young adult' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'Young adult' });
          
        }}
      >
        Young adult
      </button>
      <button
        className={`p-4 rounded-lg text-lg font-semibold ${formData.concernedAbout === 'Young primary student' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'Young primary student' });
          
        }}
      >
        Young primary student
      </button>
    </div>
    <div className="mt-8 p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md max-w-lg">
      <h3 className="text-xl font-semibold mb-2">Online Addiction Counseling</h3>
      <p className="mb-4">Get professional help from an online addiction and mental health counselor from BetterHelp. Start receiving support via phone, video, or live-chat.</p>
      <div className="flex justify-center">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none" onClick={nextStep}>
          Start the Quiz
        </button>
      </div>
    </div>
  </div>
);

const EnterNameStep = ({ formData, setFormData, nextStep, prevStep }) => (
  <div className="flex flex-col items-center p-6">
    <h2 className="text-3xl mb-6 text-blue-600 font-semibold">Please enter the student's name</h2>
    <input
      type="text"
      value={formData.studentName}
      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
      className="p-2 border border-gray-300 rounded-lg mb-6 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter name here"
    />
    <div className="flex space-x-4">
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none" onClick={prevStep}>Go Back</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none" onClick={nextStep}>Next</button>
    </div>
  </div>
);

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl mb-6 text-blue-600 font-semibold">Detailed Questions</h2>
      {questions.map(({ question, name, options }) => (
        <div key={name} className="mb-6 w-full">
          <h3 className="text-xl mb-2 text-gray-800 font-semibold">{question}</h3>
          <div className="grid gap-2">
            {options.map(option => (
              <button
                key={option}
                className={`p-2 rounded-lg text-lg ${formData[name] === option ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                onClick={() => setFormData({ ...formData, [name]: option })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex space-x-4 mt-6">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none" onClick={prevStep}>Go Back</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none" onClick={nextStep}>Submit</button>
      </div>
    </div>
  );
};

const Questions = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    concernedAbout: '',
    studentName: '',
    questionOne: '',
    questionTwo: '',
    questionThree: '',
    questionFour: '',
    questionFive: '',
    questionSix: '',
    questionSeven: '',
    questionEight: '',
    questionNine: '',
    questionTen: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
     const config={
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
     }
     const response = await axios.post('http://localhost:5000/api/symptoms/addsymptoms', formData,config);
     setFormData({
        concernedAbout: '',
        studentName: '',
        questionOne: '',
        questionTwo: '',
        questionThree: '',
        questionFour: '',
        questionFive: '',
        questionSix: '',
        questionSeven: '',
        questionEight: '',
        questionNine: '',
        questionTen: ''
      });
      setStep(1);
      setModalOpen(true);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
        {step === 2 && <EnterNameStep formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 formData={formData} setFormData={setFormData} nextStep={handleSubmit} prevStep={prevStep} />}
      </div>
      <Modal isOpen={modalOpen} onClose={() =>  setModalOpen(false)} />
    </div>
  );
};

export default Questions;