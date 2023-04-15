import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Collect user state information from context
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">DuoChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="User profile photo" />
        <span>{currentUser.displayName}</span>
        {/* Sign user out of application */}
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
