import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorViewModal from './doctorViewQuestionsModal';
import ViewResponseModal from './teacherResponseModal';
import "../App.css"

const TeacherResponseTable = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [responseModalIsOpen, setResponseModalIsOpen] = useState(false)
    const [answerData, setAnswerData] = useState()
    const [answers, setAnswers] = useState({
        questionOne: "",
        questionTwo: "",
        questionThree: "",
        questionFour: "",
        questionFive: "",
        questionSix: "",
        questionSeven: "",
        questionEight: "",
        questionNine: "",
        questionTen: ""
    });
    const [openDropdown, setOpenDropdown] = useState(null);
    const handleViewQuestions = (answer) => {
        setAnswers({
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
        })
        setModalIsOpen(true)
    };

    const toggleResponseModalQuestion = (response) => {
        setAnswerData(response)
        setResponseModalIsOpen(true)
    }

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

    const toggleDropdown = (index) => {
        if (openDropdown === index) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(index);
        }
    };

    return (
        <div className="container mx-auto p-4" style={{ fontFamily: 'roboto' }}>
            <h1 className="text-2xl font-semibold mb-4">Teacher's View of Responses</h1>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted On</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.studentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.doctorEvaluation === "" ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Pending
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Responded
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5" style={{ cursor: "pointer" }} onClick={() => handleViewQuestions(item)}>View Questions</a>
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-5" style={{ cursor: "pointer" }} onClick={() => toggleResponseModalQuestion(item)}>View Doctor's Response</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalIsOpen && <DoctorViewModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                answers={answers}
            />}
            {responseModalIsOpen && <ViewResponseModal
                isOpen={responseModalIsOpen}
                onClose={() => setResponseModalIsOpen(false)}
                data={answerData}
            />}
        </div>
    );
};

export default TeacherResponseTable;