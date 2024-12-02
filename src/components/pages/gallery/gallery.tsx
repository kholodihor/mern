/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { CATEGORIES } from "@/constants/categories";
import { useGallery } from "@/hooks/useGallery";
import { useFilters } from "@/stores/useFilters";

import SectionTitle from "@/components/shared/section-title";
import CustomDropdown from "@/components/ui/select";

import GalleryCard from "./gallery-card";

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

const Gallery = () => {
  const t = useTranslations("Gallery");
  const { filters } = useFilters();
  const { galleryList, fetchGalleryAsList } = useGallery();

  useEffect(() => {
    fetchGalleryAsList();
  }, []);

  const filteredData = galleryList.filter((item) => {
    return filters[0] === CATEGORIES.ALL
      ? true
      : item.categories.some((category: string) =>
          filters.includes(CATEGORIES[category])
        );
  });

  console.log(filters);

  const options = Object.values(CATEGORIES);

  return (
    <section
      id="gallery"
      className="flex min-h-screen w-full flex-col px-2 pt-[18vh] md:px-4 md:pt-[25vh]"
      aria-labelledby="gallery-title"
    >
      <SectionTitle id="gallery-title" title={t("title")} />

      <div className="mt-[10vh] lg:px-[6rem]">
        <CustomDropdown options={options} />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 py-[2rem] sm:grid-cols-2 lg:grid-cols-3 lg:px-[6rem] 2xl:grid-cols-4">
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <GalleryCard key={index} data={item} />
          ))
        ) : (
          <p className="col-span-4 mt-[24px] text-center text-[20px] text-gray-400">
            {t("not_found")}
          </p>
        )}
      </div>
    </section>
  );
};

export default Gallery;
