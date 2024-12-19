"use client";

import SectionTitle from "@/components/shared/section-title";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "../shared/slider/slider";
import ReviewCard from "./review-card";

const Reviews = () => {
  const t = useTranslations("Reviews");

  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsNumber, setReviewsNumber] = useState(0);

  const getReviews = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://api.apify.com/v2/datasets/XjM5r6afVEoefQdCo/items?token=apify_api_WSKzAtkdIGVTGx6UlGp8O5KfcDgfWr3XVLox",
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Error fetching reviews: ${response.statusText}`);
      }

      const data = await response.json();

      setReviewsNumber(data.length);

      const reviews = data.filter((review: any) => review.text !== null).map((review: any) => ({
        name: review.name,
        rating: review.stars,
        review: review.text,
        created_at: review.publishedAtDate
      }));

      setReviews(reviews);

    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    getReviews();
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
        {t("subtitle1")}{reviewsNumber}{t("subtitle2")}
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
