import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useFilters } from '@/stores/useFilters';
import { TServiceCard } from "@/types";
import Image from 'next/image';

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const router = useRouter()
  const { setFilters } = useFilters();

  const handleRedirect = () => {
    setFilters(card.tags)
    router.push('/gallery')
  }


  return (
    <article
      onClick={handleRedirect}
      id={card.title}
      className="w-[90%] sm:w-[75%] md:w-[300px] h-[350px] 
    border border-white rounded-[2.5rem]
    flex flex-col justify-center items-center overflow-hidden mx-auto">
      <div className="h-full flex flex-col hover:cursor-pointer
      justify-between items-center w-full gap-4 relative cursor-pointer">
        <Image
          src={card.image!}
          alt="Car image"
          width={300}
          height={300}
          className='rounded-[2.5rem] w-full object-cover h-auto'
        />
        <div className='flex flex-col justify-center items-center gap-2 top-[40%] absolute p-2'>
          <h4 className="text-center text-[24px]">
            {t(`${card.title}`)}
          </h4>

          <p className="text-center text-gray-400 text-[18px]">{t(`${card.text}`)}</p>
        </div>
      </div>
    </article>
  );
};

export default ServicesCard;

