import useSWR from "swr";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IGalleryItem } from "@/types";

const fetchCarBySlug = async (slug: string) => {
  if (!slug) return null;

  const ref = collection(db, "gallery");
  const slugQuery = query(ref, where("slug", "==", slug));
  const snapshot = await getDocs(slugQuery);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data() as Omit<IGalleryItem, "id">;
    return { ...data, id: snapshot.docs[0].id };
  }
  
  return null;
};

export const useCar = (slug: string) => {
  const { data: carItem, error } = useSWR<IGalleryItem | null>(
    slug ? ["car", slug] : null,
    () => fetchCarBySlug(slug),
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    carItem,
    isLoading: !error && !carItem,
    isError: error,
  };
};
