import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import useSWR from "swr";
import { db } from "@/lib/firebase";
import { INewsArticle } from "@/types";
import { deleteUploadcareImages } from "@/utils/uploadcare";

const fetchArticles = async () => {
  const applicationsRef = collection(db, "news");
  const snapshot = await getDocs(applicationsRef);
  const newsDataList: INewsArticle[] = [];

  snapshot.forEach((doc) => {
    newsDataList.push({ ...doc.data(), id: doc.id } as INewsArticle);
  });

  return newsDataList.sort((a, b) => {
    return (
      new Date(b.created_at.seconds * 1000).getTime() -
      new Date(a.created_at.seconds * 1000).getTime()
    );
  });
};

export const useNews = (initialData: INewsArticle | null = null) => {
  const {
    data: newsList,
    error,
    mutate,
  } = useSWR<INewsArticle[]>("news", fetchArticles, {
    // refreshInterval: 5000, // Refresh every 5 seconds
    // revalidateOnFocus: true,
    fallbackData: initialData ? [initialData] : undefined, // Use initialData as fallback for server-side rendering
  });

  const getArticleBySlug = (slug: string) => {
    return newsList?.find((article) => article.slug === slug);
  };

  const getArticleById = (id: string) => {
    return newsList?.find((article) => article.id === id);
  };

  const deleteArticle = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю статтю?")) {
      try {
        // First get the article to access its images
        const articleRef = doc(db, "news", id);
        const articleSnap = await getDoc(articleRef);
        const article = articleSnap.data() as INewsArticle;

        // Delete images from Uploadcare if they exist
        if (article?.images && article.images.length > 0) {
          await deleteUploadcareImages(article.images);
        }

        // Then delete the document from Firebase
        await deleteDoc(articleRef);
        await mutate();
        alert("Статтю успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Помилка видалення статті:", error);
      }
    }
  };

  return {
    newsList,
    fetchArticles,
    deleteArticle,
    getArticleById,
    getArticleBySlug,
    isLoading: !error && !newsList,
    isError: error,
    mutate,
  };
};
