import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = (props) => {
  return (
    <div className={props.isSidebarExpanded ? "sidebar" : "sidebar closed"}>
      <Navbar
        isSidebarExpanded={props.isSidebarExpanded}
        setIsSidebarExpanded={props.setIsSidebarExpanded}
      />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
