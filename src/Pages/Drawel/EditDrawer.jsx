import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, message, Radio } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import React, { useState } from "react";
import useAuthStore from "../../store/my-store";

function EditDrawer({onRefresh , setUser, user}) {
  const [loading, setLoading] = useState(false);
  const authState = useAuthStore();
  return (
    <>
      
      <Drawer
        title={
          <div className="flex items-center justify-between ">
            <p className="text-2xl">Kitobxon O'zgartirish</p>
            <p>
              <CloseOutlined
                className="cursor-pointer text-lg"
                onClick={() => setUser(null)}
              />
            </p>
          </div>
        }
        closeIcon={null}
        onClose={() => setUser(null)}
        open={user? true:false}
        destroyOnClose
      >
        <Form
        initialValues={user}
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            axios
              .put(
                `https://library.softly.uz/api/users/${user.id}`,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    Authorization: `Bearer ${authState.token}`,
                  },
                }
              )
              .then((res) => {
                // console.log(res.data);
                message.success("O'zgartirildi");
                setUser(null);
                onRefresh?.()
              })
              .catch((e) => {
                console.error(e);
                message.error("Xatolik");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="Ism"
            name="firstName"
            rules={[{ required: true, message: "Ismni kiriting" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Familiya"
            name="lastName"
            rules={[{ required: true, message: "Familiyani kiriting" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Telefon Raqam"
            name="phone"
            rules={[{ required: true, message: "Telefoni Raqam kiriting" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Jinsi"
            name={"gender"}
            rules={[{ required: true, message: "Telefoni Raqam kiriting" }]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className="mt-2"
              type="primary"
              htmlType="submit"
            >
              {loading ? "Yuborilmoqda" : "O'zgartirish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default EditDrawer;
