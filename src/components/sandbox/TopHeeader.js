import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Space, Avatar } from "antd";
const { Header } = Layout;
export default function TopHeeader() {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));
  const items = [
    {
      key: "1",
      label: <span>{roleName}</span>,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          退出登录
        </a>
      ),
      danger: true,
    },
  ];
  return (
    <Header
      className="site-layout-background"
      style={{
        fontSize: "20px",
        padding: "0 16px",
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      <div style={{ float: "right" }}>
        <span
          style={{
            margin: "16px",
          }}
        >
          欢迎<span style={{ color: "#1890ff" }}>{username}</span>回来
        </span>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={52} icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
