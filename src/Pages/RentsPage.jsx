import { message, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../apii/api";
import useAuthStore from "../store/my-store";
import DravelAndButtoRents from "./Drawel/DravelAndButtonRents";
import EditDrawer from "./Drawel/EditDrawer";

function RentsPage() {
  const state = useAuthStore();
  const [rents, setRents] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rent, setRent] = useState();
  const pageSize = 10;
  const fetchRents = () => {
    setLoading(true);
    api
      .get("/api/rents", {
        params: {
          size: pageSize,
          page: currentPage,
        },
      })
      .then((res) => {
        const books_ids = res.data.items.map((item) => {
          return item.stock.bookId;
        });

        api
          .get(`/api/books`, {
            params: {
              id: books_ids,
            },
          })
          .then((res) => {

            setBooks(res.data.items);
          });
        setRents(res.data);
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
    fetchRents();
  }, [currentPage]);

  if (!rents) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="p-5 w-full">
      <div className="flex mb-5 justify-between items-center ">
        <h1 className="text-2xl font-bold  ">Ijaralar</h1>
        <DravelAndButtoRents
          onRefresh={fetchRents}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
      </div>
      <div className="h-[70vh] w-full overflow-auto">
        <EditDrawer rent={rent} setRent={setRent} onRefresh={fetchRents} />
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
              key: "books",
              title: "Zaxira Kitoblar",
              dataIndex: "stock",
              render: (item) => {
                return <ZaxiraKitob books={books} stock={item}/>;
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
          dataSource={rents.items || []}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: rents.totalCount,
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

function ZaxiraKitob({books, stock}) {
  const book = books?.find((item)=>{
    return item.id=== stock.bookId
  })
  return(
    <div>
      {stock.id}/{stock.bookId}   {book?.name}
    </div>
  )
}

export default RentsPage;
