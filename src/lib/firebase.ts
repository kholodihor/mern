// Import only the core Firebase app SDK — other services are split into
// separate modules (firebase-db.ts, firebase-auth.ts, firebase-storage.ts)
// so they are only loaded by the pages that actually need them.
import { getApp, getApps, initializeApp } from "firebase/app";

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

// Lazy singleton — the app is only initialized on first access
export const getFirebaseApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};
