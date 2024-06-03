import React, { useState } from 'react';

// Modal component to display thank you message
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4 text-green-600">Thank you for your response!</h2>
        <p className="mb-4 text-gray-700">
          Your responses have been recorded. Please encourage your friend or loved one to seek professional help if necessary.
        </p>
        <button className="p-2 bg-green-600 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Step1 = ({ formData, setFormData, nextStep }) => (
  <div className="flex flex-col items-center p-4">
    <h2 className="text-2xl mb-4 text-blue-600">Help us match you to the right therapist.</h2>
    <p className="mb-4 text-gray-700">
      What type of therapy are you looking for?
    </p>
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <button
        className={`p-2 rounded ${formData.concernedAbout === 'individual' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'individual' });
          nextStep();
        }}
      >
        Individual (for myself)
      </button>
      <button
        className={`p-2 rounded ${formData.concernedAbout === 'couples' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'couples' });
          nextStep();
        }}
      >
        Couples (for myself and my partner)
      </button>
      <button
        className={`p-2 rounded ${formData.concernedAbout === 'teen' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'teen' });
          nextStep();
        }}
      >
        Teen (for my child)
      </button>
    </div>
    <div className="mt-6 p-4 bg-gray-100 text-gray-800 rounded shadow-md max-w-lg">
      <h3 className="text-lg font-semibold mb-2">Online Addiction Counseling</h3>
      <p className="mb-2">Get professional help from an online addiction and mental health counselor from BetterHelp. Start receiving support via phone, video, or live-chat.</p>
      <div className="flex justify-center">
        <button className="p-2 bg-green-600 text-white rounded" onClick={nextStep}>
          Start the Quiz
        </button>
      </div>
    </div>
  </div>
);

const EnterNameStep = ({ formData, setFormData, nextStep, prevStep }) => (
  <div className="flex flex-col items-center p-4">
    <h2 className="text-2xl mb-4 text-blue-600">Please enter the student's name</h2>
    <input
      type="text"
      value={formData.studentName}
      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
      className="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
      placeholder="Enter name here"
    />
    <div className="flex space-x-4">
      <button className="p-2 bg-gray-500 text-white rounded" onClick={prevStep}>Go Back</button>
      <button className="p-2 bg-blue-600 text-white rounded" onClick={nextStep}>Next</button>
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
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4 text-blue-600">Detailed Questions</h2>
      {questions.map(({ question, name, options }) => (
        <div key={name} className="mb-4 w-full">
          <h3 className="text-xl mb-2 text-gray-800">{question}</h3>
          <div className="flex flex-col space-y-2">
            {options.map(option => (
              <button
                key={option}
                className={`p-2 rounded ${formData[name] === option ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                onClick={() => setFormData({ ...formData, [name]: option })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-gray-500 text-white rounded" onClick={prevStep}>Go Back</button>
        <button className="p-2 bg-blue-600 text-white rounded" onClick={nextStep}>Submit</button>
      </div>
    </div>
  );
};

const MultiStepForm = () => {
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

  const handleSubmit = () => {
    // Handle form submission logic
    setModalOpen(true);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl">
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
        {step === 2 && <EnterNameStep formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 formData={formData} setFormData={setFormData} nextStep={handleSubmit} prevStep={prevStep} />}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default MultiStepForm;
