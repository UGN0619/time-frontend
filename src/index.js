import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Keep BrowserRouter here
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Only wrap the App component here */}
      <App />
    </Router>
  </React.StrictMode>
);
