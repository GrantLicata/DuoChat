import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import Menu from "../img/menu.png";

const Chat = (props) => {
  const { data } = useContext(ChatContext);

  // Collect user state information from context
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
    <div className="chat">
      <div
        className={
          props.isSidebarExpanded ? "chatInfo" : "chatInfo sidebarClosed"
        }
      >
        <img src={Menu} alt="menu" className="menu" onMouseDown={handleMenu} />
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
