"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants/categories";
import { useGallery } from "@/hooks/useGallery";
import { useFilters } from "@/stores/useFilters";
import { IGalleryItem } from "@/types";
import Loader from "@/components/shared/loader";
import LoadingError from "@/components/shared/loading-error";
import CustomDropdown from "@/components/ui/select";
import GalleryCard from "./gallery-card";

// Component to preload critical gallery images
function PreloadGalleryImages({ images }: { images: string[] }) {
  return (
    <>
      {images.slice(0, 2).map((src, index) => (
        <link
          key={index}
          rel="preload"
          href={src}
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      ))}
    </>
  );
}

interface GalleryClientWrapperProps {
  initialData: IGalleryItem[];
}

const GalleryClientWrapper = ({ initialData }: GalleryClientWrapperProps) => {
  const t = useTranslations("Gallery");
  const { filters } = useFilters();

  // Use the initialData for immediate rendering, but allow client-side updates
  const { filteredData, isLoading, isError, mutate } = useGallery();

  // Initialize SWR cache with the server-fetched data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      mutate(initialData, false); // Update the cache without revalidation
    }
  }, [initialData, mutate]);

  const options = Object.values(CATEGORIES);

  // Use initialData until client-side data is loaded
  const displayData =
    filteredData.length > 0
      ? filteredData
      : filters[0] === CATEGORIES.ALL
        ? initialData
        : initialData.filter((item) =>
            item.categories.some((category: string) =>
              filters.includes(CATEGORIES[category])
            )
          );

  if (isError) {
    return <LoadingError />;
  }

  return (
    <div className="mt-8 sm:mt-12">
      <div className="mx-auto my-8 w-full max-w-[400px] sm:my-12 md:mx-0">
        <CustomDropdown options={options} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          <Loader />
        ) : displayData.length > 0 ? (
          <>
            {/* Preload the first two images for better LCP */}
            <PreloadGalleryImages 
              images={displayData.slice(0, 2).map(item => item.images[0])} 
            />
            {displayData.map((item, index) => (
              <div key={index} className="flex justify-center">
                <GalleryCard 
                  data={item} 
                  priority={index < 2} // Only prioritize first 2 images for better LCP
                />
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-full flex min-h-[200px] items-center justify-center">
            <p className="text-lg text-gray-400 sm:text-xl">{t("not_found")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryClientWrapper;
