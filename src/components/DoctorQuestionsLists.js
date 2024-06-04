import React, { useState, useEffect } from 'react';
import DoctorViewModal from './doctorViewQuestionsModal';
import axios from 'axios';
import RespondModal from './respondModal';

const DoctorQuestionsPage = () => {
    const [data, setData] = useState([]);
    const [respondData,setRespondData]=useState()
    const [answers,setAnswers]=useState({
        questionOne:"",
        questionTwo:"",
        questionThree:"",
        questionFour:"",
        questionFive:"",
        questionSix:"",
        questionSeven:"",
        questionEight:"",
        questionNine:"",
        questionTen:""
    })
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [respondModalIsOpen, setRespondModalIsOpen] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/symptoms/getall', {});
            console.log(response.data);
            setData(response.data.filter(data=>data.doctorEvaluation===""))

        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleRespond = (respond) => {
        setRespondData(respond)
        setRespondModalIsOpen(true)
    };

    const handleViewQuestions = (answer) => {
        setAnswers({
            questionOne:answer.questionOne,
            questionTwo:answer.questionTwo,
            questionThree:answer.questionThree,
            questionFour:answer.questionFour,
            questionFive:answer.questionFive,
            questionSix:answer.questionSix,
            questionSeven:answer.questionSeven,
            questionEight:answer.questionEight,
            questionNine:answer.questionNine,
            questionTen:answer.questionTen,
        })
        setModalIsOpen(true)
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Doctor Questions to Respond</h1>

            {/* Table */}
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
                            <td className="px-6 py-4 whitespace-nowrap">{dataItem.createdAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleRespond(dataItem)}>Respond</button>
                                <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewQuestions(dataItem)}>View Questions</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalIsOpen&&<DoctorViewModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                answers={answers}
            />}
           {respondModalIsOpen&& <RespondModal
                isOpen={respondModalIsOpen}
                onClose={() => setRespondModalIsOpen(false)}
                data={respondData}
            />}
        </div>
    );
};

export default DoctorQuestionsPage;
