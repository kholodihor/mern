"use client";

import Image from "next/image";
import { useEffect } from "react";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import { formatDate } from "@/helpers/formatDate";
import { useNews } from "@/hooks/useNews";
import { Link, useRouter } from "@/i18n/routing";
import ChevronLeft from "@/components/icons/chevron-left";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import Slider from "@/components/shared/slider/slider";

const NewsImage = ({ data }: { data: string }) => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src={data}
        alt="News image"
        fill
        className="object-cover transition-transform hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

const Article = ({ id }: { id: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const { getArticleById, isLoading, isError } = useNews();

  const newsItem = getArticleById(id);

  useEffect(() => {
    if (!newsItem) {
      router.push("/news");
    }
  }, [newsItem]);

  if (isError) {
    return <LoadingError />;
  }

  if (isLoading || !newsItem) {
    return <Loader />;
  }

  return (
    <section
      id={id}
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-8 sm:mb-12">
          <Link
            href="/news"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white transition-colors hover:text-gray-300"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </Link>
          <SectionTitle id={`${id}-title`} title={newsItem.title[locale]} />
        </div>

        <div className="mt-8 sm:mt-12">
          <Slider
            data={newsItem.images}
            Component={NewsImage}
            aria-label="News Images Slider"
            nextElName="nextNews"
            prevElName="prevNews"
            breakpoints={{
              450: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 32,
              },
            }}
          />
        </div>

        <div className="mt-8 space-y-6 sm:mt-12">
          <div className="text-base leading-relaxed text-gray-300 sm:text-lg">
            {parse(newsItem.full_text[locale] || "")}
          </div>

          {newsItem.youtubeUrl && (
            <a
              href={newsItem.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-blue-400 underline transition-colors hover:text-blue-700"
            >
              {newsItem.youtubeUrl}
            </a>
          )}

          <div className="text-sm text-gray-400">
            {formatDate(newsItem.created_at)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
