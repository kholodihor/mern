"use client";

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import parse from "html-react-parser";
import { useLocale, useTranslations } from "next-intl";
import { FaChevronLeft } from "react-icons/fa6";
import { baseUrl } from "@/constants";
import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { useCar } from "@/hooks/useCar";
import { Link, locales } from "@/i18n/routing";
// No need for usePathname
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import Slider from "@/components/shared/slider/slider";

// Component to preload critical car images
function PreloadCarImages({ images }: { images: string[] }) {
  return (
    <>
      {images.slice(0, 6).map((src, index) => (
        <link key={index} rel="preload" href={src} as="image" type="image/*" />
      ))}
    </>
  );
}

const CarImage = ({ data, index }: { data: string; index?: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isPriority = index !== undefined && index < 3; // Prioritize first 3 images
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-800/50">
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 z-10 h-full w-full animate-pulse overflow-hidden bg-gradient-to-r from-gray-700 to-gray-500">
          <div className="shimmer absolute inset-0 bg-transparent"></div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 text-white">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      <Image
        src={data}
        alt="Car image"
        fill
        className={`object-cover transition-all duration-300 hover:scale-105 ${
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
        style={{ transform: "translate3d(0, 0, 0)" }} // Force GPU acceleration
      />
    </div>
  );
};

const CarPage = ({
  slug,
  initialData = null,
}: {
  slug: string;
  initialData?: any;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  // No need for pathname variable
  const { carItem, isLoading, isError } = useCar(slug, initialData);

  // Clean up slug for URL paths - ensure it doesn't end with a dash
  const cleanSlug = slug.endsWith("-") ? slug.slice(0, -1) : slug;

  // Generate alternate language URLs
  const alternateUrls = locales.reduce((acc: Record<string, string>, loc) => {
    acc[loc] = `${baseUrl}/${loc}/gallery/${cleanSlug}`;
    return acc;
  }, {});

  if (isError) {
    return <LoadingError />;
  }

  if (isLoading || !carItem) {
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
        id={carItem.car}
        className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
        aria-labelledby={`${carItem.car}-title`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative mb-4 sm:mb-12">
            <Link
              href="/gallery"
              className="absolute -left-2 -top-8 -translate-y-1/2 p-2 font-bold text-white transition-colors hover:text-gray-300 sm:left-0 sm:top-1/2"
            >
              <FaChevronLeft className="h-6 w-6 sm:h-10 sm:w-10" />
            </Link>
            <SectionTitle id={`${carItem.car}-title`} title={carItem.car} />
          </div>
          <div className="mt-0 sm:mt-12">
            {/* Preload the first three images for better performance */}
            <PreloadCarImages images={carItem.images} />

            <Slider
              data={carItem.images}
              Component={CarImage}
              aria-label="Cars Slider"
              nextElName="nextCars"
              prevElName="prevCars"
              speed={200}
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
            <div className="flex flex-wrap gap-2">
              {carItem.categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200"
                >
                  {t(`Filters.categories.${CATEGORIES[category]}`)}
                </span>
              ))}
            </div>

            <div className="text-base leading-relaxed text-gray-300 sm:text-lg">
              {parse(carItem.fullDesc[locale] || "Add More Details")}
            </div>

            {carItem.youtubeUrl && (
              <a
                href={carItem.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-blue-400 underline transition-colors hover:text-blue-700"
              >
                {carItem.youtubeUrl}
              </a>
            )}

            <div className="text-sm text-gray-400">
              {formatDate(carItem.created_at)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarPage;
