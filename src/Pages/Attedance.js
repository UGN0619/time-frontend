import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { DatePicker, Button, Input } from "antd";

// Mock Data for Teachers and Students
const teachers = [
  {
    name: "Багш 1",
    students: [
      { name: "Сурагч 1", attendance: "X" },
      { name: "Сурагч 2", attendance: "X" },
    ],
  },
  {
    name: "Багш 2",
    students: [
      { name: "Сурагч 3", attendance: "X" },
      { name: "Сурагч 4", attendance: "X" },
    ],
  },
  {
    name: "Багш 3",
    students: [
      { name: "Сурагч 5", attendance: "X" },
      { name: "Сурагч 6", attendance: "X" },
    ],
  },
];

// Utility function to generate dates for the selected month
const generateDatesForMonth = (year, month) => {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(`${month + 1}/${day}`);
  }

  return dates;
};

// AttendanceTable component to display the table structure
const AttendanceTable = ({ teacher, dates }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          tableLayout: "fixed", // Ensure columns are evenly distributed
          fontSize: "12px", // Reduced font size for better fit
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#61abff", color: "white" }}>
            <th
              style={{
                padding: "6px", // Reduced padding
                border: "1px solid #ddd",
                width: "150px", // Set a fixed width for student names
                textAlign: "center",
                fontSize: "14px", // Set font size for header
              }}
            >
              Сурагчийн нэр
            </th>
            {dates.map((date, index) => (
              <th
                key={index}
                style={{
                  padding: "6px", // Reduced padding
                  border: "1px solid #ddd",
                  textAlign: "center",
                  width: "60px", // Adjusted width to fit more data
                  fontSize: "14px", // Set font size for header
                }}
              >
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teacher.students.map((student, studentIndex) => (
            <tr key={studentIndex} style={{ textAlign: "center" }}>
              <td
                style={{
                  padding: "6px", // Reduced padding
                  border: "1px solid #ddd",
                  textAlign: "center",
                  fontSize: "12px", // Reduced font size for students' data
                }}
              >
                {student.name}
              </td>
              {dates.map((_, dateIndex) => (
                <td
                  key={dateIndex}
                  style={{
                    padding: "6px", // Reduced padding
                    border: "1px solid #ddd",
                    textAlign: "center",
                    fontSize: "12px", // Reduced font size for students' data
                  }}
                >
                  {student.attendance}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TeacherTable component that iterates over each teacher
const TeacherTable = ({ teacher, dates }) => {
  return (
    <div key={teacher.name}>
      <h1 style={{ textAlign: "left", color: "#61abff", fontSize: "20px" }}>
        {teacher.name} багшийн ирц бүртгэл
      </h1>
      <AttendanceTable teacher={teacher} dates={dates} />
    </div>
  );
};

// Main Attendance component
const Attendance = () => {
  const [searchText, setSearchText] = useState(""); // State for search input
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // State for selected month

  // Handle month selection
  const handleMonthChange = (date) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  // Generate dates for the selected month
  const dates = generateDatesForMonth(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth()
  );

  // Filter teachers based on the search input
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#61abff" }}>Ирц бүртгэл</h1>

        <div style={{ display: "flex", justifyContent: "right", gap: "20px" }}>
          <Input
            placeholder="Багшийн нэрээр хайх"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update searchText on input change
            style={{ width: "300px", height: "40px" }}
          />
          Он сар сонгох:
          <DatePicker
            picker="month"
            onChange={handleMonthChange}
            style={{ marginBottom: "20px" }}
          />
          <Button type="primary">CSV татах</Button>
        </div>

        {/* Render filtered teachers */}
        {filteredTeachers.map((teacher, index) => (
          <TeacherTable key={index} teacher={teacher} dates={dates} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
