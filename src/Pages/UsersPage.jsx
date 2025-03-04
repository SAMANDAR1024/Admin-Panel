import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import DravelAndButton from "./Drawel/DravelAndButton";
import EditDrawer from "./Drawel/EditDrawer";
import api from "../apii/api";

function UsersPage() {
  const state = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState();
  const pageSize = 10;
  const fetchUsers = () => {
    setLoading(true);
    api
      .get("/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
     
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

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
        <DravelAndButton onRefresh={fetchUsers} />
      </div>
      <div className="h-[70vh] w-full overflow-auto">
        <EditDrawer user={user} setUser={setUser} onRefresh={fetchUsers} />
        <Table
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
              render: (id, item) => {
                return (
                  <div
                    onClick={() => {
                      setUser(item);
                    }}
                  >
                    {id}
                  </div>
                );
              },
            },
            {
              key: "firstName",
              title: "Ism",
              dataIndex: "firstName",
              render: (id, item) => {
                return (
                  <div
                    onClick={() => {
                      setUser(item);
                    }}
                  >
                    {id}
                  </div>
                );
              },
            },
            {
              key: "lastName",
              title: "Familiya",
              dataIndex: "lastName",
              render: (id, item) => {
                return (
                  <div
                    onClick={() => {
                      setUser(item);
                    }}
                  >
                    {id}
                  </div>
                );
              },
            },
            {
              key: "phone",
              title: "Telefon",
              dataIndex: "phone",
              render: (id, item) => {
                return (
                  <div
                    onClick={() => {
                      setUser(item);
                    }}
                  >
                    {id}
                  </div>
                );
              },
            },
          ]}
          dataSource={users.items || []}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: users.totalCount,
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default UsersPage;
