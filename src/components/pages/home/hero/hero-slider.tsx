"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
// Import only the specific CSS needed
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
// Import modules dynamically to reduce initial JS payload
import { Swiper, SwiperSlide } from "swiper/react";

// Register only the modules we need

// Define image dimensions for better optimization
const DESKTOP_WIDTH = 1920;
const MOBILE_WIDTH = 640;

const slides = [
  {
    desktop: "/hero/hero_1.webp",
    mobile: "/hero/mobile_1.webp",
    alt: "Hero image showing the main product",
  },
  {
    desktop: "/hero/hero_2.webp",
    mobile: "/hero/mobile_2.webp",
    alt: "Second hero image featuring our services",
  },
  {
    desktop: "/hero/hero_3.webp",
    mobile: "/hero/mobile_3.webp",
    alt: "Third hero image showcasing our work",
  },
  {
    desktop: "/hero/hero_4.webp",
    mobile: "/hero/mobile_4.webp",
    alt: "Fourth hero image highlighting our expertise",
  },
  {
    desktop: "/hero/hero_5.webp",
    mobile: "/hero/mobile_5.webp",
    alt: "Fifth hero image demonstrating our capabilities",
  },
];

// Component to preload critical images
function PreloadImages() {
  return (
    <>
      <link
        rel="preload"
        href="/hero/hero_1.webp"
        as="image"
        type="image/webp"
      />
      <link
        rel="preload"
        href="/hero/mobile_1.webp"
        as="image"
        type="image/webp"
        media="(max-width: 550px)"
      />
    </>
  );
}

// Main hero slider component
const HeroSlider = memo(function HeroSlider() {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    if (typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      setIsMobileView(window.innerWidth < 550);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileView(window.innerWidth < 550);

      // Handle resize events
      window.addEventListener("resize", handleResize, { passive: true });

      // Handle bfcache restoration
      const handleBfCacheRestore = () => {
        // Re-initialize the component state when restored from bfcache
        setIsMobileView(window.innerWidth < 550);
      };

      // Listen for custom bfcache restore event
      window.addEventListener("bfcache:restore", handleBfCacheRestore);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("bfcache:restore", handleBfCacheRestore);
      };
    }
  }, []);

  return (
    <>
      <PreloadImages />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        className="z-0 mt-[17vh] h-[450px] sm:h-[60vh] md:h-screen"
        role="region"
        aria-live="polite"
        aria-label="Intro slides"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              src={isMobileView ? slide.mobile : slide.desktop}
              alt={slide.alt}
              fill
              sizes={isMobileView ? `${MOBILE_WIDTH}px` : `${DESKTOP_WIDTH}px`}
              priority={index < 2}
              className="w-full object-cover grayscale"
              quality={index === 0 ? 90 : 75}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAACQAAAgAAQUxQSBIAAAABF0AQbQEz/wMz0P8AAFZQOCA+AAAAMAEAnQEqCgADAAJAOCWkAANwAP77+AAA"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-black md:hidden"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});

export default HeroSlider;
