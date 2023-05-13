import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Menu from "../img/menu.png";

const Navbar = () => {
  // Collect user state information from context
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <img src={Menu} alt="menu" className="menu" />
      <span className="logo">DuoChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="User" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
