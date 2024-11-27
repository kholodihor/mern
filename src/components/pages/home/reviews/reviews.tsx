'use client'

import { reviews } from "./data";
import { useTranslations } from 'next-intl';
import Slider from '../shared/slider/slider';
import SectionTitle from '@/components/shared/section-title';
import ReviewCard from "./review-card";
import { Rating } from '@smastrom/react-rating'
// 
import '@smastrom/react-rating/style.css'
import Image from "next/image";

const Reviews = () => {
  const t = useTranslations("Reviews");
  return (
    <section className='px-2 md:px-4 my-8'>
      <SectionTitle id='services-title' title={t("title")} />
      <Rating style={{ maxWidth: 150 }} value={5} readOnly className="mx-auto" />
      <h6 className="text-center text-[24px] md:text-[32px]">Na podstawie 14 opinij</h6>
      <Image
        src={'/google.svg'}
        alt="Google logo"
        width={159}
        height={54}
        className="mx-auto"
      />
      <Slider
        data={reviews}
        Component={ReviewCard}
        aria-label="Reviews Slider"
        nextElName="nextReviews"
        prevElName="prevReviews"
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 64
          },
          1560: {
            slidesPerView: 4,
            spaceBetween: 64
          }
        }}
      />
    </section>
  )
}

export default Reviews

