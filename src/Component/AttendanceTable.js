import React from "react";
import { Button } from "antd";

const AttendanceTable = ({ teacher, dates, attendance, students }) => {
  const teacherAttendance = attendance.filter(
    (record) => record.user_id === teacher.user_id
  );

  const filteredStudents = students.filter((student) =>
    teacherAttendance.some((record) => record.student_id === student.student_id)
  );

  console.log(teacherAttendance);
  console.log(filteredStudents);

  if (teacherAttendance.length === 0 || filteredStudents.length === 0) {
    return null;
  }

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
            {filteredStudents.map((student) => (
              <tr key={student.student_id} style={{ textAlign: "center" }}>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  <strong>{student.name}</strong>
                  <p>{student.role}</p>
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
