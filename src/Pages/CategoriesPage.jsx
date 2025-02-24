import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CategoriesPage() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("Xatolik");
      });
  }, []);
  return (
    <div className="p-5 ">
      <h1 className="text-2xl font-bold mb-2 ">Categories Page</h1>

      <div className="h-145 overflow-auto">
        <Table
          style={{ width: "82vw", textAlign: "center", margin: "auto" }}
          bordered
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Nomi",
              dataIndex: "title",
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
          dataSource={categories}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
