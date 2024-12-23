// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: "mern-e9975.firebaseapp.com",
  projectId: "mern-e9975",
  storageBucket: "mern-e9975.firebasestorage.app",
  messagingSenderId: "531587086119",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: "G-MLT4ZC78B4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
