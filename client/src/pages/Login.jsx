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
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Sign in the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Header} alt="Header image" className="logo" />
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in with Email</button>
        </form>
        <button onClick={signIn} className="googleButton">
          Continue with Google
        </button>
        {/* If error occurs then present that error to the DOM */}
        {error && (
          <span style={{ textAlign: "center", color: "red" }}>
            Something went wrong
          </span>
        )}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
