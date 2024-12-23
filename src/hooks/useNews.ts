import { useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface INewsArticle {
  id: string;
  title: {
    [key: string]: string;
  };
  full_text: {
    [key: string]: string;
  };
  created_at: {
    seconds: number;
  };
}

export const useNews = () => {
  const [articles, setArticles] = useState<INewsArticle[]>([]);

  const fetchArticles = () => {
    const ref = collection(db, "news");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const articlesData: INewsArticle[] = [];
        snapshot.forEach((doc) => {
          articlesData.push({ ...doc.data(), id: doc.id } as INewsArticle);
        });
        articlesData.sort((a, b) => {
          return (
            new Date(b.created_at.seconds).getTime() -
            new Date(a.created_at.seconds).getTime()
          );
        });
        setArticles(articlesData);
      }
    });
    return unsubscribe;
  };

  const deleteArticle = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        const articleRef = doc(db, "news", id);
        await deleteDoc(articleRef);
        alert("Article successfully deleted!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const getArticleById = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  return {
    articles,
    fetchArticles,
    deleteArticle,
    getArticleById,
  };
};
