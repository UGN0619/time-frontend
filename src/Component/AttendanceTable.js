import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const LOCAL_IP = window.location.hostname;

const AttendanceTable = ({ teacher, dates, attendance, students }) => {
  const [attendanceData, setAttendanceData] = useState(attendance);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "delete"
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [adminCode, setAdminCode] = useState(""); // State to hold admin code input
  const [isAdminCodeValid, setIsAdminCodeValid] = useState(true); // Flag to track code validity
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold selected student for attendance
  const [attendanceDate, setAttendanceDate] = useState(null); // State to hold selected date

  // Get today's date in "YYYY-MM-DD" format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Filter dates to ensure no date exceeds today's date
  const filteredDates = dates.filter((date) => date <= getTodayDate());

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `http://${LOCAL_IP}:3000/api/attendance/month/${filteredDates[0]}`
      );
      setAttendanceData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setAttendanceData(attendance);
  }, [attendance]);

  const teacherAttendance = attendanceData.filter(
    (record) =>
      record.user_id === teacher.user_id &&
      filteredDates.includes(record.created_date.split("T")[0])
  );

  const filteredStudents = students.filter((student) =>
    teacherAttendance.some((record) => record.student_id === student.student_id)
  );

  if (!filteredStudents || filteredStudents.length === 0) {
    return null;
  }

  const handleAdd = async (student_id, user_id, date) => {
    try {
      await axios.post(`http://${LOCAL_IP}:3000/api/attendance`, {
        student_id,
        user_id,
        created_date: date,
      });
      fetchAttendance();
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async (record_id) => {
    try {
      await axios.delete(`http://${LOCAL_IP}:3000/api/attendance/${record_id}`);
      fetchAttendance();
    } catch (error) {
      setError(error);
    }
  };

  const openModal = (type, record) => {
    setModalType(type);
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    if (adminCode === "2226") {
      if (modalType === "add") {
        await handleAdd(
          selectedStudent.student_id,
          teacher.user_id,
          attendanceDate
        );
      } else if (modalType === "delete") {
        await handleDelete(selectedRecord.record_id);
      }
      setModalVisible(false);
      setIsAdminCodeValid(true); // Reset validity on successful action
      setAdminCode(""); // Clear the input
      setSelectedStudent(null); // Clear student selection
      setAttendanceDate(null); // Clear selected date
    } else {
      setIsAdminCodeValid(false); // Mark code as invalid
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ marginBottom: "10px", color: "#61abff" }}>
          {teacher.user_name} багшийн ирц бүртгэл
        </h2>
        <Button type="primary" onClick={() => openModal("add")}>
          Ирц нэмэх
        </Button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
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
              {filteredDates.map((date) => (
                <th
                  key={date}
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
            {filteredStudents.map((student) => (
              <tr key={student.student_id} style={{ textAlign: "center" }}>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  <strong>{student.name}</strong>
                </td>
                {filteredDates.map((date) => {
                  const record = teacherAttendance.find(
                    (record) =>
                      record.student_id === student.student_id &&
                      record.created_date.split("T")[0] === date
                  );
                  return (
                    <td
                      key={date}
                      style={{ padding: "6px", border: "1px solid #ddd" }}
                    >
                      {record ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            openModal("delete", { record_id: record._id })
                          }
                        >
                          🔵
                        </div>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            openModal("add", {
                              student_id: student.student_id,
                              user_id: teacher.user_id,
                              date,
                            })
                          }
                        >
                          ✖
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      <Modal
        title={modalType === "add" ? "Ирц нэмэх" : "Ирц устгах"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText="Тийм"
        cancelText="Үгүй"
      >
        {modalType === "add" && (
          <>
            <Select
              placeholder="Сурагч сонгох"
              value={selectedStudent?.student_id}
              onChange={(value) => {
                const student = students.find((s) => s.student_id === value);
                setSelectedStudent(student);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {students.map((student) => (
                <Select.Option
                  key={student.student_id}
                  value={student.student_id}
                >
                  {student.name}
                </Select.Option>
              ))}
            </Select>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(date, dateString) => setAttendanceDate(dateString)}
              disabledDate={(current) =>
                current && current > moment().endOf("day")
              }
            />
          </>
        )}
        <Input
          type="password"
          placeholder="Admin code"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        {!isAdminCodeValid && (
          <p style={{ color: "red" }}>Таны оруулсан код буруу байна.</p>
        )}
      </Modal>
    </div>
  );
};

export default AttendanceTable;
