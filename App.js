import './App.css';
import React from 'react';
import Home from './components/Home';
import StudentLogIn from './components/StudentLogIn';
import TeacherLogIn from './components/TeacherLogIn';
import StudentSchedule from './components/StudentSchedule';
import TeacherSchedule from './components/TeacherSchedule';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <><main>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogIn />} />
          <Route path="/teacher-login" element={<TeacherLogIn />} />
          <Route path="/student-schedule" element={<StudentSchedule />} />
          <Route path="/teacher-schedule" element={<TeacherSchedule />} />
          </Routes>
        </BrowserRouter>
      </main></>
  );
}

export default App;
