import React, { useEffect, useRef, useState } from "react";
import { Button, Table, Modal, Switch } from "antd";
import UserForm from "../../../components/user-manage/UserForm.js";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateopen, setupdateopen] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false);
  // 更新时的item
  const [current, setcurrent] = useState(null);
  const addForm = useRef(null);
  const updateForm = useRef(null);
  const { roleId, region, username } = JSON.parse(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const roleObj = {
      1: "superadmin",
      2: "admin",
      3: "editor",
    };
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      const list = res.data;

      setDataSource(
        roleObj[roleId] === "superadmin"
          ? list
          : [
              ...list.filter((item) => item.username === username),
              ...list.filter(
                (item) =>
                  item.region === region && roleObj[item.roleId] === "editor"
              ),
            ]
      );
    });
  }, [roleId, region, username]);
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      const list = res.data;

      const a = list.map((item) => {
        return { key: item.id, value: item.value, label: item.title };
      });
      setregionList(a);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      const list = res.data;
      const a = list.map((item) => {
        return { key: item.id, value: item.roleName, label: item.roleName };
      });
      setroleList(a);
    });
  }, []);
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return <span>{role.roleName}</span>;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      key: "roleState",
      render: (roleState, item) => {
        return (
          <Switch
            onChange={() => handleChange(item)}
            checked={roleState}
            disabled={item.default}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      key: "operate",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
              disabled={item.default}
            />
            {"  "}
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => handleUpdate(item)}
            />
          </div>
        );
      },
    },
  ];
  const confirmMethod = (item) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      onOk() {
        // item：这一行的数据
        deleteMethod(item);
      },
      onCancel() {},
    });
  };
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/users/${item.id}`);
  };
  const addFormOK = () => {
    addForm.current
      .validateFields()
      .then((value) => {
        setOpen(false);
        addForm.current.resetFields();
        // post到后端，生成id，再设置dataSource，方便后面的删除和更新
        axios
          .post("http://localhost:5000/users", {
            username: value.username,
            password: value.password,
            roleState: true,
            default: false,
            region: value.region,
            roleId:
              value.roleId === "超级管理员"
                ? 1
                : value.roleId === "区域管理员"
                ? 2
                : 3,
          })
          .then((res) => {
            // setDataSource([...dataSource, ...res.data]);
            axios
              .get("http://localhost:5000/users?_expand=role")
              .then((res) => {
                const list = res.data;
                setDataSource(list);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (item) => {
    item.roleState = !item.roleState;
    setDataSource([...dataSource]);
    axios.patch(`http://localhost:5000/users/${item.id}`, {
      roleState: item.roleState,
    });
  };
  const handleUpdate = (item) => {
    // 异步解决：Cannot read properties of null (reading 'setFieldsValue')
    setTimeout(() => {
      if (item.roleId === 1) {
        // 禁用
        setisUpdateDisabled(true);
      } else {
        // 不禁用
        setisUpdateDisabled(false);
      }
      if (item.roleId === 1 || item.roleId === 2 || item.roleId === 3) {
        const id =
          item.roleId === 1
            ? "超级管理员"
            : item.roleId === 2
            ? "区域管理员"
            : "区域编辑";
        updateForm.current.setFieldsValue({ ...item, roleId: id });
      } else {
        updateForm.current.setFieldsValue({ ...item });
      }
    }, 0);
    setupdateopen(true);
    setcurrent(item);
  };
  const updateFormOK = () => {
    updateForm.current.validateFields().then((value) => {
      setupdateopen(false);
      updateForm.current.resetFields();
      axios
        .patch(`http://localhost:5000/users/${current.id}`, {
          username: value.username,
          password: value.password,
          region: value.region,
          roleId:
            value.roleId === "超级管理员"
              ? 1
              : value.roleId === "区域管理员"
              ? 2
              : 3,
        })
        .then((res) => {
          // setDataSource([...dataSource, ...res.data]);
          axios.get("http://localhost:5000/users?_expand=role").then((res) => {
            const list = res.data;
            setDataSource(list);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // setDataSource(
      //   dataSource.map((item) => {
      //     if (item.id === current.id) {
      //       const roleId =
      //         value.roleId === "超级管理员"
      //           ? 1
      //           : value.roleId === "区域管理员"
      //           ? 2
      //           : 3;
      //       value.roleId = roleId;
      //       console.log(item, current, "@@@", value);
      //       return {
      //         ...item,
      //         ...value,
      //       };
      //     }
      //     return item;
      //   })
      // );
      setisUpdateDisabled(!isUpdateDisabled);
    });
  };
  return (
    <div>
      <div style={{ padding: "5px 0" }}>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          添加用户
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />
      <Modal
        open={open}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
        }}
        onOk={addFormOK}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={addForm}
        ></UserForm>
      </Modal>
      <Modal
        open={updateopen}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setupdateopen(false);
          setisUpdateDisabled(!isUpdateDisabled);
        }}
        onOk={updateFormOK}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={updateForm}
          isUpdateDisabled={isUpdateDisabled}
        ></UserForm>
      </Modal>
    </div>
  );
}
