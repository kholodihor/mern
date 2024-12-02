"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { collection, onSnapshot } from "firebase/firestore";
import { useTranslations } from "next-intl";

import { db } from "@/lib/firebase";

import SectionTitle from "@/components/shared/section-title";

import Slider from "../shared/slider/slider";
import ReviewCard from "./review-card";

const Reviews = () => {
  const t = useTranslations("Reviews");

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "testimonials");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const reviewsData: any[] = [];
        snapshot.forEach((doc) => {
          reviewsData.push({ ...doc.data() });
        });
        setReviews(reviewsData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="my-8 px-2 md:px-4">
      <SectionTitle id="services-title" title={t("title")} />
      <Rating
        style={{ maxWidth: 150 }}
        value={5}
        readOnly
        className="mx-auto"
      />
      <h6 className="text-center text-[24px] md:text-[32px]">
        {t("subtitle")}
      </h6>
      <Image
        src={"/google.svg"}
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
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1560: {
            slidesPerView: 4,
            spaceBetween: 64,
          },
        }}
      />
    </section>
  );
};

export default Reviews;
