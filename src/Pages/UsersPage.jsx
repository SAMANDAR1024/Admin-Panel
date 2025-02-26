import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import DravelAndButton from "./Drawel/DravelAndButton";

function UsersPage() {
  const state = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setUsers(res.data.items);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      }).finally(()=>{
        setLoading(false)
      })
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="p-5 w-full">
      <div className="flex mb-5 justify-between items-center ">
        <h1 className="text-2xl font-bold  ">KitobXonlar</h1>
        <DravelAndButton onRefresh= {fetchUsers} />
      </div>
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
              key: "firstName",
              title: "First Name",
              dataIndex: "firstName",
            },
            {
              key: "lastName",
              title: "Last Name",
              dataIndex: "lastName",
            },
          ]}
          dataSource={users}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default UsersPage;
