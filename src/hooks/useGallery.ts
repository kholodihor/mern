import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
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
    // refreshInterval: 5000, // Refresh every 5 seconds
    // revalidateOnFocus: true,
  });

  const filteredData =
    galleryList?.filter((item) => {
      return filters[0] === CATEGORIES.ALL
        ? true
        : item.categories.some((category: string) =>
            filters.includes(CATEGORIES[category])
          );
    }) || [];

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
