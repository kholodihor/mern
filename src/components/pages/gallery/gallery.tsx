"use client";

import SectionTitle from "@/components/shared/section-title";
import CustomDropdown from "@/components/ui/select";
import { CATEGORIES } from "@/constants/categories";
import { useGallery } from "@/hooks/useGallery";
import { useFilters } from "@/stores/useFilters";
import { useTranslations } from "next-intl";
import GalleryCard from "./gallery-card";

const Gallery = () => {
  const t = useTranslations("Gallery");
  const { filters } = useFilters();
  const { galleryList, isLoading, isError } = useGallery();

  const filteredData = galleryList?.filter((item) => {
    return filters[0] === CATEGORIES.ALL
      ? true
      : item.categories.some((category: string) =>
        filters.includes(CATEGORIES[category])
      );
  }) || [];

  const options = Object.values(CATEGORIES);

  if (isError) {
    return (
      <section className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-red-500">Error loading gallery data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="max-w-7xl mx-auto">
          <SectionTitle id="gallery-title" title={t("title")} />

          <div className="mt-8 sm:mt-12 max-w-xs">
            <CustomDropdown options={options} />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 sm:mt-12 flex justify-center min-h-[200px] items-center">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div key={index} className="flex justify-center">
                    <GalleryCard data={item} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center min-h-[200px]">
                  <p className="text-lg sm:text-xl text-gray-400">
                    {t("not_found")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
