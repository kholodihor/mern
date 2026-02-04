"use client";

import { useEffect } from "react";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import { useNews } from "@/hooks/useNews";
import type { INewsArticle } from "@/types";
import NewsItem from "./news-item";

interface NewsClientWrapperProps {
  initialData: INewsArticle[];
}

const NewsClientWrapper = ({ initialData }: NewsClientWrapperProps) => {
  // Use the initialData for immediate rendering, but allow client-side updates
  const { newsList, isLoading, isError, mutate } = useNews();

  // Initialize SWR cache with the server-fetched data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      mutate(initialData, false); // Update the cache without revalidation
    }
  }, [initialData, mutate]);

  // Use initialData until client-side data is loaded
  const displayData = newsList || initialData;

  if (isError) {
    return <LoadingError />;
  }

  return (
    <div className="mt-8 space-y-12 sm:mt-12 sm:space-y-16 lg:mt-16">
      {isLoading ? (
        <Loader />
      ) : (
        displayData.map((item) => <NewsItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default NewsClientWrapper;
