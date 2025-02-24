import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useAuthStore from "../store/my-store";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center h-screen justify-center ">
      <Card className="w-96">
        <h1 className="text-center text-3xl font-bold  mb-5">Admin Panel</h1>
        <Form
          onFinish={(values) => {
            console.log(values);
            setLoading(true);
            axios
              .post("https://library.softly.uz/auth/signin", values)
              .then((res) => {
                console.log(res.data);

                useAuthStore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setLoading(false);
                message.success("Muvaffaqqiyatli Bajarildi...");
              })
              .catch((e) => {
                console.error(e);
                setLoading(false);
                message.error("Xatolik");
              });
          }}
        >
          <Form.Item
            name={"username"}
            rules={[
              {
                required: true,
                message: "Login Yoz...",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} size="large" placeholder="Login" />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "Parol Yoz...",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Parol"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Button htmlType="submit" type="primary" size="large" block>
            {loading && <LoadingOutlined />}
            Kirish
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
