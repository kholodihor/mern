import { useRouter } from "@/i18n/navigation";
import { useFilters } from "@/stores/useFilters";
import type { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const router = useRouter();
  const { setFilters } = useFilters();

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
        <img
          src={card.image || "/placeholder.jpg"}
          alt={t(`${card.title}`)}
          className="h-full w-full object-cover opacity-60 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex grow flex-col items-center justify-center py-2 px-4 sm:py-4 sm:px-6">
        <h4 className="mb-3 text-center text-xl font-bold sm:text-2xl">
          {t(`${card.title}`)}
        </h4>
        <p className="text-center text-sm text-gray-200 opacity-90 sm:text-base">
          {t(`${card.text}`)}
        </p>
      </div>
    </button>
  );
};

export default ServicesCard;
