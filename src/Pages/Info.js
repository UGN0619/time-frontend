import React, { useState, useEffect } from "react";
import { Card, Breadcrumb, Drawer, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import { useMessage } from "../Provider/MessageProvider";

const { Meta } = Card;

const InfoPage = () => {
  const LOCAL_IP = window.location.hostname;
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState(""); // Action: "edit" or "delete"
  const [form] = Form.useForm(); // Ant Design Form instance for handling form data
  const messageUtil = useMessage(); // Message utility for showing success/error messages

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get(`http://${LOCAL_IP}:3000/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching worker data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      user_name: selectedUser.user_name,
      user_email: selectedUser.user_email,
      user_role: selectedUser.user_role,
      user_phone: selectedUser.user_phone,
      user_education: selectedUser.user_education,
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
            `http://${LOCAL_IP}:3000/api/users/${selectedUser.user_id}`,
            values
          )
          .then(() => {
            console.log("Edit successful");
            setIsModalVisible(false);
            // Optionally: refresh user data here
            const updatedUsers = users.map((user) =>
              user.user_id === selectedUser.user_id
                ? { ...user, ...values }
                : user
            );
            setUsers(updatedUsers);

            // Show success message using utility
            messageUtil.success("Мэдээллийг амжилттай засварлалаа!");
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
      .delete(`http://${LOCAL_IP}:3000/api/users/${selectedUser.user_id}`)
      .then(() => {
        // Remove user from state after successful deletion
        setUsers(users.filter((user) => user.user_id !== selectedUser.user_id));
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
        items={[{ title: "Нүүр" }, { title: "Ажилчид" }, { title: "Мэдээлэл" }]}
        style={{ margin: "16px 0" }}
      />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#61abff" }}>
          <div>
            {users.map((user) => (
              <Card
                key={user.user_id}
                hoverable
                style={{ width: 240, margin: "20px", display: "inline-block" }}
                cover={
                  <img
                    alt="example"
                    src={`/Images/profile-${user.user_id}.jpg`}
                    width={240}
                    onError={(e) =>
                      (e.target.src = "/Images/default-profile.png")
                    }
                  />
                }
                onClick={() => handleCardClick(user)}
              >
                <Meta
                  title={user.user_name}
                  description={
                    <>
                      Майл хаяг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_email}
                      </span>
                      <br />
                      Албан тушаал:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_role}
                      </span>
                      <br />
                      Утас:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_phone}
                      </span>
                      <br />
                      Боловсролын зэрэг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_education}
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
              <strong>Нэр:</strong> {selectedUser.user_name}
            </p>
            <p>
              <strong>Майл хаяг:</strong> {selectedUser.user_email}
            </p>
            <p>
              <strong>Албан тушаал:</strong> {selectedUser.user_role}
            </p>
            <p>
              <strong>Утас:</strong> {selectedUser.user_phone}
            </p>
            <p>
              <strong>Боловсролын зэрэг:</strong> {selectedUser.user_education}
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
              name="user_name"
              label="Нэр"
              rules={[{ required: true, message: "Нэр оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_email"
              label="Майл хаяг"
              rules={[{ required: true, message: "Майл хаяг оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_role"
              label="Албан тушаал"
              rules={[{ required: true, message: "Албан тушаал оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_phone"
              label="Утас"
              rules={[{ required: true, message: "Утас оруулна уу!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_education"
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

export default InfoPage;
