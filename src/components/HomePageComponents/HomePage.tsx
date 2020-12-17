import React, { useState } from "react";
import TopNavBar from "../Headers/TopNavBar";
import { Layout, Menu } from "antd";
import {
  FileSyncOutlined,
  ProfileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import Dashboard from "./DashBoard";
import AllSubmissions from "./AllSubmissions";
import RecentSubmissions from "./RecentSubmissions";

const HomePage: React.FC<{}> = () => {
  const { Sider } = Layout;

  const [currentMenu, setCurrentMenu] = useState<string>("1");

  const MenuItemClickHandler = (e: any) => {
    setCurrentMenu(e.key);
  };

  return (
    <Layout>
      <TopNavBar />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="1"
              icon={<PieChartOutlined />}
              style={{ marginTop: "25px" }}
              onClick={MenuItemClickHandler}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<FileSyncOutlined />}
              onClick={MenuItemClickHandler}
            >
              Recent Submissions
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<ProfileOutlined />}
              onClick={MenuItemClickHandler}
            >
              All Submissions
            </Menu.Item>
          </Menu>
        </Sider>

        {currentMenu === "1" ? (
          <Dashboard />
        ) : currentMenu === "2" ? (
          <RecentSubmissions />
        ) : (
          // <AllSubmissions />
          <AllSubmissions />
        )}
      </Layout>
    </Layout>
  );
};

export default HomePage;
