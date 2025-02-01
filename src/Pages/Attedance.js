import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { DatePicker, Input } from "antd";
import axios from "axios";
import AttendanceTable from "../Component/AttendanceTable"; // Import the AttendanceTable component

const LOCAL_IP = window.location.hostname;

const generateDatesForMonth = (year, month) => {
  return Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) =>
      `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(
        2,
        "0"
      )}`
  );
};

const Attendance = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get(`http://${LOCAL_IP}:3000/api/users`);
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          `http://${LOCAL_IP}:3000/api/students`
        );
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const month = `${selectedMonth.getFullYear()}-${String(
          selectedMonth.getMonth() + 1
        ).padStart(2, "0")}`;
        const { data } = await axios.get(
          `http://${LOCAL_IP}:3000/api/attendance/month/${month}`
        );
        setAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchAttendance();
  }, [selectedMonth]);

  const handleMonthChange = (date) => {
    if (date) setSelectedMonth(date.toDate());
  };

  const dates = generateDatesForMonth(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth()
  );

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.user_name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>; // Or use a spinner here
  }

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
            students={students}
            attendance={attendance}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
