import React, { useState } from 'react';
import { FaBeer, FaWineGlassAlt, FaGlassWhiskey } from 'react-icons/fa';

const Step1 = ({ formData, setFormData, nextStep }) => (
  <div className="flex flex-col items-center p-4">
    <h2 className="text-2xl mb-4">Who are you concerned about?</h2>
    <div className="flex space-x-4">
      <button
        className={`p-2 rounded ${formData.concernedAbout === 'myself' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'myself' });
          nextStep();
        }}
      >
        Myself
      </button>
      <button
        className={`p-2 rounded ${formData.concernedAbout === 'someone else' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
        onClick={() => {
          setFormData({ ...formData, concernedAbout: 'someone else' });
          nextStep();
        }}
      >
        Someone else
      </button>
    </div>
  </div>
);

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => (
  <div className="flex flex-col items-center p-4">
    <h2 className="text-2xl mb-4">I'm concerned about my friend or loved one's use of...</h2>
    <div className="flex space-x-4">
      <button
        className={`p-2 rounded ${formData.useOf === 'alcohol' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
        onClick={() => {
          setFormData({ ...formData, useOf: 'alcohol' });
          nextStep();
        }}
      >
        Alcohol
      </button>
      <button
        className={`p-2 rounded ${formData.useOf === 'recreational drugs' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
        onClick={() => {
          setFormData({ ...formData, useOf: 'recreational drugs' });
          nextStep();
        }}
      >
        Recreational Drugs
      </button>
      <button
        className={`p-2 rounded ${formData.useOf === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
        onClick={() => {
          setFormData({ ...formData, useOf: 'both' });
          nextStep();
        }}
      >
        Both
      </button>
    </div>
    <button className="mt-4 p-2 bg-gray-500 text-white rounded" onClick={prevStep}>Go Back</button>
  </div>
);

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const questions = [
    {
      question: "How often do they drink alcohol, including beer, wine, or liquor?",
      name: "drinkFrequency",
      options: ['Never', 'Monthly or less', '2-4 times a month', '2-3 times a week', '4 or more times a week']
    },
    {
      question: "How many drinks containing alcohol do they have on a typical day when they are drinking?",
      name: "typicalDayDrinks",
      options: ['1 or 2', '3 or 4', '5 or 6', '7 to 9', '10 or more']
    },
    {
      question: "How often do they have six or more drinks on one occasion?",
      name: "sixOrMoreDrinks",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "How often during the last year have they found that they were not able to stop drinking once they had started?",
      name: "notAbleToStop",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "How often during the last year have they failed to do what was normally expected from them because of drinking?",
      name: "failedExpectations",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "How often during the last year have they needed a first drink in the morning to get themselves going after a heavy drinking session?",
      name: "firstDrinkMorning",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "How often during the last year have they had a feeling of guilt or remorse after drinking?",
      name: "guiltAfterDrinking",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "How often during the last year have they been unable to remember what happened the night before because of their drinking?",
      name: "memoryLoss",
      options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily']
    },
    {
      question: "Have they or someone else been injured because of their drinking?",
      name: "injuredDueToDrinking",
      options: ['No', 'Yes, but not in the last year', 'Yes, during the last year']
    },
    {
      question: "Has a relative, friend, doctor, or another health worker been concerned about their drinking or suggested they cut down?",
      name: "concernedRelative",
      options: ['No', 'Yes, but not in the last year', 'Yes, during the last year']
    }
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Detailed Questions</h2>
      {questions.map(({ question, name, options }) => (
        <div key={name} className="mb-4 w-full">
          <h3 className="text-xl mb-2">{question}</h3>
          <div className="flex flex-col space-y-2">
            {options.map(option => (
              <button
                key={option}
                className={`p-2 rounded ${formData[name] === option ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
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
        <button className="p-2 bg-blue-500 text-white rounded" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

const Summary = ({ formData, prevStep }) => (
  <div className="flex flex-col items-center p-4">
    <h2 className="text-2xl mb-4">Summary of Your Responses</h2>
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-md">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="mb-2">
          <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
          <p className="text-gray-700">{value}</p>
        </div>
      ))}
    </div>
     <button className="p-2 bg-gray-500 text-white rounded" onClick={prevStep}>Go Back</button>
  </div>
);

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    concernedAbout: '',
    useOf: '',
    age: '',
    drinkFrequency: '',
    typicalDayDrinks: '',
    sixOrMoreDrinks: '',
    notAbleToStop: '',
    failedExpectations: '',
    firstDrinkMorning: '',
    guiltAfterDrinking: '',
    memoryLoss: '',
    injuredDueToDrinking: '',
    concernedRelative: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <Summary formData={formData} />;
    default:
      return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
  }
};

const Questionnaire = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <MultiStepForm />
  </div>
);

export default Questionnaire;
