import { useTranslations } from "next-intl";
import GalleryClientWrapper from "@/components/gallery/gallery-client-wrapper";
import SectionTitle from "@/components/shared/section-title";
import type { IGalleryItem } from "@/types";

interface GalleryServerProps {
  initialData: IGalleryItem[];
}

export default function GalleryServer({ initialData }: GalleryServerProps) {
  const t = useTranslations("Gallery");

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

        {/* This part will be hydrated with client-side interactivity */}
        <GalleryClientWrapper initialData={initialData} />
      </div>
    </section>
  );
}
