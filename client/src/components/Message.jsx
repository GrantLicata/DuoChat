import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp } from "firebase/firestore";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Generate timestamp to be placed with each message
  const messageDate = message.date.toDate().toLocaleTimeString().slice(3);

  // Reference hook brought into the application for auto scroll
  const ref = useRef();

  // Scroll to current conversation point upon sending a new message
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div ref={ref} className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="Message image"
        />
        <span>{messageDate}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* If message image present, then show image */}
        {message.img && <img src={message.img} alt="Message image" />}
      </div>
    </div>
  );
};

export default Message;
