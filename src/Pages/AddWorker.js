import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Button, Form } from "antd";
import "../Style/Add.css";
import profilePicture from "../Images/profile.png";
import { useMessage } from "../Provider/MessageProvider";

const AddWorkerPage = () => {
  const LOCAL_IP = window.location.hostname;
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

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [enteredCode, setEnteredCode] = useState("");
  const messageUtil = useMessage();

  const calculateTotalWorkingMinutes = (workingHours, workingMinutes) => {
    const hours = parseInt(workingHours) || 0;
    const minutes = parseInt(workingMinutes) || 0;
    return hours * 60 + minutes;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveWorker = () => {
    const totalMinutes = calculateTotalWorkingMinutes(
      newWorker.user_workingHours,
      newWorker.user_workingMinutes
    );

    axios
      .post(`http://${LOCAL_IP}:3000/api/users`, {
        ...newWorker,
        user_totalWorkingMinutes: totalMinutes,
      })
      .then(() => {
        messageUtil.success("Амжилттай хадгалагдлаа!");
        resetForm();
        navigate("/");
      })
      .catch((error) => {
        // Check if the error response has a message and display it
        const errorMessage =
          error?.response?.data?.message || error.message || "Алдаа гарлаа";
        setError(errorMessage);
      });
  };

  const handleCloseModal = () => {
    if (enteredCode === "2226") {
      setIsModalVisible(false);
    } else {
      messageUtil.error("Буруу код");
    }
  };

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
  };

  return (
    <div>
      <div
        className="container"
        style={{ height: "120vh", marginTop: "20px", marginBottom: "20px" }}
      >
        {error && <div className="errorMessage">{error}</div>}
        <h1 className="header-h1">Ажилчны мэдээллүүд</h1>

        <div className="profilePictureContainer">
          <div className="profilePictureBox">
            <img
              src={profilePicture}
              alt="Profile"
              className="profileImage"
              width={80}
            />
            <input type="file" accept="image/*" className="inputFile" />
          </div>
        </div>

        <Form layout="vertical" className="formWrapper">
          <Form.Item label="Ажилчны код">
            <Input
              name="user_id"
              value={newWorker.user_id}
              onChange={handleInputChange}
              maxLength={4}
            />
          </Form.Item>

          <Form.Item label="Ажилчны нэр">
            <Input
              name="user_name"
              value={newWorker.user_name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Ажилчны майл хаяг">
            <Input
              name="user_email"
              value={newWorker.user_email}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Ажилчны утасны дугаар">
            <Input
              name="user_phone"
              value={newWorker.user_phone}
              onChange={handleInputChange}
              type="number"
            />
          </Form.Item>

          <Form.Item label="Нэг өдөр ажиллах хугацаа (цагаар)">
            <Input
              name="user_workingHours"
              value={newWorker.user_workingHours}
              onChange={handleInputChange}
              type="number"
            />
          </Form.Item>

          <Form.Item label="Нэг өдөр ажиллах хугацаа (минутаар)">
            <Input
              name="user_workingMinutes"
              value={newWorker.user_workingMinutes}
              onChange={handleInputChange}
              type="number"
            />
          </Form.Item>

          <Form.Item label="Ажилчны үүрэг">
            <Input
              name="user_role"
              value={newWorker.user_role}
              onChange={handleInputChange}
              type="text"
            />
          </Form.Item>
        </Form>

        <div className="buttonGroup">
          <Button type="primary" onClick={handleSaveWorker}>
            Хадгалах
          </Button>
          <Button onClick={() => navigate("/")}>Буцах</Button>
        </div>
      </div>

      <Modal
        title="Админ код оруулна уу"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        maskClosable={false}
        closable={false}
      >
        <Input
          type="password"
          maxLength={4}
          placeholder="Админ код"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleCloseModal}
          style={{ marginTop: 10 }}
        >
          Үргэлжлүүлэх
        </Button>
      </Modal>
    </div>
  );
};

export default AddWorkerPage;
