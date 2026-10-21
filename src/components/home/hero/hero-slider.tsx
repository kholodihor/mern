"use client";

import { useTranslations } from "next-intl";
import { getImageProps } from "next/image";
import { memo } from "react";
import { preload } from "react-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MOBILE_MEDIA = "(max-width: 549px)";
const DESKTOP_MEDIA = "(min-width: 550px)";
const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSBIAAAABF0AQbQEz/wMz0P8AAFZQOCA+AAAAMAEAnQEqCgADAAJAOCWkAANwAP77+AAA";

const slides = [1, 2, 3, 4, 5].map((n) => ({
  id: `hero-${n}`,
  desktop: `/hero/hero_${n}.webp`,
  mobile: `/hero/mobile_${n}.webp`,
}));

// Art direction via <picture>: the browser picks the mobile or desktop source
// before hydration, so only one variant is downloaded.
const HeroPicture = ({
  desktop,
  mobile,
  alt,
  isFirst,
}: {
  desktop: string;
  mobile: string;
  alt: string;
  isFirst: boolean;
}) => {
  const common = {
    alt,
    fill: true,
    sizes: "100vw",
    quality: isFirst ? 75 : 70,
    placeholder: "blur" as const,
    blurDataURL: BLUR_DATA_URL,
    loading: isFirst ? ("eager" as const) : ("lazy" as const),
    fetchPriority: isFirst ? ("high" as const) : undefined,
  };
  const {
    props: { srcSet: desktopSrcSet, ...rest },
  } = getImageProps({ ...common, src: desktop });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: mobile });

  if (isFirst) {
    // Only the LCP slide is preloaded, one variant per viewport
    if (mobileSrcSet) {
      preload(mobile, {
        as: "image",
        imageSrcSet: mobileSrcSet,
        imageSizes: "100vw",
        media: MOBILE_MEDIA,
        fetchPriority: "high",
      });
    }
    if (desktopSrcSet) {
      preload(desktop, {
        as: "image",
        imageSrcSet: desktopSrcSet,
        imageSizes: "100vw",
        media: DESKTOP_MEDIA,
        fetchPriority: "high",
      });
    }
  }

  return (
    <picture>
      <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} sizes="100vw" />
      <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} sizes="100vw" />
      {/* biome-ignore lint/a11y/useAltText: alt is passed via rest props */}
      <img {...rest} className="w-full object-cover grayscale" />
    </picture>
  );
};

// Main hero slider component
const HeroSlider = memo(function HeroSlider() {
  const t = useTranslations("Menu");
  const alt = t("hero_alt");

  return (
    <section aria-live="polite" aria-label="Intro slides">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        speed={1000}
        loop
        className="hero-swiper z-0 mt-[17vh] h-[450px] sm:h-[60vh] md:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            <HeroPicture
              desktop={slide.desktop}
              mobile={slide.mobile}
              alt={alt}
              isFirst={index === 0}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black"></div>
            <div className="absolute inset-0 bg-linear-to-t from-transparent via-black/5 to-black md:hidden"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
});

export default HeroSlider;
