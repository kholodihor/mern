"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import not_found from "@/constants/animations/not_found.json";
import { useTranslations } from "next-intl";

const Page404 = () => {
  const t = useTranslations("404");
  return <Lottie animationData={not_found} loop={false} className="mt-[5vh]" />;
};

export default Page404;
