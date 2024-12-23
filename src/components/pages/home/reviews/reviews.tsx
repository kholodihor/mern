"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import Slider from "../shared/slider/slider";
import ReviewCard from "./review-card";

interface ReviewsResponse {
  reviews: Array<{
    name: string;
    rating: number;
    review: string;
    created_at: string;
  }>;
  totalReviews: number;
}

const Reviews = () => {
  const t = useTranslations("Reviews");
  const [reviews, setReviews] = useState<ReviewsResponse["reviews"]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`Error fetching reviews: ${response.statusText}`);
        }

        const data = (await response.json()) as ReviewsResponse;
        setReviews(data.reviews);
        setTotalReviews(data.totalReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch reviews"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionTitle id="services-title" title={t("title")} />
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionTitle id="services-title" title={t("title")} />
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionTitle id="services-title" title={t("title")} />
      <div className="mb-10 space-y-6 sm:space-y-8">
        <Rating
          style={{ maxWidth: 150 }}
          value={4.9}
          readOnly
          className="mx-auto"
        />
        <h6 className="text-center text-2xl font-medium sm:text-3xl lg:text-4xl">
          {t("subtitle1")}
          {totalReviews}
          {t("subtitle2")}
        </h6>
        <Image
          src="/google.svg"
          alt="Google logo"
          width={159}
          height={54}
          className="mx-auto"
        />
      </div>
      <Slider
        data={reviews}
        Component={ReviewCard}
        aria-label="Reviews Slider"
        nextElName="nextReviews"
        prevElName="prevReviews"
        breakpoints={{
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
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
