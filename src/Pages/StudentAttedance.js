import React, { useState, useEffect } from "react";
import "../index.css";
import "../Style/App.css";
import axios from "axios";
import { Button, Input } from "antd";

const StudentAttendancePage = () => {
  const user_id = window.location.pathname.split("/")[2];
  const LOCAL_IP = window.location.hostname;
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudent = async (studentId) => {
    if (!studentId) {
      alert("Сурагчийн код оруулна уу.");
      return;
    }
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:3000/api/students/${studentId}`
      );
      setStudent(response.data);
      setError(null);
    } catch (error) {
      setStudent(null);
      setError(new Error("Сурагч олдсонгүй!"));
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(`http://${LOCAL_IP}:3000/api/users/`);
      const foundTeacher = response.data.find((t) => t.user_id === user_id);
      if (foundTeacher) {
        setTeacher(foundTeacher);
        setError(null);
      } else {
        setError(new Error("Багш байхгүй байна!"));
      }
    } catch (error) {
      setError(error);
    }
  };

  const attendance = async (teacherId, studentId) => {
    if (!studentId) {
      alert("Сурагчийн код оруулна уу.");
      return;
    }
    try {
      await axios.post(`http://${LOCAL_IP}:3000/api/attendance`, {
        user_id: teacherId,
        student_id: studentId,
      });
      alert("Амжилттай бүртгэгдлээ!");
      setStudent(null);
      setStudentId("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
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
          <h1 className="title">
            {teacher?.user_name || "Багш"} багшийн ирц бүртгэл
          </h1>
          <div className="sub-container">
            <Input
              placeholder="Сурагчийн код оруулна уу."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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
                <button
                  className="btn1"
                  style={{ display: teacher && student ? "block" : "none" }}
                  onClick={() => attendance(teacher.user_id, studentId)}
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendancePage;
