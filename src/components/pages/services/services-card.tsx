import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useFilters } from "@/stores/useFilters";
import { TServiceCard } from "@/types";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const router = useRouter();
  const { setFilters } = useFilters();

  const handleRedirect = () => {
    setFilters(card.tags);
    router.push("/gallery");
  };

  return (
    <article
      onClick={handleRedirect}
      id={card.title}
      className="group relative h-[420px] w-full cursor-pointer overflow-hidden rounded-xl border border-gray-300 bg-black/20 transition-all duration-300 hover:bg-black/30"
    >
      <div className="relative h-2/3 w-full">
        <Image
          src={card.image!}
          alt={t(`${card.title}`)}
          fill
          className="h-full object-cover opacity-60 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex min-h-[200px] w-full flex-col items-center justify-center p-6">
        <h4 className="mb-3 text-center text-xl font-bold sm:text-2xl">
          {t(`${card.title}`)}
        </h4>
        <p className="text-center text-sm text-gray-200 opacity-90 sm:text-base">
          {t(`${card.text}`)}
        </p>
      </div>
    </article>
  );
};

export default ServicesCard;
