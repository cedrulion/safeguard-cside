// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import "@fortawesome/fontawesome-free/css/all.min.css";

import DashboardLayout from './components/DashboardLayout';
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import About from './components/About';
import Browse from './components/Browse';
import Definition from './components/Definition';
import Therapy from './components/Therapy';
import Game from './components/Game';
// import UserManagement from './components/UserManagement';
import Activation from './components/Activation';
import Questionnaire from './components/Questionnaire';
import Emergency from './components/Emergency';
import Thought from './components/Thought';
import Appointments from './components/Appointments';
import AppointmentList from './components/Appointmentlist';
import DoctorQuestionsLists from './components/DoctorQuestionsLists';
import AddUser from './components/addUser';
import TeacherViewQuestionsResponse from './components/teacherViewQuestionsResponse';
import AdminDashboard from './components/adminDashboard';
import UserManagement from './components/userManagements';
import PatientsManagement from './components/patientManagement';
import InquiriesManagement from './components/inquiriesSent';
import TeacherDashboard from './components/teacherDashboard';
import DoctorDashboard from './components/doctorDashboard';

function App() {
  return (

    <Router >
      <Routes>
        <Route path="/" element={<Homepage />} ></Route>
        <Route path="/signup" element={<SignUp />} ></Route>
        <Route path="/signin" element={<SignIn />} ></Route>
        <Route path="/homepage" element={<Homepage />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        <Route path="/nav" element={<Nav />} ></Route>


        <Route path="/activate" element={<Activation />} ></Route>
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route path="teacherview" element={<teacherViewQuestionsResponse />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="thought" element={<Thought />} />
          <Route path="question" element={<Questionnaire />} />
          <Route path="definition" element={<Definition />} />
          <Route path="browse" element={<Browse />} />
          <Route path="game" element={<Game />} />
          <Route path="usrman" element={<UserManagement />} />
          <Route path="therapy" element={<Therapy />} />
          <Route path="appointment" element={<Appointments />} />
          <Route path="alist" element={<AppointmentList />} />
          <Route path="dolist" element={<DoctorQuestionsLists />} />
          <Route path="response" element={<TeacherViewQuestionsResponse />} />
          <Route path="admin/stats" element={<AdminDashboard />} />
          <Route path="admin/patient" element={<PatientsManagement />} />
          <Route path="admin/inquiries" element={<InquiriesManagement />} />
          <Route path="teacher/stats" element={<TeacherDashboard />} />
          <Route path="doctor/stats" element={<DoctorDashboard />} />
          <Route path=" doctor/questionlist" element={<TeacherDashboard />} />
         


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
