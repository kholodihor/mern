"use client";

import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { IoMdHome } from "react-icons/io";
import not_found from "@/animations/not_found.json";
import { Link } from "@/i18n/routing";

const Page404 = () => {
  const t = useTranslations("404");
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={not_found} loop={false} className="mt-[5vh]" />
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 border border-white px-4 py-2 hover:bg-white/20"
      >
        {t("button")} <IoMdHome />
      </Link>
    </div>
  );
};

export default Page404;
