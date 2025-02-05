import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useMatch } from "react-router-dom";
import { Layout } from "antd";
import { MessageProvider } from "./Provider/MessageProvider"; // Import MessageProvider and useMessage
import AppHeader from "./Component/Header";
import Sidebar from "./Component/SideBar";
import ContentSection from "./Component/ContentSection";
import HomePage from "./Pages/Home";
import TimeTracker from "./Pages/TimeTracker";
import TaskBoard from "./Pages/Task";
import Info from "./Pages/Info";
import AddWorker from "./Pages/AddWorker";
import Attendance from "./Pages/Attedance";
import StudentAttendancePage from "./Pages/StudentAttedance";
import AddStudentPage from "./Pages/AddStudents";
import NotFound from "./Pages/NotFound";
import InfoStudentsPage from "./Pages/InfoStudents";

function App() {
  const storedMenu = localStorage.getItem("selectedMenu");
  const initialSelectedMenu = storedMenu || "1";
  const [selectedMenu, setSelectedMenu] = useState(initialSelectedMenu);
  const location = useLocation();

  // Use useMatch to check if the current path matches "/student-attendance/:id"
  const isStudentAttendancePage = useMatch("/student-attendance/:id");

  useEffect(() => {
    let newSelectedMenu;
    switch (location.pathname) {
      case "/":
        newSelectedMenu = "1";
        break;
      case "/time-tracker":
      case "/info":
      case "/addworker":
        newSelectedMenu = "2";
        break;
      case "/attendance":
      case "/add-student":
        newSelectedMenu = "3";
        break;
      case "/task":
        newSelectedMenu = "4";
        break;
      case "/info-students":
        newSelectedMenu = "3";
        break;
      default:
        newSelectedMenu = "1";
        break;
    }

    setSelectedMenu(newSelectedMenu);
    localStorage.setItem("selectedMenu", newSelectedMenu);
  }, [location]);

  const isHomePage = location.pathname === "/" || isStudentAttendancePage;

  return (
    <Layout>
      <AppHeader
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <Layout>
        {!isHomePage && <Sidebar selectedMenu={selectedMenu} />}
        <ContentSection>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/time-tracker" element={<TimeTracker />} />
            <Route path="/task" element={<TaskBoard />} />
            <Route path="/info" element={<Info />} />
            <Route path="/info-students" element={<InfoStudentsPage />} />
            <Route path="/addworker" element={<AddWorker />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route
              path="/student-attendance/:user_id"
              element={<StudentAttendancePage />}
            />
            <Route path="/add-student" element={<AddStudentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentSection>
      </Layout>
    </Layout>
  );
}

// Wrap App with MessageProvider
const WrappedApp = () => (
  <MessageProvider>
    <App />
  </MessageProvider>
);

export default WrappedApp;
