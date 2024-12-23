"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants/categories";
import { useGallery } from "@/hooks/useGallery";
import { useFilters } from "@/stores/useFilters";
import SectionTitle from "@/components/shared/section-title";
import CustomDropdown from "@/components/ui/select";
import GalleryCard from "./gallery-card";

const Gallery = () => {
  const t = useTranslations("Gallery");
  const { filters } = useFilters();
  const { galleryList, isLoading, isError } = useGallery();

  const filteredData =
    galleryList?.filter((item) => {
      return filters[0] === CATEGORIES.ALL
        ? true
        : item.categories.some((category: string) =>
            filters.includes(CATEGORIES[category])
          );
    }) || [];

  const options = Object.values(CATEGORIES);

  if (isError) {
    return (
      <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-red-500">Error loading gallery data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby="gallery-title"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle id="gallery-title" title={t("title")} />

          <div className="mt-8 max-w-xs sm:mt-12">
            <CustomDropdown options={options} />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 flex min-h-[200px] items-center justify-center sm:mt-12">
            <div className="mx-auto max-w-7xl">
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div key={index} className="flex justify-center">
                    <GalleryCard data={item} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex min-h-[200px] items-center justify-center">
                  <p className="text-lg text-gray-400 sm:text-xl">
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
