import { useState } from "react";
import "../index.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import "../Style/App.css";
import axios from "axios";

const AddPage = () => {
  // State to store input values
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Function to create a task
  const createTask = () => {
    axios
      .post("http://localhost:3000/api/tasks", {
        title: task.title,
        description: task.description,
        status: "completed",
      })
      .then((response) => {
        alert("Амжилттай үүслээ!");
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("There was an error creating the task!", error);
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
        <h1 style={{ fontSize: "40px" }}>Таск үүсгэх хуудас</h1>
        <div className="container">
          <div className="sub-container-2">
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
            <button className="btn" onClick={createTask}>
              Үүсгэх
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPage;
