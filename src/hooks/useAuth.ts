/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
