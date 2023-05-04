import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Chat = () => {
  const { data } = useContext(ChatContext);

  // Collect user state information from context
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <p>
          To: <span className="subjectName">{data.user?.displayName}</span>
        </p>
        {/* //ToDo: Create functionality for the elements below. */}
        {/* <div className="chatIcons">
          <img src={Cam} alt="Camera icon" />
          <img src={Add} alt="Add friend icon" />
          <img src={More} alt="More menu items icon" />
        </div> */}

        {/* //Todo: Update styling for code below to be placed in upper chat bar */}
        {/* <img src={currentUser.photoURL} alt="User profile photo" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button> */}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
