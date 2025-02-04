import React from "react";
import { Menu, Layout } from "antd";
import {
  FieldTimeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  CheckOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const { Sider } = Layout;

const submenuItems = {
  1: [], // No sidebar for "Нүүр"
  2: [
    {
      key: "2-1",
      label: "Цагийн хүснэгт",
      icon: <FieldTimeOutlined />,
      route: "/time-tracker",
    },
    {
      key: "2-2",
      label: "Ажилтан нэмэх",
      icon: <UserAddOutlined />,
      route: "/addworker",
    },
    {
      key: "2-3",
      label: "Ажилчид",
      icon: <UsergroupAddOutlined />,
      route: "/info",
    },
  ],
  3: [
    {
      key: "3-1",
      label: "Ирц",
      icon: <CalendarOutlined />,
      route: "/attendance",
    },
    {
      key: "3-2",
      label: "Сурагч нэмэх",
      icon: <UserAddOutlined />,
      route: "/add-student",
    },
    {
      key: "3-2",
      label: "Сурагчид",
      icon: <UsergroupAddOutlined />,
      route: "/info-students",
    },
  ],
  4: [
    {
      key: "4-1",
      label: "Таск",
      icon: <CheckOutlined />,
      route: "/task",
    },
    {
      key: "4-2",
      label: "Хурал",
      icon: <FormOutlined />,
      route: "/event",
    },
  ],
};

const Sidebar = ({ selectedMenu }) => {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        selectedKeys={[selectedMenu]} // Highlight the selected menu based on state
        style={{ height: "100%", borderRight: 0 }}
      >
        {submenuItems[selectedMenu]?.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.route ? (
              <Link to={item.route}>{item.label}</Link> // Wrap linkable items in a <Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
