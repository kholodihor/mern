import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

interface GalleryItem {
  id: string;
  [key: string]: any;
}

export const useGallery = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  const fetchGalleryAsList = () => {
    const applicationsRef = collection(db, "gallery");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      const galleryDataList: GalleryItem[] = [];
      snapshot.forEach((doc) => {
        galleryDataList.push({ ...doc.data(), id: doc.id });
      });
      setGalleryList(galleryDataList);
    });
    return unsubscribe;
  };

  const deleteGalleryItem = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити статтю?")) {
      try {
        const itemRef = doc(db, "gallery", id);
        await deleteDoc(itemRef);
        alert("Статтю успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribeList = fetchGalleryAsList();

    return () => {
      unsubscribeList();
    };
  }, []);

  return {
    galleryList,
    fetchGalleryAsList,
    deleteGalleryItem,
  };
};
