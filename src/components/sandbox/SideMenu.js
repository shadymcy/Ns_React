import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  QqOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
  AndroidOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import axios from "axios";
const { Sider } = Layout;
export default function SideMenu() {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [menu, setMenu] = useState([]);
  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));
  // const iconList = {
  //   "/home": <UploadOutlined />,
  //   "/user-manage": <UserOutlined />,
  //   "/user-manage/list": <VideoCameraOutlined />,
  //   "/right-manage": <UserOutlined />,
  //   "/right-manage/role/list": <AndroidOutlined />,
  //   "/right-manage/right/list": <AndroidOutlined />,
  // };
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const item = res.data.filter((element) => {
        element.children = element.children.filter(
          (e) => e.pagepermisson === 1 && rights.includes(e.key)
        );
        return element.pagepermisson === 1 && rights.includes(element.key);
      });
      // console.log("@@@", item);
      item.forEach((e) => {
        // 删除sideMenu首页的下拉
        if (e.children.length === 0) {
          e.children = null;
        }
        e.children?.forEach((el) => (el.icon = <AndroidOutlined />));
        e.icon = <QqOutlined />;
      });
      setMenu(item);
    });
  }, []);
  // const items = [
  //   {
  //     key: "/home",
  //     icon: <UserOutlined />,
  //     label: "首页",
  //   },
  //   {
  //     key: "/user-manage",
  //     icon: <VideoCameraOutlined />,
  //     label: "用户管理",
  //     children: [
  //       {
  //         key: "/user-manage/list",
  //         label: "用户列表",
  //         icon: <VideoCameraOutlined />,
  //       },
  //     ],
  //   },
  //   {
  //     key: "/right-manage",
  //     icon: <UploadOutlined />,
  //     label: "权限管理",
  //     children: [
  //       {
  //         key: "/right-manage/role/list",
  //         label: "角色列表",
  //         icon: <UploadOutlined />,
  //       },
  //       {
  //         key: "/right-manage/right/list",
  //         label: "权限列表",
  //         icon: <UploadOutlined />,
  //       },
  //     ],
  //   },
  // ];
  const onClick = (e) => {
    navigate(`${e.key}`);
  };

  const [collapsed] = useState(false);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >
        <div className="logo">新星数学网</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            onClick={onClick}
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={["/" + pathname.split("/")[1]]}
            items={menu}
          />
        </div>
      </div>
    </Sider>
  );
}
