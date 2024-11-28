import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust based on your project structure

interface NewsItem {
  id: string;
  [key: string]: any; // Extend this with specific fields your news items contain
}

export const useNews = () => {
  const [newsMap, setNewsMap] = useState<Record<string, NewsItem>>({});

  useEffect(() => {
    const ref = collection(db, "news");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const updatedNewsMap: Record<string, NewsItem> = {};
        snapshot.forEach((doc) => {
          updatedNewsMap[doc.id] = { ...doc.data(), id: doc.id } as NewsItem;
        });
        setNewsMap(updatedNewsMap);
      }
    });
    return () => unsubscribe();
  }, []);

  return newsMap;
};