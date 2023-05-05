import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import Header from "../img/header.png";

const Login = () => {
  // Managing error states
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // Sign in the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  //Todo - Complete functionality
  // Signs-in Friendly Chat.
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Header} alt="Header image" className="logo" />
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {/* If error occurs then present that error to the DOM */}
          {err && <span>Something went wrong</span>}
          <button onClick={signIn}>Sign in with Google</button>
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
