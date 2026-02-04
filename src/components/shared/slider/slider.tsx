"use client";

import clsx from "clsx";
import { type FC, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import "./styles.css";

interface SliderProps extends SwiperOptions {
  // biome-ignore lint/suspicious/noExplicitAny: Generic slider component needs to accept any data type
  data: any[];
  showArrows?: boolean;
  title?: string;
  titleClassName?: string;
  nextElName?: string; // назва кнопки next !! Має бути унікальна для секції
  prevElName?: string; // назва кнопки prev !! Має бути унікальна для секції
  // biome-ignore lint/suspicious/noExplicitAny: Component needs to accept any data type for generic usage
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
      // biome-ignore lint/suspicious/noExplicitAny: Swiper type requires any for method calls
      (sliderRef.current as any).slidePrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      // biome-ignore lint/suspicious/noExplicitAny: Swiper type requires any for method calls
      (sliderRef.current as any).slideNext();
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <nav
        className="relative mx-auto mb-6 hidden h-fit w-full items-center justify-center py-4 pr-4 text-white sm:flex"
        aria-label="Slider navigation"
      >
        <div className="absolute right-6 top-0 hidden h-full items-center justify-center gap-4 text-white md:flex">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            aria-controls="slider"
            disabled={!sliderRef.current}
            className={clsx(
              "button-prev duration-300 hover:scale-125 disabled:opacity-40",
              prevElName,
            )}
          >
            <FaChevronLeft aria-hidden="true" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            aria-controls="slider"
            disabled={!sliderRef.current}
            className={clsx(
              "button-next duration-300 hover:scale-125 disabled:opacity-40",
              nextElName,
            )}
          >
            <FaChevronRight aria-hidden="true" className="h-6 w-6" />
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
          // biome-ignore lint/suspicious/noExplicitAny: Swiper type requires any for ref assignment
          (sliderRef.current as any) = swiper;
        }}
      >
        {/* biome-ignore lint/suspicious/noExplicitAny: Generic slider component needs to accept any data type */}
        {data?.map((item: any, i: number) => (
          <SwiperSlide
            key={`slide-${i}-${JSON.stringify(item).slice(0, 20)}`}
            className="flex items-center justify-center"
          >
            <Component data={item} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
