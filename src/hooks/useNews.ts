import { db } from "@/lib/firebase";
import { INewsArticle } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import useSWR from "swr";

const fetchArticles = async () => {
  const ref = collection(db, "news");
  const snapshot = await getDocs(ref);
  const articlesData: INewsArticle[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<INewsArticle, "id">;
    articlesData.push({ ...data, id: doc.id });
  });

  return articlesData.sort((a, b) => {
    return (
      new Date(b.created_at.seconds).getTime() -
      new Date(a.created_at.seconds).getTime()
    );
  });
};

export const useNews = () => {
  const {
    data: newsList,
    error,
    mutate,
  } = useSWR<INewsArticle[]>("news", fetchArticles, {
    // refreshInterval: 5000, // Refresh every 5 seconds
    // revalidateOnFocus: true,
  });

  const deleteArticle = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        const articleRef = doc(db, "news", id);
        await deleteDoc(articleRef);
        await mutate();
        alert("Article successfully deleted!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };


  const getArticleById = (id: string) => {
    return newsList?.find((article) => article.id === id);
  };

  return {
    newsList,
    fetchArticles,
    deleteArticle,
    getArticleById,
    isLoading: !error && !newsList,
    isError: error,
    mutate,
  };
};
