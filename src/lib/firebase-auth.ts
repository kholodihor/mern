import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseApp } from "./firebase";

let _auth: Auth | null = null;

export const getAuthInstance = (): Auth => {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
};
