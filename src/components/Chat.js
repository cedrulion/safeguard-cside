import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaReply, FaBell, FaEnvelopeOpen } from 'react-icons/fa'; // Assuming you have FaBell for the notification icon
import Axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';

const ChatContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
`;

const QuestionWrapper = styled(MessageWrapper)`
  background-color: #F3F4F6;
  align-items: flex-start;
  position: relative; /* Added position relative for the notification icon */
`;

const ReplyWrapper = styled(MessageWrapper)`
  background-color: #DCF8C6;
  align-items: flex-end;
`;

const Button = styled.button`
  margin-top: 8px;
  background-color: #3490DC;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const NotificationIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null); // Track expanded question ID

  const token = localStorage.getItem('Token');

  useEffect(() => {
    fetchQuestions();
    const interval = setInterval(fetchQuestions, 5000); // Fetch questions every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/questions/view', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleReply = async (questionId) => {
    try {
      const response = await Axios.put(
        `http://localhost:5000/api/questions/reply/${questionId}`,
        {
          reply: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newReply = { message: response.data.message };
      setReplies([...replies, newReply]);
      setMessage('');
    } catch (error) {
      console.error('Error replying to question:', error);
    }
  };

  return (
    <ChatContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">Chat with Learners</h1>
      {questions.map((question) => (
        <QuestionWrapper key={question._id}>
          <p>{question.message}</p>
          <p><strong>From:</strong> {question.learnerFirstName}</p>
          {expandedQuestionId === question._id ? (
            <>
              {question.replies.map((reply) => (
                <ReplyWrapper key={reply._id}>
                  <p>{reply.message}</p>
                </ReplyWrapper>
              ))}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your reply..."
                className="border border-gray-300 rounded p-2 mt-4"
              />
              <Button onClick={() => handleReply(question._id)}>
                Reply <FaReply className="inline-block ml-1" />
              </Button>
            </>
          ) : (
            <NotificationIcon onClick={() => setExpandedQuestionId(question._id)}>
              <div className='flex justify-between gap-3'>
                <FaBell className='text-center text-rose-900 text-2xl'/>
                <div>
                  <FaEnvelopeOpen /><BsThreeDots /> 
                </div>
              </div>
            </NotificationIcon>
          )}
        </QuestionWrapper>
      ))}
    </ChatContainer>
  );
};

export default Chat;
