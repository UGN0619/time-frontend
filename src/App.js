import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import TimeTracker from "./Pages/TimeTracker";
import TaskBoard from "./Pages/Task";
import Info from "./Pages/Info";
import AddWorker from "./Pages/AddWorker";
import Attendance from "./Pages/Attedance";
import StudentAttendancePage from "./Pages/StudentAttedance";
import AddStudentPage from "./Pages/AddStudents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/time-tracker" element={<TimeTracker />} />
        <Route path="/task" element={<TaskBoard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/addworker" element={<AddWorker />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student-attendance" element={<StudentAttendancePage />} />
        <Route path="/add-student" element={<AddStudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
