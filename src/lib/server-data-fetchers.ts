import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IGalleryItem, INewsArticle } from "@/types";

// Helper function to serialize Firestore data
function serializeData<T>(obj: any): T {
  return JSON.parse(JSON.stringify(obj));
}

// Server-side data fetchers for improved SEO

export async function fetchGalleryItems() {
  const applicationsRef = collection(db, "gallery");
  const snapshot = await getDocs(applicationsRef);
  const galleryDataList: IGalleryItem[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<IGalleryItem, "id">;
    galleryDataList.push({ ...data, id: doc.id });
  });

  const sortedData = galleryDataList.sort((a, b) => {
    return (
      new Date(b.created_at.seconds).getTime() -
      new Date(a.created_at.seconds).getTime()
    );
  });

  // Serialize the data to ensure it's safe to pass to client components
  return serializeData<IGalleryItem[]>(sortedData);
}

export async function fetchNewsArticles() {
  const applicationsRef = collection(db, "news");
  const snapshot = await getDocs(applicationsRef);
  const newsDataList: INewsArticle[] = [];

  snapshot.forEach((doc) => {
    newsDataList.push({ ...doc.data(), id: doc.id } as INewsArticle);
  });

  const sortedData = newsDataList.sort((a, b) => {
    return (
      new Date(b.created_at.seconds * 1000).getTime() -
      new Date(a.created_at.seconds * 1000).getTime()
    );
  });

  // Serialize the data to ensure it's safe to pass to client components
  return serializeData<INewsArticle[]>(sortedData);
}
