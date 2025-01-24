import React, { useState, useEffect } from "react";
import "../Style/Header.css";
import logo from "../Images/logo.png"; // Specify the image file name with extension

function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year} оны ${month} сарын ${day} ${hours}:${minutes}`;
  };

  return (
    <div className="header">
      <img
        src={logo}
        alt="logo"
        width={"80px"}
        style={{ marginLeft: "20px" }}
      />
      <div style={{ display: "flex", justifyContent: "center", textAlign: "center", marginLeft: "150px", border: "1px solid black" }}>

        <div style={{ padding: "30px" }}>
          <a href="/time-tracker" className="btn">
            {" "}
            Шинэ ажилтан нэмэх
          </a>
        </div>

        <div style={{ padding: "30px" }}>
          <a href="/time-tracker" className="btn">
            {" "}
            Цагийн хүснэгт
          </a>
        </div>

        <div style={{ padding: "30px" }}>
          <a href="/info" className="btn">
            {" "}
            Мэдээлэл
          </a>
        </div>

        <div style={{ padding: "30px" }}>
          <a href="/about" className="btn">
            {" "}
            Бидний тухай
          </a>
        </div>
      </div>
      <h3 style={{ marginRight: "20px" }}>{formatDateTime(currentDateTime)}</h3>
    </div>
  );
}

export default Header;
