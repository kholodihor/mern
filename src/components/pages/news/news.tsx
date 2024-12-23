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
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby="news-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="news-title" title={t("title")} />

        <div className="mt-8 space-y-12 sm:mt-12 sm:space-y-16 lg:mt-16">
          {news.map((item, index) => (
            <article
              key={index}
              className="flex flex-col gap-6 sm:gap-8 md:flex-row lg:gap-12"
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title[locale]}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-center space-y-4 md:w-1/2">
                <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {item.title[locale]}
                </h3>
                <p className="text-base text-gray-300 sm:text-lg">
                  {item.short_text[locale]}
                </p>
                <Link
                  className="mt-2 inline-block text-lg font-medium text-white transition-colors hover:text-gray-300 hover:underline"
                  href={`/news/${item.id}`}
                >
                  {t("read_more")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
