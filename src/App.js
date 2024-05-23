// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Profile from './components/Profile';
import Appointmentlist from './components/Appointmentlist';
import Report from './components/Report';
import Servis from './components/Servis';
import Nav from './components/Nav';
import UserDetails from './components/Auth/UserDetails';
import SearchBar from './components/SearchBar';
import Matching from './components/Matching';
import Forum from './components/Forum';
import Discussion from './components/Discussion';
import Question from './components/Question';
import Resource from './components/Resource';
import Request from './components/Request';
import MentorRequests from './components/MentorRequests';
import Uresource from './components/Uresource';
import Chat from './components/Chat';
import TrackProgress from './components/TrackProgress';
import Homepage from './components/Homepage';
import About from './components/About';
import Browse from './components/Browse';
import Definition from './components/Definition';
import Therapy from './components/Therapy';
import Game from './components/Game';
import UserManagement from './components/UserManagement';
import Activation from './components/Activation';
import Questionnaire from './components/Questionnaire';


function App() {
  return (
    <Router>
       <Routes>
       <Route  path="/" element={<Homepage/>} ></Route>
        <Route  path="/signup" element={<SignUp/>} ></Route>
        <Route  path="/signin" element={<SignIn/>} ></Route>
        
        <Route  path="/landingpage" element={<LandingPage/>} ></Route>
        <Route  path="/homepage" element={<Homepage/>} ></Route>
        <Route  path="/about" element={<About/>} ></Route>
        <Route  path="/nav" element={<Nav/>} ></Route>
        
        
        <Route  path="/activate" element={<Activation/>} ></Route>
         <Route  path="/dashboard" element={<DashboardLayout/>} >
         <Route  path="requests" element={<MentorRequests/>} />
         <Route  path="question" element={<Questionnaire/>} />
         <Route  path="definition" element={<Definition/>} />
         <Route  path="browse" element={<Browse/>} />
         <Route  path="game" element={<Game/>} />
         <Route  path="usrman" element={<UserManagement/>} />
        <Route  path="therapy" element={<Therapy/>} />
         <Route  path="search" element={<SearchBar/>} />
         <Route  path="resource" element={<Resource/>} />
         <Route  path="uresource" element={<Uresource/>} />
         <Route  path="Discussion" element={<Discussion/>} />
        <Route  path="question" element={<Question/>} />
         <Route  path="forum" element={<Forum/>} />
         <Route  path="profile" element={<Profile/>} />
         <Route  path="Request" element={<Request/>}  />
         <Route  path="track" element={<TrackProgress/>}  />
         <Route  path="report" element={<Report/>} />
         <Route  path="chat" element={<Chat/>} />
         <Route  path="approved" element={<Appointmentlist/>} />
         <Route  path="Servis" element={<Servis/>} />
         <Route  path="matching" element={<Matching/>} />

         </Route>
        </Routes>
    </Router>
  );
}

export default App;
