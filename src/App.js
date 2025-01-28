import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import TimeTracker from "./Pages/TimeTracker";
import TaskBoard from "./Pages/Task";
import Info from "./Pages/Info";
import AddWorker from "./Pages/AddWorker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/time-tracker" element={<TimeTracker />} />
        <Route path="/task" element={<TaskBoard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/addworker" element={<AddWorker />} />
      </Routes>
    </Router>
  );
}

export default App;
