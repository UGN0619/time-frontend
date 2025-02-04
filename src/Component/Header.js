import React from "react";
import { Menu, Layout } from "antd";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import "../Style/Header.css";

const { Header } = Layout;

const menuItems = [
  { key: "1", label: "Нүүр", route: "/" },
  { key: "2", label: "Ажилчид", route: "/time-tracker" },
  { key: "3", label: "Сурагч", route: "/attendance" },
  { key: "4", label: "Эвент", route: "/task" },
];

const AppHeader = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <Header style={{ display: "flex", alignItems: "center", padding: "0" }}>
      <img
        src={logo}
        alt="logo"
        width="80px"
        style={{ marginLeft: "5px", marginRight: "10px" }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedMenu]} // Use selectedMenu here
        onClick={(e) => setSelectedMenu(e.key)} // Update selected menu
        items={menuItems.map((item) => ({
          key: item.key,
          label: <Link to={item.route}>{item.label}</Link>,
        }))}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader;
