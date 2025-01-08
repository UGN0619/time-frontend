// src/Header.js

import React from "react";
import "../Style/Header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <div className="logo">
        <h1>MyWebsite</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
