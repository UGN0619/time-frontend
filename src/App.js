import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import AddPage from "./Pages/Add";
import EditPage from "./Pages/Edit";
import MockPage from "./Pages/Mock";
import TimeTracker from "./Pages/TimeTracker";
import About from "./Pages/About";
import Info from "./Pages/Info";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/mock" element={<MockPage />} />
        <Route path="/time-tracker" element={<TimeTracker />} />
        <Route path="/about" element={<About />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
