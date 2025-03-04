import { CheckCircleOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../apii/api";
import useAuthStore from "../store/my-store";

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const state = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    setLoading(true);
    api
      .get("/api/stocks", {
        params: {
          size: pageSize,
          page: currentPage,
        },
      
      })
      .then((res) => {
        setStocks(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (!stocks) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  console.log(stocks);

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-2 ">Kitoblarim</h1>

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
              key: "book",
              title: "Kitob",
              dataIndex: "book",
              render: (book, item) => {
                if (!book) {
                  return "Topilmadi";
                }
                return (
                  <div>
                    <span>{item.bookId}</span>. {book.name || "Nomsiz"}
                  </div>
                );
              },
            },
            {
                key: "busy",
                title: "Bandlik",
                dataIndex: "busy",
                render: (value) => {
                    return <CheckCircleOutlined checked={value ? true : false} />;
                  },
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
          dataSource={stocks?.items ? stocks.items : []}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: stocks.totalCount,
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
          }}
        />
      </div>
    </div>
  );
}

export default StocksPage;
