import { useRouter } from "@/i18n/navigation";
import { useFilters } from "@/stores/useFilters";
import type { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useState } from "react";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const router = useRouter();
  const { setFilters } = useFilters();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRedirect = () => {
    setFilters(card.tags);
    router.push("/gallery");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRedirect();
    }
  };

  return (
    <button
      type="button"
      onClick={handleRedirect}
      onKeyDown={handleKeyDown}
      id={card.title}
      className="group relative flex h-[420px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-300 bg-black/20 transition-all duration-300 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`${t(`${card.title}`)} - ${t(`${card.text}`)}`}
    >
      <div className="relative h-48 w-full sm:h-64 shrink-0">
        {/* Loading placeholder with shimmer effect */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse overflow-hidden bg-linear-to-r from-gray-700 to-gray-500">
            <div className="shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 text-white">
            <span className="text-sm">Failed to load image</span>
          </div>
        )}

        <NextImage
          src={card.image || "/placeholder.jpg"}
          alt={t(`${card.title}`)}
          fill
          className={`object-cover opacity-60 transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-60" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSBIAAAABF0AQbQEz/wMz0P8AAFZQOCA+AAAAMAEAnQEqCgADAAJAOCWkAANwAP77+AAA"
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>

      <div className="flex grow flex-col items-center justify-center py-2 px-4 sm:py-4 sm:px-6">
        <h3 className="mb-3 text-center text-xl font-bold sm:text-2xl">
          {t(`${card.title}`)}
        </h3>
        <p className="text-center text-sm text-gray-200 opacity-90 sm:text-base">
          {t(`${card.text}`)}
        </p>
      </div>
    </button>
  );
};

export default ServicesCard;
