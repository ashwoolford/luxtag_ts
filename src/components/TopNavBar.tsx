import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

export default function TopNavBar() {
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="#">New Products</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="#">About</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
