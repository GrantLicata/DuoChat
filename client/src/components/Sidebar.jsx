import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import Logout from "./Logout";

const Sidebar = (props) => {
  return (
    <div className={props.isSidebarExpanded ? "sidebar" : "sidebar closed"}>
      <Navbar
        isSidebarExpanded={props.isSidebarExpanded}
        setIsSidebarExpanded={props.setIsSidebarExpanded}
      />
      <Search />
      <Chats />
      <Logout />
    </div>
  );
};

export default Sidebar;
