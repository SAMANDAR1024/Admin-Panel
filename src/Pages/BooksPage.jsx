import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../apii/api";
import useAuthStore from "../store/my-store";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const state = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    setLoading(true);
    api
      .get("/api/books", {
        params: {
          size: pageSize,
          page: currentPage,
        },
    
      })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (!books) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  console.log(books);

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-2 ">Kitoblar</h1>

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
              key: "name",
              title: "Kitob",
              dataIndex: "name",
            },
            {
              key: "language",
              title: "Til",
              dataIndex: "language",
            },

            {
              key: "createdAt",
              title: "Yasalgan",
              dataIndex: "createdAt",
              render: (value) => {
                return new Date(value).toLocaleString("ru", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                  minute: "2-digit",
                  hour: "2-digit",
                });
              },
            },
            {
              key: "updatedAt",
              title: "Yangilangan",
              dataIndex: "updatedAt",
              render: (value) => {
                return new Date(value).toLocaleString("ru", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                  minute: "2-digit",
                  hour: "2-digit",
                });
              },
            },
          ]}
          dataSource={books?.items ? books.items : []}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: books.totalCount,
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
          }}
        />
      </div>
    </div>
  );
}

export default BooksPage;
