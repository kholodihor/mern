"use client";

import dynamic from "next/dynamic";
import Spiral from "@/components/shared/spiral/Spiral";

const DynamicNews = dynamic(() => import("@/components/pages/news/news"), {
  ssr: false,
  loading: () => <Spiral />,
});

export default function NewsClient() {
  return <DynamicNews />;
}
