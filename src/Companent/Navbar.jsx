import {
  LeftCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import React from "react";
import useAuthStore from "../store/my-store";

function Navbar({ setCollapsed, collapsed }) {
  const authState = useAuthStore();
  return (
    <nav
      className="flex items-center gap-2 p-5
       justify-between  bg-slate-800 text-white"
    >
      <div className="flex gap-1 items-center">
        {" "}
        <Button
          type="link"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <p>Logo</p>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Profilim",
              icon: <UserOutlined />,
            },
            {
              key: 2,
              label: "Sozlamalar",
              icon: <SettingOutlined />,
            },
            {
              key: 3,
              label: "Chiqish",
              danger:true,
              onClick: () => {
                localStorage.clear()
                useAuthStore.setState({
                  token: "",
                  user: null,
                });
              },
              icon: <LeftCircleOutlined />,
            },
          ],
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            className="cursor-pointer "
            // onClick={() => {
            //   useAuthStore.setState({
            //     token: "",
            //   });
            // }}
            size="large"
            icon={<UserOutlined />}
          />
          <div>
            <p>
              {authState.user.firstName} {authState.user.lastName}
            </p>
            <p>{authState.user.username}@gmail.com</p>
          </div>
        </div>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
