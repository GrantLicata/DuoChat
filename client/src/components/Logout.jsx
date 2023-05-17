import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const Logout = () => {
  return (
    <div className="logout">
      {/* Sign user out of application */}
      <button className="logoutButton" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
