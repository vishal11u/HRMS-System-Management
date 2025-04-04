import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Badge } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const { Header, Sider, Content } = Layout;

const sidebarMenuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "employees",
    icon: <TeamOutlined />,
    label: "Employees",
    children: [
      { key: "employee-list", label: "Employee List" },
      { key: "employee-management", label: "Employee Management" },
    ],
  },
  {
    key: "recruitment",
    icon: <UserOutlined />,
    label: "Recruitment",
    children: [{ key: "job-postings", label: "Job Postings" }],
  },
  {
    key: "payroll",
    icon: <FileTextOutlined />,
    label: "Payroll",
    children: [{ key: "payroll-management", label: "Payroll Management" }],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

const HRMSDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const notificationMenu = (
    <Menu>
      <Menu.Item key="notification1">New employee joined</Menu.Item>
      <Menu.Item key="notification2">Performance review due</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view-all" icon={<MessageOutlined />}>
        View All Notifications
      </Menu.Item>
    </Menu>
  );

  const logOutUser = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="user-settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logOutUser} key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const pathMap: Record<string, string> = {
    dashboard: "/",
    "employee-list": "/employee-list",
    "employee-management": "/employee-management",
    "job-postings": "/job-postings",
    "payroll-management": "/payroll",
    settings: "/settings",
  };

  const getPathFromKey = (key: string): string => {
    return pathMap[key] || "/";
  };

  useEffect(() => {
    const foundKey = Object.keys(pathMap).find(
      (key) => pathMap[key] === location.pathname
    );
    setSelectedKey(foundKey || "dashboard");
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "HRMS" : "HR Management"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={(e) => {
            setSelectedKey(e.key);
            navigate(getPathFromKey(e.key));
          }}
          items={sidebarMenuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", float: "right" }} className="md:px-10 gap-x-[24px] md:gap-x-[36px]">
            <Dropdown overlay={notificationMenu} placement="bottomRight">
              <Badge count={2}>
                <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
              </Badge>
            </Dropdown>

            <Dropdown overlay={userMenu} placement="bottomRight">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  src="/api/placeholder/40/40"
                  icon={<UserOutlined />}
                  style={{ marginRight: "8px" }}
                />
                <span>{user?.username || "User"}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 18,
            minHeight: 280,
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HRMSDashboard;
