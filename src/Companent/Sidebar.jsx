import {
  AppstoreAddOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      className=""
      style={{ maxWidth: 180, height: "90vh", padding: 4 }}
      defaultSelectedKeys={[location.pathname]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={[
        {
          key: "/",
          label: <Link to="/"> Home</Link>,
          icon: <HomeOutlined />,
        },
        {
          key: "/products",
          label: "Mahsulotlar",
          icon: <AppstoreAddOutlined />,
          onClick: () => {
            navigate("/products");
          },
        },
        {
          key: "/categories",
          label: <Link to="/categories"> Kategoriyalar</Link>,
          icon: <MailOutlined />,
        },
      ]}
    />
  );
}

export default Sidebar;
