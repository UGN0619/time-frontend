import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { DatePicker, Input } from "antd";
import axios from "axios";
import AttendanceTable from "../Component/AttendanceTable";

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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, studentsRes] = await Promise.all([
          axios.get(`http://${LOCAL_IP}:3000/api/users`),
          axios.get(`http://${LOCAL_IP}:3000/api/students`),
        ]);
        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
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
        setLoading(false);
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

  if (loading) return <p>Loading...</p>;

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
        {filteredTeachers.map((teacher) => {
          const teacherAttendance = attendance.filter(
            (record) => record.user_id === teacher.user_name
          );
          if (teacherAttendance.length === 0) return null; // Exclude teacher with no attendance
          return (
            <AttendanceTable
              key={teacher.user_id}
              teacher={teacher}
              dates={dates}
              students={students.filter((student) =>
                teacherAttendance.some(
                  (record) => record.student_id === student.student_id
                )
              )} // Filter out students without attendance for this teacher
              attendance={teacherAttendance}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
