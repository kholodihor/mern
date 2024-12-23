"use client";

import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";
import { useNews } from "@/hooks/useNews";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const Article = ({ id }: { id: string }) => {
  const locale = useLocale();
  const { articles, fetchArticles } = useNews();

  useEffect(() => {
    const unsubscribe = fetchArticles();
    return () => unsubscribe();
  }, []);

  const article = articles?.find((a) => a.id === id);

  return (
    <section
      id={`Article ${article?.title}`}
      className="flex min-h-screen w-full flex-col px-4 sm:px-6 lg:px-8 pb-20 pt-[18vh] md:pt-[25vh]"
      aria-labelledby={`Article ${article?.title[locale]}-title`}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-8 mb-12">
          <Link href="/news">
            <button className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </Link>
          <SectionTitle
            id={`Article ${article?.title[locale]}-title`}
            title={article?.title[locale] as string}
          />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-6">
            {article?.full_text[locale]
              ?.split(".")
              .filter((chunk: string) => chunk.trim())
              .map((chunk: string, index: number, array: string[]) => (
                <p key={index}>
                  {chunk.trim() + (index < array.length - 1 ? "." : "")}
                </p>
              ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Article;