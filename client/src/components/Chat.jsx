import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

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
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
