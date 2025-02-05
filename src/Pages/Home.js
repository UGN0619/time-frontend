import React, { useState, useEffect } from "react";
import "../index.css";
import "../Style/App.css";
import axios from "axios";
import { Input, Button } from "antd";
import { useMessage } from "../Provider/MessageProvider";

const HomePage = () => {
  const LOCAL_IP = "https://time-backend.onrender.com";
  const [user, setUser] = useState(null);
  const messageApi = useMessage();
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
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} оны ${month} сарын ${day} ны цаг бүртгэл`;
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${LOCAL_IP}/api/time/today/${userId}`);
      setUser(response.data.data);
      setIsStarted(response.data.isStarted);
      setStartedTime(response.data.startedTime);
      setEndTime(response.data.endTime);
      setTotalWorkedMinutes(response.data.totalWorkedMinutes);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error);
    }
  };

  const handleWorkStart = async (user) => {
    try {
      await axios.post(`${LOCAL_IP}/api/time/start`, {
        user_id: user.user_id,
        user_name: user.user_name,
        user_totalWorkingMinutes: user.user_totalWorkingMinutes,
      });
      messageApi.success("Ажил эхэллээ! Өнөөдрийн ажилд тань амжилт хүсье!");
      setIsStarted(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error);
    }
  };

  const handleWorkEnd = async (userId) => {
    try {
      await axios.post(`${LOCAL_IP}/api/time/end`, {
        user_id: userId,
      });
      messageApi.success("Ажил дууслаа! Сайхан амраарай!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error);
    }
  };

  const handleCodeChange = (e) => setUserCode(e.target.value);

  return (
    <div className="main-container">
      <div
        className="container"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        {error && <div className="errorMessage">{error.message}</div>}
        <h1 className="title">{formatTitle(currentDateTime)}</h1>
        <div className="sub-container">
          <Input
            placeholder="Ажилчины код оруулна уу."
            value={userCode}
            onChange={handleCodeChange}
            size="large"
            className="input-code"
          />
          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            size="large"
            onClick={() => getUser(userCode)}
          >
            ХАЙХ
          </Button>
        </div>

          {user && (
            <div className="sub-container-2">
              <div className="user-info">
                <h2 className="user-name">Ажилчины нэр: {user.user_name}</h2>
                <p>Ажилчины код: {user.user_id}</p>
                {startedTime ? (
                  <p>
                    Ажил эхэлсэн цаг:{" "}
                    {new Date(startedTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                ) : (
                  ""
                )}
                {endTime ? (
                  <p>
                    Ажил дууссан цаг:{" "}
                    {new Date(endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                ) : (
                  ""
                )}
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
                        display: endTime ? "none" : "block",
                      }}
                      onClick={() => handleWorkStart(user)}
                    >
                      Ажил эхэллэх
                    </button>
                  ) : (
                    <button
                      className="btn1"
                      style={{
                        display: endTime ? "none" : "block",
                        backgroundColor: "red",
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
        {user && (
          <div className="sub-container-2">
            <div className="user-info">
              <h2 className="user-name">Ажилчины нэр: {user.user_name}</h2>
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
                      display: endTime ? "none" : "block",
                    }}
                    onClick={() => handleWorkStart(user)}
                  >
                    Ажил эхэллэх
                  </button>
                ) : (
                  <button
                    className="btn1"
                    style={{
                      display: endTime ? "none" : "block",
                      backgroundColor: "red",
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
  );
};

export default HomePage;
