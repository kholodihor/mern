"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";

const Article = ({ id }: { id: string }) => {
  const locale = useLocale();

  const [articles, setArticles] = useState<any | null>(null);

  useEffect(() => {
    const ref = collection(db, "news");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const applicationsData: any[] = [];
        snapshot.forEach((doc) => {
          applicationsData.push({ ...doc.data(), id: doc.id });
        });
        setArticles(applicationsData);
      }
    });

    return () => unsubscribe();
  }, []);

  const article = articles?.find((a: any) => a.id === id);

  return (
    <section
      id={`Article ${article?.title}`}
      className="flex min-h-screen w-full flex-col px-[24px] pb-[100px] pt-[18vh] md:pt-[25vh]"
      aria-labelledby={`Article ${article?.title[locale]}-title`}
    >
      <SectionTitle
        id={`Article ${article?.title[locale]}-title`}
        title={article?.title[locale] as string}
      />

      <div className="mt-[10vh] flex flex-col items-start gap-6 md:flex-row md:gap-10">
        <Link href="/news">
          <button className="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl">
            <ChevronLeft />
          </button>
        </Link>

        <p className="text-base leading-relaxed text-gray-500 md:max-w-[85vw] md:text-lg lg:text-xl">
          {article?.full_text[locale]
            ?.split(".")
            .slice(
              0,
              Math.floor(article?.full_text[locale].split(".").length / 3)
            )
            .map(
              (chunk: string | number, index: number, array: string | any[]) =>
                chunk + (index < array.length - 1 ? "." : "")
            )
            .join(".")}
          <br /> <br />
          {article?.full_text[locale]
            ?.split(".")
            .slice(
              Math.floor(article?.full_text[locale].split(".").length / 3),
              Math.floor((article?.full_text[locale].split(".").length * 2) / 3)
            )
            .map(
              (chunk: string | number, index: number, array: string | any[]) =>
                chunk + (index < array.length - 1 ? "." : "")
            )
            .join(".")}
          <br /> <br />
          {article?.full_text[locale]
            ?.split(".")
            .slice(
              Math.floor((article?.full_text[locale].split(".").length * 2) / 3)
            )
            .map(
              (chunk: string | number, index: number, array: string | any[]) =>
                chunk + (index < array.length - 1 ? "." : "")
            )
            .join(".")}
        </p>
      </div>
    </section>
  );
};

export default Article;
