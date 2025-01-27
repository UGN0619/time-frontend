import React, { useState } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import "../Style/Add.css";
import profilePicture from "../Images/profile.png";

// Helper functions
const calculateTotalWorkingMinutes = (workingHours, workingMinutes) => {
  const hours = parseInt(workingHours) || 0;
  const minutes = parseInt(workingMinutes) || 0;
  return hours * 60 + minutes;
};

// Worker form input field component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="inputField">
      <label
        htmlFor={name}
        style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "95%",
          padding: "6px 12px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

const AddWorkerPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newWorker, setNewWorker] = useState({
    user_id: "",
    user_name: "",
    user_phone: "",
    user_education: "",
    user_role: "",
    user_social: "",
    user_email: "",
    user_workingHours: "",
    user_workingMinutes: "",
    user_totalWorkingMinutes: 0,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input change to save image in localStorage
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // base64 image data
        localStorage.setItem("profilePicture", base64String); // Store it in localStorage
      };
      reader.readAsDataURL(file); // Convert the file to base64 string
    }
  };

  // Save worker data and include profile picture from localStorage
  const handleSaveWorker = () => {
    const totalMinutes = calculateTotalWorkingMinutes(
      newWorker.user_workingHours,
      newWorker.user_workingMinutes
    );

    // Get the stored image from localStorage
    const profilePicture = localStorage.getItem("profilePicture");

    // Send the form data to the server, including the image data
    axios
      .post("http://localhost:3000/api/users", {
        ...newWorker,
        user_totalWorkingMinutes: totalMinutes,
        user_profilePicture: profilePicture, // Send the base64 string as part of the request
      })
      .then(() => {
        alert("Амжилттай хадгалагдлаа!");
        resetForm();
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  // Reset the form and clear profile picture from localStorage
  const resetForm = () => {
    setNewWorker({
      user_id: "",
      user_name: "",
      user_phone: "",
      user_education: "",
      user_role: "",
      user_social: "",
      user_email: "",
      user_workingHours: "",
      user_workingMinutes: "",
      user_totalWorkingMinutes: 0,
    });
    localStorage.removeItem("profilePicture"); // Clear the profile picture from localStorage
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
        <div className="container">
          {/* Error Message */}
          {error && <div className="errorMessage">{error}</div>}

          <h1 className="header-h1">Ажилчны мэдээллүүд</h1>

          {/* Profile Picture Section */}
          <div className="profilePictureContainer">
            <div className="profilePictureBox">
              <img
                src={profilePicture}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="inputFile"
              />
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="inputWrapper">
            <InputField
              label="Ажилчны код"
              name="user_id"
              value={newWorker.user_id}
              onChange={handleInputChange}
              placeholder="Кодоо оруулна уу"
            />
            <InputField
              label="Ажилчны нэр"
              name="user_name"
              value={newWorker.user_name}
              onChange={handleInputChange}
              placeholder="Нэрээ оруулна уу"
            />
          </div>

          <InputField
            label="Ажилчны Gmail хаяг"
            name="user_email"
            value={newWorker.user_email}
            onChange={handleInputChange}
            placeholder="Gmail хаягаа оруулна уу"
            type="email"
          />

          {/* Working Hours and Minutes Fields */}
          <div className="inputWrapper">
            <InputField
              label="Нэг өдөр ажиллах хугацаа (цагаар)"
              name="user_workingHours"
              value={newWorker.user_workingHours}
              onChange={handleInputChange}
              placeholder="Цагаар оруулна уу"
              type="number"
            />
            <InputField
              label="Нэг өдөр ажиллах хугацаа (минутаар)"
              name="user_workingMinutes"
              value={newWorker.user_workingMinutes}
              onChange={handleInputChange}
              placeholder="Минутаар оруулна уу"
              type="number"
            />
          </div>

          <div className="inputWrapper">
            <InputField
              label="Утасны дугаар"
              name="user_phone"
              value={newWorker.user_phone}
              onChange={handleInputChange}
              placeholder="Утасны дугаар оруулна уу"
            />
            <InputField
              label="Боловсролын зэрэг"
              name="user_education"
              value={newWorker.user_education}
              onChange={handleInputChange}
              placeholder="Боловсролын зэргээ оруулна уу"
            />
          </div>

          <div className="inputWrapper">
            <InputField
              label="Ажилчны үүрэг"
              name="user_role"
              value={newWorker.user_role}
              onChange={handleInputChange}
              placeholder="Үүргээ оруулна уу"
            />
            <InputField
              label="Цахим хаяг"
              name="user_social"
              value={newWorker.user_social}
              onChange={handleInputChange}
              placeholder="Цахим хаягаа оруулна уу"
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <button
              onClick={() => navigate("/")}
              className="actionButton cancelButton"
            >
              Буцах
            </button>
            <button
              onClick={handleSaveWorker}
              className="actionButton saveButton"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddWorkerPage;
