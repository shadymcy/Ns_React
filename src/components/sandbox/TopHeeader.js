import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Space, Avatar } from "antd";
const { Header } = Layout;
export default function TopHeeader() {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "1",
      label: "超级管理员",
    },
    {
      key: "2",
      label: "退出登录",
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
          欢迎admin回来
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
