import React from "react";
import { Menu, Layout } from "antd";
import logo from "../Images/logo.png";

const { Header } = Layout;

const items = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const AppHeader = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" width="80px" style={{ marginLeft: "20px" }} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader;
