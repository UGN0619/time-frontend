import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import axios from "axios";
import { Button, Input } from "antd";

const StudentAttendancePage = () => {
  const LOCAL_IP = window.location.hostname;
  const [studentId, setStudentId] = useState(""); // Added state for studentId
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]); // Ensure teachers is initialized as an empty array
  const [selectedTeacherId, setSelectedTeacherId] = useState(null); // State for selected teacher

  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudent = async (studentId) => {
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:3000/api/students/${studentId}`
      );
      setStudent(response.data);
    } catch (error) {
      setStudent(null);
      setError(error);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:3000/api/users/`);

      console.log(response.data);
      setTeachers(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const attendance = async (teacherId, studentId) => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/api/attendance`, {
        user_id: teacherId,
        student_id: studentId,
      });
      alert("Амжилттай бүртгэгдлээ!");
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const handleCodeChange = (e) => {
    setStudentId(e.target.value); // Handle studentId input change
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value); // Handle teacher selection change
  };

  return (
    <div>
      <Header />
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
          <h1 className="title">Ирц бүртгэл</h1>
          <div className="sub-container">
            <Input
              placeholder="Сурагчийн код оруулна уу."
              value={studentId}
              onChange={handleCodeChange}
              size="large"
              className="input-code"
            />
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              size="large"
              onClick={() => getStudent(studentId)}
            >
              ХАЙХ
            </Button>
          </div>

          {student && (
            <div className="sub-container-2">
              <div className="user-info">
                <h2 className="user-name">Сайн уу? {student.name}</h2>
                Бүртгүүлэх багш:
                <select onChange={handleTeacherChange}>
                  <option value="">Сонгох</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.user_name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn1"
                  style={{
                    display: selectedTeacherId ? "block" : "none", // Show button if teacher selected
                  }}
                  onClick={() => attendance(selectedTeacherId, studentId)}
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentAttendancePage;
