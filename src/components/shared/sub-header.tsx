"use client";

import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const SubHeader = () => {
  const t = useTranslations('Menu')
  const pathname = usePathname();

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full hidden h-[7vh] py-4 px-6 lg:flex justify-around items-center z-50 bg-black text-xs md:text-sm border-b border-b-white`}
      aria-label="Contact Information Bar"
    >
      <p>{t('independent')}</p>
      <address className="not-italic">
        <p>ul. Przyszłość 2A Stanisławów Pierwszy</p>

      </address>
      <a href="mailto:mern.serwis@gmail.com" className="underline">
        mern.serwis@gmail.com
      </a>
      <a href="tel:+48509158159" className="underline">509 158 159</a>
      <a href="tel:+48509159158" className="underline">509 159 158</a>
    </nav>
  );
};

export default SubHeader;
