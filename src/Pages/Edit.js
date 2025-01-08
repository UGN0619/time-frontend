import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams(); // Task ID from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch task details on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task details!", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    axios
      .put(`http://localhost:3000/api/tasks/${id}`, task)
      .then(() => {
        alert("Task updated successfully!");
        navigate("/home"); // Redirect to the home page
      })
      .catch((error) => {
        console.error("Error updating task!", error);
      });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Loading task details...</p>
        </div>
        <Footer />
      </div>
    );
  }

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
        <h1 style={{ fontSize: "40px" }}>Таск засах хуудас</h1>
        <div className="container">
          <div className="sub-container-2" style={{ flexDirection: "column" }}>
            <label>Таск Нэр: </label>
            <input
              type="text"
              className="input"
              name="title"
              placeholder="Таск Нэр оруулна уу"
              value={task.title}
              onChange={handleInputChange}
            />
            <br />
            <label>Таск тайлбар: </label>
            <input
              type="text"
              className="input"
              name="description"
              placeholder="Таск тайлбар оруулна уу"
              value={task.description}
              onChange={handleInputChange}
            />
            <br />
            <button className="btn" onClick={handleSubmit}>
              Баталгаажуулах
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPage;
