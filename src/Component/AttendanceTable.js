import React from "react";
import { Button } from "antd";

const AttendanceTable = ({ teacher, dates, attendance, students }) => {
  if (!attendance || attendance.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#61abff" }}>
          {teacher.user_name} багшийн ирц бүртгэл
        </h2>
        <p>No attendance records found for this teacher.</p>
      </div>
    );
  }

  const teacherAttendance = attendance.filter(
    (record) => record.teacher_id === teacher.teacher_id
  );

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#61abff" }}>
        {teacher.user_name} багшийн ирц бүртгэл
      </h2>
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
              {dates.map((date) => (
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
            {students.map((student) => (
              <tr key={student.student_id} style={{ textAlign: "center" }}>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  <strong>{student.name}</strong>
                </td>
                {dates.map((date) => (
                  <td
                    key={date}
                    style={{ padding: "6px", border: "1px solid #ddd" }}
                  >
                    {teacherAttendance.some(
                      (record) =>
                        record.student_id === student.student_id &&
                        record.created_date.split("T")[0] === date
                    )
                      ? "🔵"
                      : "✖"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button type="primary">CSV татах</Button>
    </div>
  );
};

export default AttendanceTable;
