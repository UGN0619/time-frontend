import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Button, Breadcrumb } from "antd";

const { RangePicker } = DatePicker;

const TimeTracker = () => {
  const LOCAL_IP = window.location.hostname;
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split("T")[0];

  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState("");
  const [selectedDates, setSelectedDates] = useState([
    today,
    formattedTomorrow,
  ]);

  useEffect(() => {
    fetchWorkers(today, formattedTomorrow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWorkers = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:3000/api/time/date/${startDate}/${endDate}`
      );
      console.log("API Response:", response.data); // Debugging line
      setWorkers(Array.isArray(response.data) ? response.data : []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching worker data:", error);
      setError("Failed to fetch worker data.");
    }
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) return;
    const startDate = dates[0]?.format("YYYY-MM-DD");
    const endDate = dates[1]?.format("YYYY-MM-DD");
    setSelectedDates([startDate, endDate]);
    fetchWorkers(startDate, endDate);
  };

  const downloadCSV = async () => {
    const [startDate, endDate] = selectedDates;
    try {
      const res = await axios.get(
        `http://${LOCAL_IP}:3000/api/time/date/${startDate}/${endDate}`
      );

      const data = res.data;

      if (!Array.isArray(data) || data.length === 0) {
        setError("Тухайн интервалд ажилчид олдсонгүй.");
        return;
      }

      // Convert JSON to CSV
      const csvHeaders = [
        "Ажилчны код",
        "Ажилчны нэр",
        "Эхлэх цаг",
        "Дуусах цаг",
        "Нийт ажилласан хугацаа",
        "Үндсэн ажиллах хугацаа",
        "Дутуу цаг",
        "Илүү цаг",
        "Ажилсан огноо",
      ];

      const csvRows = data.map((worker) => [
        worker.user_id,
        worker.user_name,
        worker.startTime
          ? new Date(worker.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Эхлээгүй",
        worker.endTime
          ? new Date(worker.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Дуусгаагүй",
        formatDuration(worker.totalWorkedMinutes),
        formatDuration(worker.user_workTime),
        formatDuration(
          Math.max(worker.user_workTime - worker.totalWorkedMinutes, 0)
        ),
        formatDuration(
          Math.max(worker.totalWorkedMinutes - worker.user_workTime, 0)
        ),
        new Date(worker.startTime).toLocaleDateString(),
      ]);

      const csvContent = [csvHeaders, ...csvRows]
        .map((row) => row.join(","))
        .join("\n");

      // Create CSV file
      const element = document.createElement("a");
      const file = new Blob([csvContent], { type: "text/csv" });
      element.href = URL.createObjectURL(file);
      element.download = `worktime_${startDate}_${endDate}.csv`;
      document.body.appendChild(element);
      element.click();
    } catch (error) {
      setError("CSV татахад алдаа гарлаа.");
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: "Нүүр" },
          { title: "Ажилчид" },
          { title: "Цагийн хүснэгт" },
        ]}
        style={{ margin: "16px 0" }}
      />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        {error && (
          <div
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {error}
          </div>
        )}
        <h1 style={{ textAlign: "center", color: "#61abff" }}>
          Ажилчдын цагийн хүснэгт
        </h1>
        <div style={{ display: "flex", justifyContent: "right", gap: "20px" }}>
          <RangePicker
            style={{ marginBottom: "20px" }}
            onChange={handleDateChange}
          />

          <Button type="primary" onClick={downloadCSV}>
            CSV татах
          </Button>
        </div>
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
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Ажилсан өдөр
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
                    : "Дуусгаагүй"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(worker.totalWorkedMinutes)}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(worker.user_workTime)}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {formatDuration(
                    Math.max(
                      worker.user_workTime - worker.totalWorkedMinutes,
                      0
                    )
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
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {new Date(worker.startTime).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTracker;
