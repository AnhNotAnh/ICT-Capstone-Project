import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, SignIn, Register, SignInAsStaff,Student_Home,Staff_Home, Supervisor_Details, CoursePage, Logbook, Current_Supervisor,Supervisor_Home, PendingRequests, AcceptedStudents, SupervisorMilestone} from './routes';
import Milestone from './components/Milestone';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="Home" element={<Home />} />
                    <Route path="About" element={<About />} />
                    <Route path="SignIn" element={<SignIn />} />
                    <Route path="SignInAsStaff" element={<SignInAsStaff />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Student_Home/:studentID/:username" element={<Student_Home />} />
                    <Route path="CoursePage/:studentID" element={<CoursePage />} />
                    <Route path="Logbook/:studentID" element={<Logbook />} /> 
                    <Route path="Milestone/:studentID" element={<Milestone />} />
                    <Route path="SupervisorMilestone/:milestoneID" element={<SupervisorMilestone />} />
                    <Route path="Staff_Home" element={<Staff_Home />} />
                    <Route path="Supervisor_Details/:studentID" element={<Supervisor_Details />} />
                    <Route path="Current_Supervisor/:studentID" element={<Current_Supervisor />} />
                    <Route path="Supervisor_Home/:accountId" element={<Supervisor_Home />} />
                    <Route path="PendingRequests/:accountId" element={<PendingRequests />} />
                    <Route path="AcceptedStudents/:accountId" element={<AcceptedStudents/>}/>
                    <Route path="" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
