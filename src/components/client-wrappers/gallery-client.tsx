"use client";

import dynamic from "next/dynamic";
import Spiral from "@/components/shared/spiral/Spiral";

const DynamicGallery = dynamic(
  () => import("@/components/pages/gallery/gallery"),
  { ssr: false, loading: () => <Spiral /> }
);

export default function GalleryClient() {
  return <DynamicGallery />;
}
