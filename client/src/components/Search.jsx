import React, { useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Collect the user currently signed in
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // Query database for users that match the username state.
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      // Get database document that matches the query and set that as the user identified within the search.
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      // Capture any errors produced from database call
      setErr(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Check whether the group (chats in firestore) exists, if not create a new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDocs(db, "chats", combinedId);
    } catch (err) {}

    // Create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* If no user found, then error is displayed */}
      {err && <span>User not found!</span>}
      {/* User displayed if found within search */}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="User profile image" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
