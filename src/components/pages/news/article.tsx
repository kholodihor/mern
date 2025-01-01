"use client";

import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";
import { useNews } from "@/hooks/useNews";
import { Link } from "@/i18n/routing";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const Article = ({ id }: { id: string }) => {
  const locale = useLocale();
  const { getArticleById, fetchArticles } = useNews();

  useEffect(() => {
    const unsubscribe = fetchArticles();
    return () => unsubscribe();
  }, []);

  const article = getArticleById(id);

  return (
    <section
      id={`Article ${article?.title}`}
      className="flex min-h-screen w-full flex-col px-4 pb-20 pt-[18vh] sm:px-6 md:pt-[25vh] lg:px-8"
      aria-labelledby={`Article ${article?.title[locale]}-title`}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-12 flex items-center gap-8">
          <Link href="/news">
            <button className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10">
              <ChevronLeft className="h-6 w-6 text-gray-400 transition-colors group-hover:text-white" />
            </button>
          </Link>
          <SectionTitle
            id={`Article ${article?.title[locale]}-title`}
            title={article?.title[locale] as string}
          />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* <div className="space-y-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            {article?.full_text[locale]
              ?.split(".")
              .filter((chunk: string) => chunk.trim())
              .map((chunk: string, index: number, array: string[]) => (
                <p key={index}>
                  {chunk.trim() + (index < array.length - 1 ? "." : "")}
                </p>
              ))}
          </div> */}
          <div className="text-base leading-relaxed text-gray-300 sm:text-lg">
            {parse(article?.full_text[locale] || "Add More Details")}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Article;
