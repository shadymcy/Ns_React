import { Table, Button, Modal, Tree } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentRight, setCurrentRight] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
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
            />
            {"  "}

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setIsModalOpen(true);
                setCurrentRight(item.rights);
                setCurrentId(item.id);
              }}
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
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const deleteMethod = (item) => {
    let data = dataSource.filter((e) => e.id !== item.id);
    setDataSource(data);
    axios.delete(`http://localhost:5000/roles/${item.id}`);
  };
  useEffect(() => {
    // 这个接口请求回来的数据没有key字段
    axios.get("http://localhost:5000/roles").then((res) => {
      const source = res.data;
      setDataSource(source);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const data = res.data;
      data.forEach((element) => {
        element.title = element.label;
        if (element.children.length > 0) {
          element.children.forEach((e) => (e.title = e.label));
        }
      });
      setRightList(data);
    });
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRight,
          };
        }
        return item;
      })
    );
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRight,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCheck = (checkedKeys) => {
    setCurrentRight(checkedKeys.checked);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkStrictly
          onCheck={onCheck}
          checkedKeys={currentRight}
          treeData={rightList}
        ></Tree>
      </Modal>
    </div>
  );
}
