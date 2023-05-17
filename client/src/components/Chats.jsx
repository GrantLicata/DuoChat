import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { signOut } from "firebase/auth";

const Chats = () => {
  const [chats, setChats] = useState([]);

  // Collect the user currently signed in
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Get realtime list of chat groups associated with current user
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    // Function set to run only if current user id is present
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // Switch between chat contexts
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // Create a preview of the most recent message
  const handleTextPreview = (input) => {
    let message = input.lastMessage?.text;
    // return message;
    if (message === undefined) {
      return "";
    } else if (message.length > 20) {
      return message.slice(0, 20) + "...";
    } else {
      return message;
    }
  };

  return (
    <div className="chats">
      {/* Build chat list within sidebar */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="User profile image" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{handleTextPreview(chat[1])}</p>
            </div>
          </div>
        ))}
      {/* Sign user out of application
      <button className="logoutButton" onClick={() => signOut(auth)}>
        Logout
      </button> */}
    </div>
  );
};

export default Chats;
