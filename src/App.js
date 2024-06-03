// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import DashboardLayout from './components/DashboardLayout';
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import About from './components/About';
import Browse from './components/Browse';
import Definition from './components/Definition';
import Therapy from './components/Therapy';
import Game from './components/Game';
import UserManagement from './components/UserManagement';
import Activation from './components/Activation';
import Questionnaire from './components/Questionnaire';
import Emergency from './components/Emergency';
import Thought from './components/Thought';
import Appointments from './components/Appointments';
import AppointmentList from './components/AppointmentList';
import DoctorQuestionsLists from './components/DoctorQuestionsLists';
import teacherViewQuestionsResponse from './components/teacherViewQuestionsResponse';

function App() {
  return (
    <Router>
       <Routes>
       <Route  path="/" element={<Homepage/>} ></Route>
        <Route  path="/signup" element={<SignUp/>} ></Route>
        <Route  path="/signin" element={<SignIn/>} ></Route>
        <Route  path="/homepage" element={<Homepage/>} ></Route>
        <Route  path="/about" element={<About/>} ></Route>
        <Route  path="/nav" element={<Nav/>} ></Route>
        
        
        <Route  path="/activate" element={<Activation/>} ></Route>
         <Route  path="/dashboard" element={<DashboardLayout/>} >

        <Route  path="emergency" element={<Emergency/>} />
         <Route  path="thought" element={<Thought/>} />
         <Route  path="question" element={<Questionnaire/>} />
         <Route  path="definition" element={<Definition/>} />
         <Route  path="browse" element={<Browse/>} />
         <Route  path="game" element={<Game/>} />
         <Route  path="usrman" element={<UserManagement/>} />
        <Route  path="therapy" element={<Therapy/>} />
       <Route  path="appointment" element={<Appointments/>} />
        <Route  path="alist" element={<AppointmentList/>} />
 <Route  path="dolist" element={<DoctorQuestionsLists/>} />
 <Route  path="response" element={<teacherViewQuestionsResponse/>} />
   

         </Route>
        </Routes>
    </Router>
  );
}

export default App;
