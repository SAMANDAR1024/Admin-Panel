import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";

function RentsPage() {
  const [rents, setRents] = useState([]);
  const state = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    setLoading(true)
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.items);
        setRents(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);
  
  if (!rents) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  console.log(rents);
  
  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-2 ">Rents Page</h1>

      <div className="h-[75vh] w-full overflow-auto">
        <Table
          loading={loading}
          rowKey="id"
          style={{
            width: "100%",
            height: "75vh",
            textAlign: "center",
            margin: "auto",
          }}
          bordered
          columns={[
            {
              key: "id",
              title: "ID",
              dataIndex: "id",
            },
            {
              key: "customId",
              title: "KvID",
              dataIndex: "customId",
            },
            {
              key: "leasedAt",
              title: "Berildi",
              dataIndex: "leasedAt",
              render: (value) => {
                return new Date(value).toLocaleString("ru", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  minute: "2-digit",
                  hour: "2-digit",
                });
              },
            },
            {
              key: "returningDate",
              title: "Qaytadi",
              dataIndex: "returningDate",
              render: (value) => {
                return new Date(value).toLocaleString("ru", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
              },
            },
            {
              key: "returnedAt",
              title: "Qoldi / Jami",
              dataIndex: "returnedAt",

              render: (value) => {
                if (!value) {
                  return "-";
                }
                return new Date(value).toLocaleString("ru", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  minute: "2-digit",
                  hour: "2-digit",
                });
              },
            },
            {
              key: "returnedAt",
              title: "Qaytgan",
              dataIndex: "returnedAt",
              render: (value) => {
                return <Switch checked={value ? true : false} />;
              },
            },
            {
              key: "user",
              title: "Kitobxon",
              dataIndex: "user",
              render: (item) => {
                return (
                  <div>
                    <span className="font-bold"> {item.id}.</span>
                    {item.firstName}
                  </div>
                );
              },
            },
          ]}
          dataSource={rents.items}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: rents.totalCount,
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
          }}
        />
      </div>
    </div>
  );
}

export default RentsPage;
