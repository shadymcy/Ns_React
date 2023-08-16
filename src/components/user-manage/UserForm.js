import React, { forwardRef, useEffect, useState } from "react";
import { Input, Form, Select } from "antd";
const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setisDisabled] = useState(false);
  const { regionList, roleList, isUpdateDisabled } = props;
  useEffect(() => {
    setisDisabled(isUpdateDisabled);
  }, [isUpdateDisabled, isDisabled]);
  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={
          isDisabled
            ? []
            : [
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]
        }
      >
        <Select disabled={isDisabled} options={regionList}></Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Select
          onChange={(value) => {
            console.log(value);
            if (value === "超级管理员") {
              setisDisabled(true);
              ref.current.setFieldsValue({
                region: "",
              });
            } else {
              setisDisabled(false);
            }
          }}
          options={roleList}
        ></Select>
      </Form.Item>
    </Form>
  );
});
export default UserForm;
