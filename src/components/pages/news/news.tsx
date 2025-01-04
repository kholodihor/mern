"use client";

import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import { useNews } from "@/hooks/useNews";
import { useTranslations } from "next-intl";
import NewsItem from "./news-item";

const NewsPage = () => {
  const t = useTranslations("News");
  const { newsList, isLoading, isError } = useNews();

  if (isError) {
    return <LoadingError />
  }

  return (
    <section
      id="news"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[17vh] lg:px-8 lg:py-20"
      aria-labelledby="news-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="news-title" title={t("title")} />
        <div className="mt-8 space-y-12 sm:mt-12 sm:space-y-16 lg:mt-16">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {
                newsList && newsList.map((item, index) => (
                  <NewsItem key={index} item={item} index={index} />
                ))
              }
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
