import React, { useState } from "react";
import { Button, Modal, Input, Card, Row, Col, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
      status: "To Do",
      scheduledTime: null,
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2",
      status: "In Progress",
      scheduledTime: "2025-01-29T10:00:00",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is task 3",
      status: "Done",
      scheduledTime: "2025-01-28T14:00:00",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    scheduledTime: null,
  });

  // Open modal for adding or editing tasks
  const handleOpenModal = (task = null) => {
    setCurrentTask(task);
    setNewTask(
      task
        ? { ...task }
        : { title: "", description: "", status: "To Do", scheduledTime: null }
    );
    setVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setVisible(false);
    setCurrentTask(null);
  };

  // Handle form submission to add or update task
  const handleSubmit = () => {
    if (currentTask) {
      // Update task
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id ? { ...newTask, id: task.id } : task
        )
      );
    } else {
      // Add new task
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    handleCloseModal();
  };

  // Update task status
  const handleStatusChange = (task, status) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, status, scheduledTime: null } : t
      )
    );
  };

  // Delete task
  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Хийх ажлын самбар</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
          style={{ marginBottom: "20px" }}
        >
          Таск нэмэх
        </Button>
        <Row gutter={16}>
          {["To Do", "In Progress", "Done"].map((status) => (
            <Col span={8} key={status}>
              <Card
                title={status}
                bordered={false}
                style={{
                  backgroundColor:
                    status === "Done"
                      ? "#d3f4f4"
                      : status === "In Progress"
                      ? "#f0e68c"
                      : "#ffb6c1", // Pastel color for each status
                }}
              >
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Card
                      key={task.id}
                      title={task.title}
                      extra={
                        <>
                          <Button
                            type="link"
                            onClick={() => handleOpenModal(task)}
                          >
                            Засах
                          </Button>
                          <Button
                            type="link"
                            onClick={() => handleDelete(task.id)}
                            style={{ color: "red" }}
                          >
                            Устгах
                          </Button>
                        </>
                      }
                      style={{
                        marginBottom: "10px",
                        backgroundColor:
                          task.status === "Done" ? "#e0ffe0" : "#fff",
                      }}
                    >
                      <p>{task.description}</p>
                      <p>
                        Заасан хугацаа:{" "}
                        {task.scheduledTime
                          ? new Date(task.scheduledTime).toLocaleString()
                          : "N/A"}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {task.status !== "Done" && (
                          <Button
                            type="primary"
                            onClick={() => handleStatusChange(task, "Done")}
                            style={{ marginBottom: "10px" }}
                          >
                            Хийсэн болгох
                          </Button>
                        )}
                        {task.status === "To Do" && (
                          <Button
                            type="primary"
                            onClick={() =>
                              handleStatusChange(task, "In Progress")
                            }
                            style={{ marginBottom: "10px" }}
                          >
                            Хийгдэж байгаа болгох
                          </Button>
                        )}
                        {task.status === "In Progress" && (
                          <Button
                            type="primary"
                            onClick={() => handleStatusChange(task, "To Do")}
                            style={{ marginBottom: "10px" }}
                          >
                            Хийх болгох
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for adding/editing tasks */}
        <Modal
          title={currentTask ? "Edit Task" : "Add Task"}
          visible={visible}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
        >
          <Input
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <Input.TextArea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            rows={4}
            style={{ marginTop: "10px" }}
          />
          <DatePicker
            showTime
            value={newTask.scheduledTime ? moment(newTask.scheduledTime) : null}
            onChange={(date, dateString) =>
              setNewTask({ ...newTask, scheduledTime: dateString })
            }
            style={{ marginTop: "10px", width: "100%" }}
            placeholder="Scheduled Time"
          />
          <Input
            placeholder="Task Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            style={{ marginTop: "10px" }}
          />
        </Modal>
      </div>
    </>
  );
};

export default TaskBoard;
