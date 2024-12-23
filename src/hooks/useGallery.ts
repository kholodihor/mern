import useSWR from "swr";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IGalleryItem } from "@/types";

const fetchGalleryItems = async () => {
  const applicationsRef = collection(db, "gallery");
  const snapshot = await getDocs(applicationsRef);
  const galleryDataList: IGalleryItem[] = [];
  
  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<IGalleryItem, "id">;
    galleryDataList.push({ ...data, id: doc.id });
  });
  
  return galleryDataList.sort((a, b) => {
    return (
      new Date(b.created_at.seconds).getTime() -
      new Date(a.created_at.seconds).getTime()
    );
  });
};

export const useGallery = () => {
  const { data: galleryList, error, mutate } = useSWR<IGalleryItem[]>(
    "gallery",
    fetchGalleryItems,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
    }
  );

  const deleteGalleryItem = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити статтю?")) {
      try {
        const itemRef = doc(db, "gallery", id);
        await deleteDoc(itemRef);
        await mutate(); // Revalidate the cache after deletion
        alert("Статтю успішно видалено!");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return {
    galleryList,
    isLoading: !error && !galleryList,
    isError: error,
    deleteGalleryItem,
    mutate,
  };
};
