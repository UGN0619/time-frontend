import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTitle = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    return `${year} оны ${month} сарын ${day} ны цаг бүртгэл`;
  };

  const getUser = (userId) => {
    axios
      .get(`http://localhost:3000/api/times/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error getting user!", error);
      });
  };

  const handleWorkStart = (taskID) => {
    axios
      .post(`http://localhost:3000/api/tasks/${taskID}/start`)
      .then(() => {
        alert("Work started successfully!");
      })
      .catch((error) => {
        console.error("Error starting work!", error);
      });
  };

  const handleWorkEnd = (taskID) => {
    axios
      .post(`http://localhost:3000/api/tasks/${taskID}/end`)
      .then(() => {
        alert("Work ended successfully!");
      })
      .catch((error) => {
        console.error("Error ending work!", error);
      });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "69vh",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>{formatTitle(currentDateTime)}</h1>
        <div className="container">
          <div className="sub-container">
            <input
              className="select"
              placeholder="Ажилчины код оруулна уу."
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <button
              className="btn1"
              onClick={() => {
                getUser(userCode);
                setVisible(true);
              }}
            >
              ХАЙХ
            </button>
          </div>
          <div className="sub-container-2">
            {visible ? (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Tuguldur</h2>
                <div>
                  <button className="btn1" onClick={handleWorkStart}>
                    Work Start
                  </button>
                  <button
                    className="btn1"
                    onClick={handleWorkEnd}
                    style={{ display: "none" }}
                  >
                    Work End
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
