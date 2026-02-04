"use client";

import { useEffect } from "react";
import { prefetchGallery } from "@/hooks/useGallery";

const GalleryPrefetch = () => {
  useEffect(() => {
    // Prefetch gallery data when component mounts
    prefetchGallery();
  }, []);

  return null; // This component doesn't render anything
};

export default GalleryPrefetch;
