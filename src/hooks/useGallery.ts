import { db } from "@/lib/firebase";
import { IGalleryItem } from "@/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";

export const useGallery = () => {
  const [galleryList, setGalleryList] = useState<IGalleryItem[]>([]);

  const fetchGalleryAsList = () => {
    const applicationsRef = collection(db, "gallery");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      const galleryDataList: IGalleryItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<IGalleryItem, "id">; // Cast data to match the interface without `id`
        galleryDataList.push({ ...data, id: doc.id });
      });
      galleryDataList.sort((a, b) => {
        return new Date(b.created_at.seconds).getTime() - new Date(a.created_at.seconds).getTime();
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


  return {
    galleryList,
    fetchGalleryAsList,
    deleteGalleryItem,
  };
};
