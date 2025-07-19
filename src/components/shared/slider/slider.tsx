/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import clsx from "clsx";
import { FC, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "./styles.css";

interface SliderProps extends SwiperOptions {
  data: any[];
  showArrows?: boolean;
  title?: string;
  titleClassName?: string;
  nextElName?: string; // назва кнопки next !! Має бути унікальна для секції
  prevElName?: string; // назва кнопки prev !! Має бути унікальна для секції
  Component: FC<{ data: any; index?: number }>;
}

const Slider: FC<SliderProps> = ({
  data,
  Component,
  nextElName,
  prevElName,
  ...options
}) => {
  const sliderRef = useRef(null);

  const handlePrev = () => {
    if (sliderRef.current) {
      (sliderRef.current as any).slidePrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      (sliderRef.current as any).slideNext();
    }
  };

  return (
    <div className="my-4 flex w-full flex-col items-center justify-center">
      <nav
        className="relative mx-auto mb-6 flex h-fit w-full items-center justify-center py-4 pr-4 text-white"
        aria-label="Slider navigation"
      >
        <div className="absolute right-6 top-0 hidden h-full items-center justify-center gap-4 text-white md:flex">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            aria-controls="slider"
            disabled={!sliderRef.current}
            className={clsx(
              "button-prev duration-300 hover:text-gray-500 disabled:opacity-40",
              prevElName
            )}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            aria-controls="slider"
            disabled={!sliderRef.current}
            className={clsx(
              "button-next duration-300 hover:text-gray-500 disabled:opacity-40",
              nextElName
            )}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Swiper
        id="slider"
        className="relative flex w-full items-center justify-center pb-9"
        spaceBetween={10}
        slidesPerView={1}
        {...options}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: nextElName ? `.${nextElName}` : null,
          prevEl: prevElName ? `.${prevElName}` : null,
        }}
        loop
        onSwiper={(swiper) => {
          (sliderRef.current as any) = swiper;
        }}
      >
        {data &&
          data.map((item: any, i: number) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <Component data={item} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
