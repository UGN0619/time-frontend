// Example React Component for a Workers' Work Time Tracker
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TimeTracker = () => {
  const LOCAL_IP = window.location.hostname;
  const [workers, setWorkers] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get(`http://${LOCAL_IP}:3000/api/time/date/${today}`)
      .then((response) => setWorkers(response.data))
      .catch((error) => console.error("Error fetching worker data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
  };

  return (
    <div>
      <Header />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#61abff" }}>
          Ажилчдын цагийн хүснэгт
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#61abff", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Ажилчны код
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Ажилчны нэр
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Эхлэх цаг
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Дуусах цаг
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Нийт ажилласан хугацаа
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Үндсэн ажиллах хугацаа
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Дутуу цаг
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Илүү цаг
              </th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.user_id} style={{ textAlign: "center" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {worker.user_id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {worker.user_name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {worker.startTime
                    ? new Date(worker.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {worker.endTime
                    ? new Date(worker.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {worker.totalWorkedMinutes}m
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(worker.user_workTime)}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(
                    worker.user_workTime - worker.totalWorkedMinutes
                  )}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(
                    Math.max(
                      worker.totalWorkedMinutes - worker.user_workTime,
                      0
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default TimeTracker;
