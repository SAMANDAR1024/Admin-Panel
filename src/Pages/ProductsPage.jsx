import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("Xatolik");
      });
  }, []);

  if (!products) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-2 ">Product Page</h1>

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
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Nomi",
              dataIndex: "name",
            },
            {
              title: "Data",
              dataIndex: "createdAt",
            },
            {
              title: "Image",
              dataIndex: "image",
              render: (image) => {
                return <img className="h-10" src={image}></img>;
              },
            },
          ]}
          dataSource={products}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
