"use client";

import { Link } from "@/i18n/routing";
import Lottie from "lottie-react";
import not_found from "@/animations/not_found.json";
import { useTranslations } from "next-intl";
import { IoMdHome } from "react-icons/io";

const Page404 = () => {
  const t = useTranslations("404");
  return (
    <div className="relative">
      <Lottie animationData={not_found} loop={false} className="mt-[5vh]" />
      <Link href='/' className="absolute top-1/2 left-8 flex items-center gap-2
       px-4 py-2 border border-white hover:bg-white/20">
        {t("button")} <IoMdHome />
      </Link>
    </div>
  )
};

export default Page404;
