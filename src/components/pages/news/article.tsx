'use client'

import { Link } from '@/i18n/routing';
import SectionTitle from "@/components/shared/section-title"
import ChevronLeft from '@/components/icons/chevron-left';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { useNews } from '@/hooks/useNews';

const Article = ({ id }: { id: string }) => {
  const locale = useLocale();
  const newsMap = useNews();

  const article = useMemo(() => newsMap[id], [newsMap, id]);

  return (
    <section
      id={`Article ${article?.title}`}
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh] px-[24px] pb-[100px]"
      aria-labelledby={`Article ${article?.title[locale]}-title`}
    >
      <SectionTitle id={`Article ${article?.title[locale]}-title`} title={article?.title[locale] as string} />

      <div className="flex flex-col md:flex-row items-start mt-[10vh] gap-6 md:gap-10">
        <Link href="/news">
          <button className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
            <ChevronLeft />
          </button>
        </Link>

        <p className="text-base md:text-lg lg:text-xl text-gray-500 leading-relaxed md:max-w-[85vw]">
          {article?.full_text[locale]
            ?.split(".")
            .slice(0, Math.floor(article?.full_text[locale].split(".").length / 3))
            .map((chunk: string | number, index: number, array: string | any[]) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
          <br /> <br />
          {article?.full_text[locale]
            ?.split(".")
            .slice(Math.floor(article?.full_text[locale].split(".").length / 3), Math.floor((article?.full_text[locale].split(".").length * 2) / 3))
            .map((chunk: string | number, index: number, array: string | any[]) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
          <br /> <br />
          {article?.full_text[locale]
            ?.split(".")
            .slice(Math.floor((article?.full_text[locale].split(".").length * 2) / 3))
            .map((chunk: string | number, index: number, array: string | any[]) => chunk + (index < array.length - 1 ? "." : ""))
            .join(".")}
        </p>

      </div>
    </section>
  )
}

export default Article
