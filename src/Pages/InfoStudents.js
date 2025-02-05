import React, { useState, useEffect } from "react";
import {
  Card,
  Breadcrumb,
  Drawer,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";
import { useMessage } from "../Provider/MessageProvider";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

const InfoStudentsPage = () => {
  const LOCAL_IP = window.location.hostname;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users for display
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState(""); // Action: "edit" or "delete"
  const [form] = Form.useForm(); // Ant Design Form instance for handling form data
  const messageUtil = useMessage(); // Message utility for showing success/error messages

  // State for filters
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [roles, setRoles] = useState([]); // To store unique roles

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get(`http://${LOCAL_IP}:3000/api/students`)
      .then((response) => {
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Initialize filtered users with all users

        // Extract unique roles from users
        const uniqueRoles = [...new Set(fetchedUsers.map((user) => user.role))];
        setRoles(uniqueRoles);
      })
      .catch((error) => console.error("Error fetching worker data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle filtering users based on name and role
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      return matchesName && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [nameFilter, roleFilter, users]);

  // Handle card click (select a user)
  const handleCardClick = (user) => {
    setSelectedUser(user);
    setVisible(true);
  };

  // Handle closing the Drawer
  const handleClose = () => {
    setVisible(false);
    setSelectedUser(null);
  };

  // Handle editing the user
  const handleEdit = () => {
    setAction("edit");
    form.setFieldsValue({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      phone: selectedUser.phone,
      education: selectedUser.education,
    });
    setIsModalVisible(true);
  };

  // Handle deleting the user
  const handleDelete = () => {
    setAction("delete");
    setIsModalVisible(true);
  };

  // Confirm edit action
  const confirmEdit = () => {
    if (!selectedUser) return;

    form
      .validateFields()
      .then((values) => {
        axios
          .put(
            `http://${LOCAL_IP}:3000/api/students/${selectedUser.student_id}`,
            values
          )
          .then(() => {
            console.log("Edit successful");
            setIsModalVisible(false);
            // Optionally: refresh user data here
            const updatedUsers = users.map((user) =>
              user.student_id === selectedUser.student_id
                ? { ...user, ...values }
                : user
            );
            setUsers(updatedUsers);

            // Show success message using utility
            messageUtil.success("Мэдээллийг амжилттай засварлалаа!");
            navigate("/info-students");
          })
          .catch((error) => {
            console.error("Error editing user:", error);
            messageUtil.error("Засвар хийхэд алдаа гарлаа!");
          });
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
        messageUtil.error("Формын мэдээллийг шалгана уу!");
      });
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (!selectedUser) return;

    axios
      .delete(`http://${LOCAL_IP}:3000/api/students/${selectedUser.student_id}`)
      .then(() => {
        // Remove user from state after successful deletion
        setUsers(
          users.filter((user) => user.student_id !== selectedUser.student_id)
        );
        setIsModalVisible(false); // Close the modal after deletion
        handleClose(); // Close the drawer after deletion

        // Show success message using utility
        messageUtil.success("Мэдээллийг амжилттай устгалаа!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        messageUtil.error("Устгах үед алдаа гарлаа!");
      });
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "Нүүр" }, { title: "Сурагч" }, { title: "Сурагчид" }]}
        style={{ margin: "16px 0" }}
      />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        {/* Filter Section */}
        <div style={{ marginBottom: "20px" }}>
          <Input
            placeholder="Нэрээр хайх"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={{ width: 200, marginRight: "10px" }}
          />
          <Select
            placeholder="Ангиар шүүх"
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            style={{ width: 200 }}
            allowClear
          >
            {roles.map((role) => (
              <Option
                key={role}
                value={role}
                style={{ display: role !== "" ? "" : "none" }}
              >
                {role}
              </Option>
            ))}
          </Select>
        </div>

        <h1 style={{ textAlign: "center", color: "#61abff" }}>
          <div>
            {filteredUsers.map((user) => (
              <Card
                key={user.student_id}
                hoverable
                style={{ width: 240, margin: "20px", display: "inline-block" }}
                cover={
                  <img
                    alt="example"
                    src={`/Images/profile-${user.student_id}.jpg`}
                    width={240}
                    onError={(e) =>
                      (e.target.src = "/Images/default-profile.png")
                    }
                  />
                }
                onClick={() => handleCardClick(user)}
              >
                <Meta
                  title={
                    <>
                      {user.name.split(" ").map((name, index) => (
                        <span key={index}>
                          {name}
                          <br />
                        </span>
                      ))}
                    </>
                  }
                  description={
                    <>
                      Майл хаяг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.email}
                      </span>
                      <br />
                      Анги:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.role}
                      </span>
                      <br />
                      Утас:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.phone}
                      </span>
                      <br />
                      Боловсролын зэрэг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.education}
                      </span>
                    </>
                  }
                />
              </Card>
            ))}
          </div>
        </h1>
      </div>

      <Drawer
        title="Ажилчны мэдээлэл"
        placement="right"
        onClose={handleClose}
        visible={visible}
        width={400}
      >
        {selectedUser && (
          <>
            <p>
              <strong>Нэр:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Майл хаяг:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Анги:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Утас:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Боловсролын зэрэг:</strong> {selectedUser.education}
            </p>
          </>
        )}
        <Button
          type="primary"
          onClick={handleEdit}
          style={{ color: "white" }}
          disabled={!selectedUser}
        >
          Засах
        </Button>
        <Button
          type="default"
          onClick={handleDelete}
          style={{ color: "white", backgroundColor: "red", marginLeft: "10px" }}
          disabled={!selectedUser}
        >
          Устгах
        </Button>
      </Drawer>

      <Modal
        title={action === "edit" ? "Засах" : "Устгах"}
        visible={isModalVisible}
        onOk={action === "edit" ? confirmEdit : confirmDelete}
        onCancel={handleCancel}
        okText="Тийм"
        cancelText="Үгүй"
      >
        {action === "edit" ? (
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Нэр"
              rules={[{ required: true, message: "Нэр оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Майл хаяг"
              rules={[{ required: true, message: "Майл хаяг оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Анги"
              rules={[{ required: true, message: "Анги оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Утас"
              rules={[{ required: true, message: "Утас оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="education"
              label="Боловсролын зэрэг"
              rules={[
                { required: true, message: "Боловсролын зэрэг оруулна уу!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        ) : (
          <p>Та энэ мэдээллийг устгах уу?</p>
        )}
      </Modal>
    </div>
  );
};

export default InfoStudentsPage;
