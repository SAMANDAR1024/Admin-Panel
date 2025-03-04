import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, message, Radio } from "antd";
import React, { useState } from "react";
import "antd/dist/reset.css";
import axios from "axios";
import useAuthStore from "../../store/my-store";
import api from "../../apii/api";

function DrawerAndButton({onRefresh}) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const authState = useAuthStore();
  return (
    <>
      <Button onClick={() => setIsOpenDrawer(true)} type="primary">
        + Qo‘shish
      </Button>
      <Drawer
        title={
          <div className="flex items-center justify-between ">
            <p className="text-2xl">Kitobxon Qo‘shish</p>
            <p>
              <CloseOutlined
                className="cursor-pointer text-lg"
                onClick={() => setIsOpenDrawer(false)}
              />
            </p>
          </div>
        }
        closeIcon={null}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            api
              .post(
                `/api/users`,
                { ...values, phone: values.phone.toString() },
              )
              .then((res) => {
                message.success("Qo'shildi");
                setIsOpenDrawer(false);
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
              {loading ? "Yuborilmoqda" : "Qoshish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerAndButton;
