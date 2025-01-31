import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { DatePicker, Button, Input } from "antd";

// Mock Data for Teachers
const users = [
  { user_id: "0001", user_name: "Uugantogtokh" },
  { user_id: "0002", user_name: "Bayarmaa" },
  { user_id: "0003", user_name: "Asami" },
];

// Mock Data for Students
const students = [
  { student_id: "0001", student_name: "Munkhorgil", role: "JA2" },
  { student_id: "0002", student_name: "Tselmuun", role: "JA3" },
  { student_id: "0003", student_name: "Tengis", role: "JPLTN5" },
];

// Mock Data for Attendance
const attendance = [
  { user_id: "0001", student_id: "0001", date: "2025-01-31" },
  { user_id: "0001", student_id: "0002", date: "2025-01-31" },
  { user_id: "0002", student_id: "0001", date: "2025-01-31" },
  { user_id: "0003", student_id: "0003", date: "2025-01-31" },
  { user_id: "0003", student_id: "0001", date: "2025-01-10" },
];

const generateDatesForMonth = (year, month) => {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`
    );
  }
  return dates;
};

const AttendanceTable = ({ teacher, dates }) => {
  const teacherStudents = students.filter((student) =>
    attendance.some(
      (record) =>
        record.user_id === teacher.user_id &&
        record.student_id === student.student_id
    )
  );

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px", color: "#61abff" }}>
          {teacher.user_name} багшийн ирц бүртгэл
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#61abff", color: "white" }}>
              <th
                style={{
                  padding: "6px",
                  border: "1px solid #ddd",
                  width: "150px",
                  textAlign: "center",
                }}
              >
                Сурагчийн нэр
              </th>
              {dates.map((date, index) => (
                <th
                  key={index}
                  style={{
                    padding: "6px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    width: "60px",
                  }}
                >
                  {date.split("-").slice(1).join("/")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teacherStudents.map((student) => (
              <tr key={student.student_id} style={{ textAlign: "center" }}>
                <td
                  style={{
                    padding: "6px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <strong>{student.student_name}</strong>
                  <p>{student.role}</p>
                </td>
                {dates.map((date, index) => {
                  const isPresent = attendance.some(
                    (record) =>
                      record.user_id === teacher.user_id &&
                      record.student_id === student.student_id &&
                      record.date === date
                  );
                  return (
                    <td
                      key={index}
                      style={{
                        padding: "6px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {isPresent ? (
                        <span style={{ color: "green" }}>🔵</span>
                      ) : (
                        <span style={{ color: "red" }}>✖</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="primary">CSV татах</Button>
    </div>
  );
};

const Attendance = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleMonthChange = (date) => {
    if (date) setSelectedMonth(date.toDate());
  };

  const dates = generateDatesForMonth(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth()
  );
  const filteredTeachers = users.filter((teacher) =>
    teacher.user_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#61abff" }}>Ирц бүртгэл</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            gap: "20px",
            height: "40px",
            marginBottom: "20px",
          }}
        >
          <Input
            placeholder="Багшийн нэрээр хайх"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "300px" }}
          />
          <DatePicker picker="month" onChange={handleMonthChange} />
        </div>
        {filteredTeachers.map((teacher) => (
          <AttendanceTable
            key={teacher.user_id}
            teacher={teacher}
            dates={dates}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
