"use client";

import Spiral from "@/components/shared/spiral/spiral";
import dynamic from "next/dynamic";

const DynamicNews = dynamic(() => import("@/components/news/news"), {
  ssr: false,
  loading: () => <Spiral />,
});

export default function NewsClient() {
  return <DynamicNews />;
}
