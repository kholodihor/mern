'use client'

import { useTranslations } from "next-intl";
import { galleryData } from "./data";
import { useFilters } from '@/stores/useFilters';
import { CATEGORIES } from '@/constants/categories';
import SectionTitle from "@/components/shared/section-title";
import GalleryCard from "./gallery-card";
import CustomDropdown from "@/components/ui/select";

const Gallery = () => {
  const t = useTranslations("Gallery");
  const { filters } = useFilters();

  const filteredData = galleryData.filter((item) => {
    return filters[0] === CATEGORIES.ALL ? true : item.categories.some(category => filters.includes(category));
  });

  const options = Object.values(CATEGORIES);

  return (
    <section
      id="gallery"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh] px-2 md:px-4"
      aria-labelledby="gallery-title"
    >
      <SectionTitle id='gallery-title' title={t("title")} />

      <div className="lg:px-[6rem] mt-[10vh]">
        <CustomDropdown
          options={options} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      2xl:grid-cols-4 gap-6 w-full py-[2rem] lg:px-[6rem]">
        {filteredData.length ? filteredData.map((item, index) => (
          <GalleryCard key={index} data={item} />
        )) : (
          <p className="col-span-4 text-center text-[20px] mt-[24px] text-gray-400">
            {t("not_found")}
          </p>
        )}
      </div>

    </section>
  )
}

export default Gallery

