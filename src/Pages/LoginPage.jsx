import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import api from "../apii/api";
import useAuthStore from "../store/my-store";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center h-screen justify-center ">
      <Card className="w-96">
        <h1 className="text-center text-3xl font-bold  mb-5">Admin Panel</h1>
        <Form
          initialValues={{
            username: "lib2",
            password: "lib22",
          }}
          onFinish={(values) => {
            setLoading(true);
            api
              .post("/auth/signin", values)
              .then((res) => {
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
                useAuthStore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setLoading(false);
                localStorage.setItem("auth", JSON.stringify(res.data));
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
