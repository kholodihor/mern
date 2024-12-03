"use client";

import ChevronLeft from "@/components/icons/chevron-left";
import SectionTitle from "@/components/shared/section-title";
import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { IGalleryItem } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "../home/shared/slider/slider";

const CarImage = ({ data }: { data: string }) => {
  return <Image src={data} alt="Car image" width={300} height={300} />;
};

const CarPage = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [carItem, setCarItem] = useState<IGalleryItem | null>(null);

  useEffect(() => {
    if (!slug) return;

    const ref = collection(db, "gallery");
    const slugQuery = query(ref, where("slug", "==", slug));

    const unsubscribe = onSnapshot(slugQuery, (snapshot) => {
      if (!snapshot.empty) {
        const sortedData = snapshot.docs
          .map((doc) => {
            const data = doc.data() as Omit<IGalleryItem, "id">;
            return { ...data, id: doc.id };
          })
        setCarItem(sortedData[0]);
      } else {
        setCarItem(null);
      }
    });

    return () => unsubscribe();
  }, [slug]);

  return (
    <section
      id={carItem?.car as string}
      className="flex min-h-screen w-full flex-col p-4 pb-[100px] pt-[18vh] md:pt-[25vh]"
      aria-labelledby={`${carItem?.car}-title`}
    >
      <SectionTitle id={`${carItem?.car}-title`} title={carItem?.car as string} />
      <div className="relative pl-[10vw]">
        <Link href="/gallery">
          <button className="absolute left-[2vw] top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/3 items-center text-[2rem] md:left-[5vw] md:text-[70px]">
            <ChevronLeft />
          </button>
        </Link>
        <Slider
          data={carItem?.images as string[]}
          Component={CarImage}
          aria-label="Cars Slider"
          nextElName="nextCars"
          prevElName="prevCars"
          breakpoints={{
            450: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }}
        />
      </div>
      <div className="mx-auto w-[77%]">
        <p className="mt-[24px] w-full text-[18px] text-gray-400">
          {carItem?.fullDesc[locale]}
        </p>
        <div className="mt-[24px] flex w-full flex-col-reverse items-start justify-center gap-4 md:mt-[50px] md:flex-row md:justify-between">
          <div className="flex flex-wrap gap-2 text-[16px] text-gray-400">
            {carItem?.categories.map((item: any, index: number) => (
              <span
                key={index}
                className="flex items-center justify-center rounded-[1rem] bg-gray-400/30 px-2 py-[2px]"
              >
                {t(`Filters.categories.${CATEGORIES[item]}`)}
              </span>
            ))}
          </div>
          <span className="text-gray-400">
            {carItem && formatDate(carItem?.created_at)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CarPage;
