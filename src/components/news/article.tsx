"use client";

import parse from "html-react-parser";
import Head from "next/head";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import ChevronLeft from "@/components/icons/chevron-left";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import Slider from "@/components/shared/slider/slider";
import { baseUrl } from "@/constants";
import { formatDate } from "@/helpers/formatDate";
import { useNews } from "@/hooks/useNews";
import { Link, locales, useRouter } from "@/i18n/navigation";

const NewsImage = ({ data }: { data: string }) => {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl">
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

  // Generate alternate language URLs
  const alternateUrls = locales.reduce((acc: Record<string, string>, loc) => {
    acc[loc] = `${baseUrl}/${loc}/news/${cleanSlug}`;
    return acc;
  }, {});

  const newsItem = getArticleBySlug(cleanSlug);

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
    <>
      {/* Add SEO head tags */}
      <Head>
        {/* Canonical URL is now handled by Next.js Metadata API */}

        {/* Hreflang tags */}
        {Object.entries(alternateUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang === "ua" ? "uk" : lang}
            href={url}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={alternateUrls.pl} />
      </Head>

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
              title={
                newsItem.title[locale as keyof typeof newsItem.title] || ""
              }
            />
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
    </>
  );
};

export default Article;
