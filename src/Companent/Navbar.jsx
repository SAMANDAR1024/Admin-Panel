import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import useAuthStore from "../store/my-store";

function Navbar({setCollapsed,collapsed}) {
    const login =useAuthStore()
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
     <div className="flex items-center">
     <p>{login.user.username}</p>
     <Button 
     onClick={()=>{
      useAuthStore.setState({
        token: ""
      })
     }}
     >Back</Button>
     </div>
    </nav>
  );
}

export default Navbar;
