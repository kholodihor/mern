"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useLocale, useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { useCar } from "@/hooks/useCar";
import { Link } from "@/i18n/routing";
import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";
import Slider from "../home/shared/slider/slider";

const CarImage = ({ data }: { data: string }) => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src={data}
        alt="Car image"
        fill
        className="object-cover transition-transform hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

const CarPage = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { carItem, isLoading, isError } = useCar(slug);

  if (isError) {
    return (
      <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-red-500">Error loading car data</p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!carItem) {
    return (
      <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={carItem.car}
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby={`${carItem.car}-title`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-8 sm:mb-12">
          <Link
            href="/gallery"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white transition-colors hover:text-gray-300"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </Link>
          <SectionTitle id={`${carItem.car}-title`} title={carItem.car} />
        </div>

        <div className="mt-8 sm:mt-12">
          <Slider
            data={carItem.images}
            Component={CarImage}
            aria-label="Cars Slider"
            nextElName="nextCars"
            prevElName="prevCars"
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
  );
};

export default CarPage;
