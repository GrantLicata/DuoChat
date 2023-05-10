import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Header from "../img/header.png";

const Register = () => {
  // Managing error states
  const [err, setErr] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle file state population for eventual submission
  // const handleFile = (event) => {
  //   //! This isn't working. Somehow the image file isn't being added to state.
  //   console.log(event.target.files[0]);
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  //   validateSelectedFile();
  // };

  // Validate the file size before submission
  // const validateSelectedFile = () => {
  //   const MIN_FILE_SIZE = 1024; // 1MB
  //   const MAX_FILE_SIZE = 5120; // 5MB

  //   console.log("Image file result", selectedFile);

  //   if (!selectedFile) {
  //     setErrorMsg("Please choose a file");
  //     setIsSuccess(false);
  //     return;
  //   }

  //   const fileSizeKiloBytes = selectedFile.size / 1024;
  //   console.log("Image file size", fileSizeKiloBytes);

  //   if (fileSizeKiloBytes < MIN_FILE_SIZE) {
  //     setErrorMsg("File size is less than minimum limit");
  //     setIsSuccess(false);
  //     return;
  //   }
  //   if (fileSizeKiloBytes > MAX_FILE_SIZE) {
  //     setErrorMsg("File size is greater than maximum limit");
  //     setIsSuccess(false);
  //     return;
  //   }

  //   setErrorMsg("");
  //   setIsSuccess(true);
  // };

  // Submission of user information for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const storageRef = ref(storage, displayName);

      if (file === undefined) {
        // Upload created user to Firestore database
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update the authentication side with the user profile photo.
              await updateProfile(res.user, {
                displayName,
                photoURL:
                  "https://firebasestorage.googleapis.com/v0/b/duochat-10001.appspot.com/o/free_icon_1.svg?alt=media&token=15543478-17a2-49df-80ff-8fed92e4c799",
              });
              // Create user on firestore database
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL:
                  "https://firebasestorage.googleapis.com/v0/b/duochat-10001.appspot.com/o/free_icon_1.svg?alt=media&token=15543478-17a2-49df-80ff-8fed92e4c799",
              });
              // Create user chat collection and navigate to home page
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        });
      } else {
        // Upload created user to Firestore database
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update user profile with photo
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              // Create user on firestore database
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              // Create user chat collection and navigate to home page
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        });
      }
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Header} alt="Header image" className="logo" />
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {/* //todo: Create password validation */}
          <input
            style={{ display: "none" }}
            // onChange={handleFile}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="avatar image" />
            <span>Add profile image</span>
            <p></p>
          </label>
          {/* File validation messaging */}
          {isSuccess ? (
            <p className="successMessage">Validation successful</p>
          ) : null}
          {errorMsg ? <p className="errorMessage">{errorMsg}</p> : null}
          <button>Sign up</button>
          {/* If error occurs then present that error to the DOM */}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
