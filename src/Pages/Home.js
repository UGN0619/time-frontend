import React, { useState, useEffect } from "react";
import { Layout, theme, Input, Button } from "antd";
import axios from "axios";
import AppHeader from "../Component/Header";
import Sidebar from "../Component/SideBar";
import ContentSection from "../Component/ContentSection";

const HomePage = () => {
  const LOCAL_IP = "https://time-backend.onrender.com";
  const [user, setUser] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [startedTime, setStartedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalWorkedMinutes, setTotalWorkedMinutes] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      alert("Ажил эхэллээ! Өнөөдрийн ажилд тань амжилт хүсье!");
      setIsStarted(true);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const handleWorkEnd = async (userId) => {
    try {
      await axios.post(`${LOCAL_IP}/api/time/end`, {
        user_id: userId,
      });
      alert("Ажил дууслаа! Сайхан амраарай!");
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const handleCodeChange = (e) => setUserCode(e.target.value);

  return (
    <body style={{ margin: "0" }}>
      <Layout style={{ minHeight: "100vh", margin: "0" }}>
        <AppHeader />
        <Layout>
          <Sidebar background={colorBgContainer} />
          <ContentSection
            background={colorBgContainer}
            borderRadius={borderRadiusLG}
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
                  {startedTime && (
                    <p>
                      Ажил эхэлсэн цаг:{" "}
                      {new Date(startedTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  {endTime && (
                    <p>
                      Ажил дууссан цаг:{" "}
                      {new Date(endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  {totalWorkedMinutes && (
                    <p>Нийт ажилласан цаг: {totalWorkedMinutes} минут</p>
                  )}
                  <div>
                    {!isStarted ? (
                      <button
                        className="btn1"
                        onClick={() => handleWorkStart(user)}
                      >
                        Ажил эхэллэх
                      </button>
                    ) : (
                      <button
                        className="btn1"
                        style={{ backgroundColor: "red" }}
                        onClick={() => handleWorkEnd(user.user_id)}
                      >
                        Ажил дуусгах
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </ContentSection>
        </Layout>
      </Layout>
    </body>
  );
};

export default HomePage;
