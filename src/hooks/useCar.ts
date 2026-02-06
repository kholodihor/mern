import { getDb } from "@/lib/firebase-db";
import type { IGalleryItem } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import useSWR from "swr";

const fetchCarBySlug = async (slug: string) => {
  if (!slug) return null;

  const ref = collection(getDb(), "gallery");
  const slugQuery = query(ref, where("slug", "==", slug));
  const snapshot = await getDocs(slugQuery);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data() as Omit<IGalleryItem, "id">;
    return { ...data, id: snapshot.docs[0].id };
  }

  return null;
};

export const useCar = (
  slug: string,
  initialData: IGalleryItem | null = null,
) => {
  const { data: carItem, error } = useSWR<IGalleryItem | null>(
    slug ? ["car", slug] : null,
    () => fetchCarBySlug(slug),
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
      fallbackData: initialData, // Use initialData as fallback for server-side rendering
    },
  );

  return {
    carItem,
    isLoading: !error && !carItem,
    isError: error,
  };
};
