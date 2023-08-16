import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const list = res.data;
      list.forEach((e) => {
        if (e.children.length === 0) {
          e.children = "";
        }
      });
      setDataSource(list);
    });
  }, []);

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
      title: "权限名称",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      key: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
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
            />
            {"  "}
            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => switchMethod(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              />
            </Popover>
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
    // grade字段 表示第几层
    if (item.grade === 1) {
      let data = dataSource.filter((e) => e.id !== item.id);
      setDataSource(data);
      axios.delete(`http://localhost:5000/rights/${item.id}`);
    } else {
      console.log(item.rightId);
      let data = dataSource.filter((d) => d.id === item.rightId);
      data[0].children = data[0].children.filter((d) => d.id !== item.id);
      setDataSource([...dataSource]);
      axios.delete(`http://localhost:5000/children/${item.id}`);
    }
  };
  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
