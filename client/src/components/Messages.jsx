import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import UIfx from "uifx";
import mp3File from "../audio/ping.mp3";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  const ping = new UIfx(mp3File, {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100,
  });

  // Messages collected upon page load
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Store the time in which the page renders initially
  const pageRenderTime = Math.floor(Date.now() / 1000);
  useEffect(() => {
    //Most recent message time gathered if available
    let mostRecentMessageTime = null;
    if (messages.length > 0) {
      mostRecentMessageTime = messages[messages.length - 1].date.seconds;
    }

    //Evaluate if a new message ocurred within a certain range from the initial render
    if (
      pageRenderTime < mostRecentMessageTime + 2 &&
      pageRenderTime > mostRecentMessageTime - 2
    ) {
      ping.play();
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
