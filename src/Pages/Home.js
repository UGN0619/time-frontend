import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [isVisible, setVisible] = useState(false);
  const [taskIDDelete, setTaskIDDelete] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks!", error);
      });
  }, []);

  // Handle task deletion
  const handleDelete = (taskID) => {
    if (!taskID) {
      alert("Invalid Task ID!");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/tasks/${taskID}`)
      .then(() => {
        alert("Task deleted successfully!");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskID)
        );
        setVisible(false);
        setTaskIDDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting task!", error);
      });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "-10px" }}>ЦАГ БҮРТГЭЛ</h1>
        <div className="container">
          <div className="sub-container">
            <select className="select" defaultValue={1}>
              <option>Ажилчины нэр сонгоно уу.</option>
              <option>Name1</option>
              <option>Name2</option>
              <option>Name3</option>
            </select>
          </div>
          <div className="sub-container-2">
            <div className="task">
              <div className="task-details">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {}}
                />
              </div>
              <div>
                <button className="btn" style={{ marginRight: "10px" }}>
                  Work Start
                </button>
                <button className="btn" onClick={() => {}}>
                  Work End
                </button>
              </div>
            </div>
            {tasks.length === 0 && <p>No tasks found!</p>}
          </div>
        </div>

        {/* Delete Modal */}
        {isVisible && (
          <div className="delete-modal">
            <h5>Are you sure you want to delete this task?</h5>
            <button
              className="btn"
              onClick={() => {
                handleDelete(taskIDDelete);
              }}
            >
              Delete
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn"
              onClick={() => {
                setVisible(false);
                setTaskIDDelete(null);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
