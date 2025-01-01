import { db } from "@/lib/firebase";
import { INewsArticle } from "@/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";

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
          return b.created_at.seconds - a.created_at.seconds;
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
