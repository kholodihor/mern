"use client";

import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";
import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { IGalleryItem } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [carItem, setCarItem] = useState<IGalleryItem | null>(null);

  useEffect(() => {
    if (!slug) return;

    const ref = collection(db, "gallery");
    const slugQuery = query(ref, where("slug", "==", slug));

    const unsubscribe = onSnapshot(slugQuery, (snapshot) => {
      if (!snapshot.empty) {
        const sortedData = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<IGalleryItem, "id">;
          return { ...data, id: doc.id };
        });
        setCarItem(sortedData[0]);
      } else {
        setCarItem(null);
      }
    });

    return () => unsubscribe();
  }, [slug]);

  if (!carItem) {
    return (
      <section className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={carItem.car}
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby={`${carItem.car}-title`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8 sm:mb-12">
          <Link
            href="/gallery"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>
          <SectionTitle
            id={`${carItem.car}-title`}
            title={carItem.car}
          />
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

        <div className="mt-8 sm:mt-12 space-y-6">
          <div className="flex flex-wrap gap-2">
            {carItem.categories.map((category: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-200"
              >
                {t(`Filters.categories.${CATEGORIES[category]}`)}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            {carItem.fullDesc[locale].split(".").map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {paragraph.trim()}.
                </p>
              )
            ))}
          </div>

          <div className="text-sm text-gray-400">
            {formatDate(carItem.created_at)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarPage;
