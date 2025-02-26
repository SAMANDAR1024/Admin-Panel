import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function RentsPage() {
  const [rents, setRents] = useState([]);
  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE1Nzc3NjAsImlhdCI6MTc0MDU0MDk2MH0.UA_uz_4-lNuTVbBtStp9NEFdN515g3ivZTgo4TEpXzQ",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setRents(res.data.items);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      });
  }, []);

  if (!rents) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-2 ">Rents Page</h1>

      <div className="h-[75vh] w-full overflow-auto">
        <Table
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
          dataSource={rents}
        />
      </div>
    </div>
  );
}

export default RentsPage;
{
  /* {rents.map((item) => {
  return (
    <>
      <div>
          <p>{item.user.firstName}</p>
      </div>
    </>
  );
})} */
}
