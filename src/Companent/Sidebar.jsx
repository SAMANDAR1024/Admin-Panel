import {
  AppstoreAddOutlined,
  BankOutlined,
  BookFilled,
  BookOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
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
          label: "Products",
          icon: <AppstoreAddOutlined />,
          onClick: () => {
            navigate("/products");
          },
        },
        {
          key: "/categories",
          label: <Link to="/categories"> Categories</Link>,
          icon: <MailOutlined />,
        },
        {
          key: "/rents",
          label: <Link to="/rents"> Rents</Link>,
          icon: <BankOutlined />,
        },
        {
          key: "/users",
          label: <Link to="/users"> Users</Link>,
          icon: <UserOutlined />,
        },
        {
          key: "/stock",
          label: <Link to="/stock"> Stocks</Link>,
          icon: <BookOutlined />,
        },
        {
          key: "/books",
          label: <Link to="/books"> Books</Link>,
          icon: <BookFilled />,
        },
      ]}
    />
  );
}

export default Sidebar;
