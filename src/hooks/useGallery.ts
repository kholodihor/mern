import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useMemo } from "react";
import useSWR from "swr";
import { CATEGORIES } from "@/constants/categories";
import { db } from "@/lib/firebase";
import { deleteFilesFromStorage } from "@/lib/firebase-storage";
import { useFilters } from "@/stores/useFilters";
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
  const { filters } = useFilters();

  const {
    data: galleryList,
    error,
    mutate,
  } = useSWR<IGalleryItem[]>("gallery", fetchGalleryItems, {
    // Performance optimizations
    revalidateIfStale: false,  // Don't revalidate on stale data
    revalidateOnFocus: false,  // Don't revalidate when window gets focus
    revalidateOnReconnect: false, // Don't revalidate on reconnect
    dedupingInterval: 60000,   // Dedupe requests within 1 minute
  });

  // Memoize filtered data calculation to reduce main-thread work
  const filteredData = useMemo(() => {
    return galleryList?.filter((item) => {
      // Fast path for "All" category
      if (filters[0] === CATEGORIES.ALL) return true;
      
      // Use some() for early termination when a match is found
      return item.categories.some((category: string) =>
        filters.includes(CATEGORIES[category])
      );
    }) || [];
  }, [galleryList, filters]);

  const deleteGalleryItem = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю статтю?")) {
      try {
        // First get the item to access its images
        const itemRef = doc(db, "gallery", id);
        const itemSnap = await getDoc(itemRef);
        const item = itemSnap.data() as IGalleryItem;

        // Handle image deletion based on URL pattern
        if (item?.images && item.images.length > 0) {
          const images = Array.isArray(item.images)
            ? item.images
            : [item.images];

          // Delete all images from Firebase Storage
          await deleteFilesFromStorage(images);
        }

        // Then delete the document from Firebase
        await deleteDoc(itemRef);
        await mutate();
        alert("Статтю успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Помилка видалення статті:", error);
      }
    }
  };

  return {
    galleryList,
    filteredData,
    isLoading: !error && !galleryList,
    isError: error,
    deleteGalleryItem,
    mutate,
  };
};
