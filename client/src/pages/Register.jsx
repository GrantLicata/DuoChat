import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  // Managing error states
  const [err, setErr] = useState(false);

  // Submission of user information for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User creation:", res);

      // Create a unique image name
      const storageRef = ref(storage, displayName);
      console.log("Storage reference:", storageRef);

      // Upload file and associate it with user's display name
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("Upload Task", uploadTask);

      // Upload newly created user to the Firestore database with display name, email, and url to profile photo
      uploadTask.on(
        (error) => {
          setErr(true);
          console.log("Generic upload task error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("Get download initiated");
            console.log("Download URL", downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DuoChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="avatar image" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {/* If error occurs then present that error to the DOM */}
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
