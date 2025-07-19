"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants/categories";
import { useGallery } from "@/hooks/useGallery";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import SectionTitle from "@/components/shared/section-title";
import CustomDropdown from "@/components/ui/select";
import GalleryCard from "./gallery-card";

const Gallery = () => {
  const t = useTranslations("Gallery");
  const { filteredData, isLoading, isError } = useGallery();

  const options = Object.values(CATEGORIES);

  if (isError) {
    return <LoadingError />;
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
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-8 sm:mt-12">
            <div className="mx-auto my-8 w-full max-w-[400px] sm:my-12 md:mx-0">
              <CustomDropdown options={options} />
            </div>
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
