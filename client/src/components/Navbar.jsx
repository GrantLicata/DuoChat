import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Collect user state information from context
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">DuoChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="User" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
