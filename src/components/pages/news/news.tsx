"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import SectionTitle from "@/components/shared/section-title";

const NewsPage = () => {
  const t = useTranslations("News");
  const locale = useLocale();

  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "news");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const newsData: any[] = [];
        snapshot.forEach((doc) => {
          newsData.push({ ...doc.data(), id: doc.id });
        });
        setNews(newsData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="news"
      className="flex min-h-screen w-full flex-col pt-[18vh] md:pt-[25vh]"
      aria-labelledby="news-title"
    >
      <SectionTitle id="news-title" title={t("title")} />
      <div className="mt-[10vh] flex flex-col gap-10 px-4 py-8 md:px-8 lg:px-24 xl:px-36">
        {news.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10 lg:gap-14"
          >
            {/* Responsive Image */}
            <div className="w-full flex-shrink-0 md:w-1/2">
              <Image
                src={item.image}
                alt="Car image"
                width={500}
                height={500}
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="flex w-full flex-col gap-4 text-center md:w-1/2 md:text-left">
              <h4 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                {item.title[locale]}
              </h4>
              <p className="text-base text-gray-500 md:text-lg lg:text-xl">
                {item.short_text[locale]}{" "}
                <Link
                  className="hover:text-white hover:underline"
                  href={`/news/${item.id}`}
                >
                  {t("read_more")}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
