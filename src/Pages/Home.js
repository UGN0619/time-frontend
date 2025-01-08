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
        <h1 style={{ fontSize: "40px", marginBottom: "-10px" }}>Таскууд</h1>
        <div className="container">
          <div className="sub-container">
            <button
              className="btn"
              onClick={() => {
                window.location.href = "/add";
              }}
            >
              Add Task
            </button>
            <select className="select">
              <option>All</option>
              <option>Completed</option>
              <option>Uncompleted</option>
            </select>
          </div>
          <div className="sub-container-2">
            {tasks.map((todo) => (
              <div key={todo._id} className="task">
                <div className="task-name">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={todo.completed || false}
                    onChange={() => {}}
                  />
                  <div style={{ textAlign: "left" }}>
                    <p>{todo.title}</p>
                    <p style={{ fontSize: "10px", marginTop: "-15px" }}>
                      {todo.description}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      window.location.href = `/edit/${todo._id}`;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setVisible(true);
                      setTaskIDDelete(todo._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {tasks.length === 0 && <p>No tasks found!</p>}
          </div>
        </div>

        {/* Delete Modal */}
        {isVisible && (
          <div className="delete-modal">
            <h5>Are you sure you want to delete this item?</h5>
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
