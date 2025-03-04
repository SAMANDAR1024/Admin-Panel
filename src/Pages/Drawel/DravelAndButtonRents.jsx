import { CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, message, Select } from "antd";
import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import api from "../../apii/api";


function DrawerAndButtonRents({ onRefresh }) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    api.get(`api/users`,{}).then((res) => {
      setUser(res.data.items);
      console.log(res.data.items);

      api.get("api/stocks", {
        params:{
            "filters[busy]" : false
        }
      }).then((res) => {

        console.log(res.data.items);

        setStock(res.data.items);
      });
    });
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpenDrawer(true)} type="primary">
        + Qo‘shish
      </Button>
      <Drawer
        title={
          <div className="flex items-center justify-between ">
            <p className="text-2xl">Kitoblar qoshish</p>
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
          onFinish={(value) => {
            SetLoading(true);
            api
              .post(
                `api/rents`,
                {
                  userId: value.userId,
                  stockId: value.stockId,
                  leasedAt: value.leasedAt
                    ? value.leasedAt.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                    : null, 
                  returningDate: value.returningDate
                    ? value.returningDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                    : null, 
                }
              )
              .then((res) => {
                setIsOpenDrawer(false);
                console.log(res.data);
                message.success("Qoshildi");
                onRefresh?.();
              })
              .catch((e) => {
                message.error(e.response.data.message);
                console.error(e);
              })
              .finally(() => {
                SetLoading(false);
              });
          }}
        >
          <Form.Item label="Kitobxonlar " name={"userId"}>
            <Select
              showSearch
              placeholder="Kitobxonlar"
              options={user.map((item) => ({
                value: item.id,
                label: item.firstName,
              }))}
            />
          </Form.Item>

          <Form.Item label={"Kitob qoshish"} name={"stockId"}>
            <Select
              showSearch
              placeholder="Kitob Qoshish"
              options={stock.map((item) => ({
                value: item.id,
                label: item.book.name,
              }))}
            />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              label="Olish sanasi"
              name="leasedAt"
              rules={[{ required: true, message: "Olish sanasini tanlang!" }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Topshirish sanasi"
              name="returningDate"
              rules={[
                { required: true, message: "Topshirish sanasini tanlang!" },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </div>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerAndButtonRents;
