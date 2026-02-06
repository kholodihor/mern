import { getAuthInstance } from "@/lib/firebase-auth";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuthInstance(), (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("There`s no user");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};
