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
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby="news-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle id="news-title" title={t("title")} />
        
        <div className="mt-8 sm:mt-12 lg:mt-16 space-y-12 sm:space-y-16">
          {news.map((item, index) => (
            <article
              key={index}
              className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12"
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

              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {item.title[locale]}
                </h3>
                <p className="text-base sm:text-lg text-gray-300">
                  {item.short_text[locale]}
                </p>
                <Link
                  className="inline-block text-white hover:text-gray-300 transition-colors mt-2 text-lg font-medium hover:underline"
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
