import React, { useContext, useState } from "react";
import {
  collection,
  getDoc,
  doc,
  query,
  setDoc,
  where,
  serverTimestamp,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Collect the user currently signed in
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (typedUser) => {
    // Query database for users that match the username state.
    const q = query(
      collection(db, "users"),
      where("displayName", "==", typedUser)
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

  // Evaluate key press for the "enter" key
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
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        // Add target user to current users chat groups
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Update target users chat groups to include current user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    // Clear state of search query.
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => {
            setUsername(e.target.value);
            handleSearch(e.target.value);
          }}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {/* If no user found, then error is displayed */}
      {err && <span>User not found!</span>}
      {/* User displayed if found within search */}
      {user && (
        <div className="userSearch" onClick={handleSelect}>
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
