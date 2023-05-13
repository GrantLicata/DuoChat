import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Menu from "../img/menu.png";

const Navbar = (props) => {
  const { currentUser } = useContext(AuthContext);

  // Toggle between chat and sidebar
  const handleMenu = () => {
    if (props.isSidebarExpanded === false) {
      props.setIsSidebarExpanded(true);
    } else {
      props.setIsSidebarExpanded(false);
    }
    console.log("Sidebar hidden?", props.isSidebarExpanded);
  };

  return (
    <div className="navbar">
      <img src={Menu} alt="menu" className="menu" onMouseDown={handleMenu} />
      <span className="logo">DuoChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="User" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
