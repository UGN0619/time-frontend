import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import AddPage from "./Pages/Add";
import EditPage from "./Pages/Edit";
import MockPage from "./Pages/Mock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/mock" element={<MockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
