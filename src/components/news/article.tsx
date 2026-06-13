"use client";

import ChevronLeft from "@/components/icons/chevron-left";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import Slider from "@/components/shared/slider/slider";
import { formatDate } from "@/helpers/formatDate";
import { useNews } from "@/hooks/useNews";
import { Link, useRouter } from "@/i18n/navigation";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";

const NewsImage = ({ data, index }: { data: string; index?: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isPriority = index !== undefined && index < 3;

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl">
      {/* Loading placeholder with shimmer effect */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 animate-pulse overflow-hidden bg-linear-to-r from-gray-700 to-gray-500">
          <div className="shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 text-white">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      <NextImage
        src={data}
        alt="News image"
        fill
        className={`object-cover transition-transform hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={isPriority}
        quality={isPriority ? 90 : 75}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSBIAAAABF0AQbQEz/wMz0P8AAFZQOCA+AAAAMAEAnQEqCgADAAJAOCWkAANwAP77+AAA"
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
    </div>
  );
};

const Article = ({
  slug,
  initialData = null,
}: {
  slug: string;
  initialData?: any;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const { getArticleBySlug, isLoading, isError } = useNews(initialData);

  // Clean up slug for URL paths - ensure it doesn't end with a dash
  const cleanSlug = slug.endsWith("-") ? slug.slice(0, -1) : slug;

  const newsItem = getArticleBySlug(cleanSlug);

  const NewsImageWithIndex = useMemo(
    () =>
      function NewsImageWrapper({
        data,
        index,
      }: {
        data: string;
        index?: number;
      }) {
        return <NewsImage data={data} index={index} />;
      },
    [],
  );

  useEffect(() => {
    if (!newsItem) {
      router.push("/news");
    }
  }, [newsItem, router]);

  if (isError) {
    return <LoadingError />;
  }

  if (isLoading || !newsItem) {
    return <Loader />;
  }

  return (
    <section
      id={cleanSlug}
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby={`${cleanSlug}-title`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-8 sm:mb-12">
          <Link
            href="/news"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white transition-colors hover:text-gray-300"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </Link>
          <SectionTitle
            id={`${cleanSlug}-title`}
            title={newsItem.title[locale as keyof typeof newsItem.title] || ""}
          />
        </div>

        <div className="mt-8 sm:mt-12">
          <Slider
            data={newsItem.images}
            Component={NewsImageWithIndex}
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
            {parse(
              newsItem.full_text[locale as keyof typeof newsItem.full_text] ||
                "",
            )}
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
