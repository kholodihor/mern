// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsZCJdiQHgEYcaJWfkcx_ziaWzBD7z_S0",
  authDomain: "mern-e9975.firebaseapp.com",
  projectId: "mern-e9975",
  storageBucket: "mern-e9975.firebasestorage.app",
  messagingSenderId: "531587086119",
  appId: "1:531587086119:web:d83cb54900661ae13c9b02",
  measurementId: "G-MLT4ZC78B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };