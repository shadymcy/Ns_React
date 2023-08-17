import React from "react";
import "./index.css";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeeader from "../../components/sandbox/TopHeeader";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import NoPermission from "./nopermission/Nopermission";

import { Layout } from "antd";
const { Content } = Layout;

export default function Sandbox() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="user-manage/list" element={<UserList />} />
            <Route path="right-manage/role/list" element={<RoleList />} />
            <Route path="right-manage/right/list" element={<RightList />} />
            <Route path="/" exact element={<Navigate to="home" />} />
            <Route path="*" element={<NoPermission />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
