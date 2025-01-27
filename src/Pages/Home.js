import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [startedTime, setStartedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalWorkedMinutes, setTotalWorkedMinutes] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTitle = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    return `${year} оны ${month} сарын ${day} ны цаг бүртгэл`;
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/time/today/${userId}`
      );
      setUser(response.data.data);
      setIsStarted(response.data.isStarted);
      setStartedTime(response.data.startedTime);
      setEndTime(response.data.endTime);
      setTotalWorkedMinutes(response.data.totalWorkedMinutes);
    } catch (error) {
      setError(error);
    }
  };

  const handleWorkStart = async (userId) => {
    try {
      await axios.post("http://localhost:3000/api/time/start", {
        user_id: userId,
      });
      alert("Ажил эхэллээ! Өнөөлрийн ажилд тань амжилт хүсье!");
      setIsStarted(true);
    } catch (error) {
      setError(error);
    }
  };

  const handleWorkEnd = async (userId) => {
    try {
      await axios.post("http://localhost:3000/api/time/end", {
        user_id: userId,
        endTime: new Date(),
      });
      alert("Ажил дууслаа! Сайхан амраарай!");
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const handleCodeChange = (e) => setUserCode(e.target.value);

  return (
    <div>
      <Header />
      <div className="main-container">
        {error && <p>{error.message}</p>}
        <div
          className="container"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <h1>{formatTitle(currentDateTime)}</h1>
          <div className="sub-container">
            <input
              className="select"
              placeholder="Ажилчины код оруулна уу."
              value={userCode}
              onChange={handleCodeChange}
            />
            <button className="btn1" onClick={() => getUser(userCode)}>
              ХАЙХ
            </button>
          </div>

          {user && (
            <div className="sub-container-2">
              <div className="user-info">
                <h2>Ажилчины нэр: {user.user_name}</h2>
                <p>Ажилчины код: {user.user_id}</p>
                {startedTime ? <p>Ажил эхэлсэн цаг: {startedTime}</p> : ""}
                {endTime ? <p>Ажил дууссан цаг: {endTime}</p> : ""}
                {totalWorkedMinutes ? (
                  <p>Нийт ажилласан цаг: {totalWorkedMinutes} минут </p>
                ) : (
                  ""
                )}
                <div>
                  {!isStarted ? (
                    <button
                      className="btn1"
                      style={{
                        display: endTime !== "Invalid Date" ? "none" : "block",
                      }}
                      onClick={() => handleWorkStart(user.user_id)}
                    >
                      Ажил эхэллэх
                    </button>
                  ) : (
                    <button
                      className="btn1"
                      style={{
                        display: endTime !== "Invalid Date" ? "none" : "block",
                      }}
                      onClick={() => handleWorkEnd(user.user_id)}
                    >
                      Ажил дуусгах
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
