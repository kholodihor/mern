import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "./firebase";

let _db: Firestore | null = null;

export const getDb = (): Firestore => {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
};
