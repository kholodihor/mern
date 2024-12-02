'use client'

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Slider from '../home/shared/slider/slider'
import Image from 'next/image'
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { CATEGORIES } from '@/constants/categories';
import SectionTitle from '@/components/shared/section-title'
import ChevronLeft from '@/components/icons/chevron-left';
import { formatDate } from '@/helpers/formatDate';

const CarImage = ({ data }: { data: string }) => {
  return (
    <Image
      src={data}
      alt="Car image"
      width={300}
      height={300}
    />
  )
}

const CarPage = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [carItem, setCarItem] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;

    const ref = collection(db, "gallery");
    const slugQuery = query(ref, where("slug", "==", slug));

    const unsubscribe = onSnapshot(slugQuery, (snapshot) => {
      if (!snapshot.empty) {
        const itemData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]; // Get the first matching document
        setCarItem(itemData);
      } else {
        setCarItem(null); // No matching item found
      }
    });

    return () => unsubscribe();
  }, [slug]);

  return (
    <section
      id="about-us"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh] p-4 pb-[100px]"
      aria-labelledby="about-us-title"
    >
      <SectionTitle id='about-us-title' title={carItem?.car as string} />
      <div className='pl-[10vw] relative'>
        <Link href="/gallery">
          <button className='absolute top-1/2 left-[2vw] md:left-[5vw] -translate-x-1/2
          -translate-y-1/3 z-10 text-[2rem] md:text-[70px] flex items-center'>
            <ChevronLeft />
          </button>
        </Link>
        <Slider
          data={carItem?.images as string[]}
          Component={CarImage}
          aria-label="Reviews Slider"
          nextElName="nextReviews"
          prevElName="prevReviews"
          breakpoints={{
            450: {
              slidesPerView: 1.5,
              spaceBetween: 10
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 10
            },
          }}
        />
      </div>
      <div className='w-[77%] mx-auto'>
        <p className="text-gray-400 text-[18px] w-full mt-[24px]">
          {carItem?.fullDesc[locale]}
        </p>
        <div className="flex-col-reverse flex md:flex-row justify-center md:justify-between gap-4 w-full items-start mt-[24px] md:mt-[50px]">
          <div className="text-[16px] text-gray-400 flex gap-2 flex-wrap">
            {carItem?.categories.map((item: any, index: number) => (
              <span key={index} className="py-[2px] px-2 rounded-[1rem] bg-gray-400/30
              flex justify-center items-center">{t(`Filters.categories.${CATEGORIES[item]}`)}</span>
            ))}
          </div>
          <span className='text-gray-400'>{carItem && formatDate(carItem?.created_at)}</span>
        </div>
      </div>
    </section>
  )
}

export default CarPage
