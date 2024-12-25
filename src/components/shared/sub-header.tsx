"use client";

import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const SubHeader = () => {
  const t = useTranslations("Menu");
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  return (
    <nav
      className={`fixed left-0 top-0 z-50 hidden h-[4vh] w-full items-center 
        justify-around border-b border-b-white bg-black px-6 
        py-4 text-xs md:text-sm lg:flex`}
      aria-label="Contact Information Bar"
    >
      <p>{t("independent")}</p>
      <address className="not-italic">
        <p>ul. Przyszłość 2A Stanisławów Pierwszy</p>
      </address>
      <a href="mailto:mern.serwis@gmail.com" className="underline">
        mern.serwis@gmail.com
      </a>
      <a href="tel:+48509158159" className="underline">
        509 158 159
      </a>
      <a href="tel:+48509159158" className="underline">
        509 159 158
      </a>
    </nav>
  );
};

export default SubHeader;
