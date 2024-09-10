"use client";

import { newsData } from "./newsData";
import { useMediaQuery } from "react-responsive";
import { useTranslations } from "next-intl";
import NewsItem from "./NewsItem";
import MobileNews from "./MobileNews";
import { INewsItem } from "@/types";

const News = () => {
  const t = useTranslations("News");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <div className="min-h-[100vh] pt-[25vh] pb-[24px]">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="mainTitle">{t("title")}</h1>
        {newsData.map((item: INewsItem, index: number) => (
          <div key={index}>
            {isTabletOrMobile ? (
              <MobileNews item={item} index={index} />
            ) : (
              <NewsItem item={item} index={index} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
