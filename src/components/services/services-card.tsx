import { Link } from "@/i18n/navigation";
import { useFilters } from "@/stores/useFilters";
import type { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useState } from "react";

const cardClassName =
  "group relative flex h-[400px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-300 bg-black/20 transition-all duration-300 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:h-[450px]";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const { setFilters } = useFilters();
  const [imageError, setImageError] = useState(false);

  const ariaLabel = `${t(`${card.title}`)} - ${t(`${card.text}`)}`;

  const content = (
    <>
      <div className="relative h-40 w-full shrink-0 bg-gray-700 sm:h-56">
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
          className="object-cover opacity-60 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      </div>

      <div className="flex grow flex-col items-center justify-center py-2 px-4 sm:py-4 sm:px-6">
        <h3 className="mb-3 text-center font-bold text-[20px]">
          {t(`${card.title}`)}
        </h3>
        <p className="text-center text-[14px] text-gray-200 opacity-90">
          {t(`${card.text}`)}
        </p>
      </div>
    </>
  );

  // Real <a href> links so crawlers can discover service pages
  if (card.link?.startsWith("http")) {
    return (
      <a
        href={card.link}
        target="_blank"
        rel="noopener noreferrer"
        id={card.title}
        className={cardClassName}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  const hasOwnPage = Boolean(card.link) && card.link !== "#";

  return (
    <Link
      href={hasOwnPage ? card.link : "/gallery"}
      onClick={hasOwnPage ? undefined : () => setFilters(card.tags)}
      id={card.title}
      className={cardClassName}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
};

export default ServicesCard;
