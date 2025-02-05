import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Button, Form } from "antd";
import "../Style/Add.css";
import profilePicture from "../Images/profile.png";
import { useMessage } from "../Provider/MessageProvider";

const AddStudentPage = () => {
  const LOCAL_IP = window.location.hostname;
  const navigate = useNavigate();
  const [newWorker, setNewWorker] = useState({
    student_id: "",
    name: "",
    phone: "",
    education: "",
    role: "",
    social: "",
    email: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [enteredCode, setEnteredCode] = useState("");
  const messageUtil = useMessage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveWorker = () => {
    axios
      .post(`http://${LOCAL_IP}:3000/api/students`, {
        ...newWorker,
      })
      .then(() => {
        messageUtil.success("Амжилттай хадгалагдлаа!");
        resetForm();
        navigate("/info-students");
      })
      .catch((error) => {
        // Check if the error response has a message and display it
        messageUtil.error(`Алдаа гарлаа!: ${error.response.data}`);
      });
  };

  const handleCloseModal = () => {
    if (enteredCode === "2226") {
      setIsModalVisible(false);
    } else {
      alert("Буруу код");
    }
  };

  const resetForm = () => {
    setNewWorker({
      student_id: "",
      name: "",
      phone: "",
      education: "",
      role: "",
      social: "",
      email: "",
    });
  };

  return (
    <div>
      <div
        className="container"
        style={{ height: "120vh", marginTop: "20px", marginBottom: "20px" }}
      >
        <h1 className="header-h1">Сурагчийн мэдээллүүд</h1>

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
          <Form.Item label="Сурагчийн код">
            <Input
              name="student_id"
              value={newWorker.student_id}
              onChange={handleInputChange}
              maxLength={4}
            />
          </Form.Item>

          <Form.Item label="Сурагчийн нэр">
            <Input
              name="name"
              value={newWorker.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Сурагчийн майл хаяг">
            <Input
              name="email"
              value={newWorker.email}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Сурагчийн утасны дугаар">
            <Input
              name="user_phone"
              value={newWorker.user_phone}
              onChange={handleInputChange}
              type="number"
            />
          </Form.Item>

          <Form.Item label="Сурагчийн анги">
            <Input
              name="role"
              value={newWorker.role}
              onChange={handleInputChange}
              type="text"
            />
          </Form.Item>

          <Form.Item label="Сурагчийн боловсрол">
            <Input
              name="education"
              value={newWorker.education}
              onChange={handleInputChange}
              type="text"
            />
          </Form.Item>

          <Form.Item label="Сурагчийн socail хаяг">
            <Input
              name="social"
              value={newWorker.social}
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

export default AddStudentPage;
