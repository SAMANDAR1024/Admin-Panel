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
  return (
    <div className="p-5 ">
      <h1 className="text-2xl font-bold mb-2 ">Product Page</h1>

      <div className="h-145 overflow-auto">
      <Table
      style={{width:"82vw", textAlign:"center", margin:"auto"} }
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
          },{
            title: "Image",
            dataIndex: "image",
           render: (image)=>{
            return <img className="h-10" src={image}></img>
           }
          },
        ]}
        dataSource={products}
      />
      </div>
    </div>
  );
}

export default ProductsPage;
