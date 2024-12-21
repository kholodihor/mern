import { useRouter } from "@/i18n/routing";
import { useFilters } from "@/stores/useFilters";
import { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
      className="group relative w-full sm:w-[350px] h-[320px] rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer transition-all hover:border-white/30 hover:bg-white/10"
    >
      <div className="absolute inset-0">
        <Image
          src={card.image!}
          alt={t(`${card.title}`)}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h4 className="text-xl sm:text-2xl font-bold mb-2">
          {t(`${card.title}`)}
        </h4>
        <p className="text-sm sm:text-base text-gray-200">
          {t(`${card.text}`)}
        </p>
      </div>
    </article>
  );
};

export default ServicesCard;
