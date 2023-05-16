import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
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

  // Messages collected upon initial page load
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Play sound on new message
  //!Effect running multiple times upon page render
  const [count, setCount] = useState(0);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      let current = count;
      setCount(current + 1);
      ping.play();
      console.log("Ping count is ", count);
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
