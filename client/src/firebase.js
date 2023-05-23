import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

//Authentication emulator import
// import { connectAuthEmulator } from "firebase/auth";

//Configure application
const firebaseConfig = {
  apiKey: "AIzaSyDYYA_vyfJ0iHqbEZwzqROz44g7l_gqep4",
  authDomain: "duochat-10001.firebaseapp.com",
  projectId: "duochat-10001",
  storageBucket: "duochat-10001.appspot.com",
  messagingSenderId: "199364626952",
  appId: "1:199364626952:web:4a0aa46b5e98bceadddfbd",
};

// Initialize Firebase functionality
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();

// Initialize Google analytics functionality
const analytics = getAnalytics(app);

// Initialize Firestore database
export const db = getFirestore(app);

// Authentication emulator for testing
// connectAuthEmulator(auth, "http://localhost:9099");
