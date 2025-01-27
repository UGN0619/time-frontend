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
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pads month
    const day = String(date.getDate()).padStart(2, "0"); // Pads day
    const hours = String(date.getHours()).padStart(2, "0"); // Pads hours
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Pads minutes
    return `${year} оны ${month} сарын ${day} ${hours}:${minutes}`;
  };

  return (
    <div className="header">
      <a href="/">
        <img
          src={logo}
          alt="logo"
          width={"80px"}
          style={{ marginLeft: "20px" }}
        />
      </a>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          marginLeft: "150px",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "10px" }}>
          <a href="/addworker" className="btn">
            {" "}
            Шинэ ажилтан нэмэх
          </a>
        </div>

        <div style={{ padding: "10px" }}>
          <a href="/time-tracker" className="btn">
            {" "}
            Цагийн хүснэгт
          </a>
        </div>

        <div style={{ padding: "10px" }}>
          <a href="/info" className="btn">
            {" "}
            Мэдээлэл
          </a>
        </div>

        <div style={{ padding: "10px" }}>
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
