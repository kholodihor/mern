"use client";
import React, { useState, useEffect } from "react";
import { pathnames ,locales} from "@/i18n";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslations,useLocale } from "next-intl";
import { usePathname, useRouter,Link } from "@/navigation";
import { links } from "@/constants";
import MobileMenu from "./MobileMenu";


const Header = () => {
  const locale = useLocale()
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const t = useTranslations("Menu");

  const pathname = usePathname();

  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    const currentPathname = pathname;
    if (currentPathname !== previousPathname) {
      setShowMobileMenu(false);
      setPreviousPathname(currentPathname);
    }
  }, [pathname, previousPathname]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCheckLocale = (item: string) => {
    router.replace(pathname, { locale: item });
  };

  if (
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login")
  )
    return null;

  return (
    <header
      className={`fixed top-0 lg:top-[7vh] left-0 w-full h-[17vh] md:h-[16vh] py-4 px-6 flex justify-between items-center z-50 backdrop-blur-sm backdrop-brightness-10 ${
        showMobileMenu ? "bg-black" : "bg-black/50"
      }`}
      id="header"
    >
      <Link href="/">
        <Image src="/logo.png" alt="MERN logo" width={150} height={150} />
      </Link>
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="block md:hidden border-none bg-none text-white mr-[1.5rem]"
      >
        {showMobileMenu ? (
          <FaTimes className=" text-[2rem] transition-all" />
        ) : (
          <FaBars className="text-[2rem] transition-all" />
        )}
      </button>
      {showMobileMenu && <MobileMenu links={links} />}
      <nav className="hidden md:block">
        <ul
          className="m-0 flex justify-around items-center gap-4 p-2"
          id="links"
        >
          {links.map((link, index) => (
            <li
              key={index}
              className={`uppercase relative hover:text-blue-400 transition-all ${
                link.href !== "/" &&
                pathname.split("/").includes(link.href.replace(/\//g, ""))
                  ? "text-blue-400 underline"
                  : "text-white"
              }`}
              id="link"
            >
              <Link  href={{ pathname: link.href as keyof typeof pathnames }}>{t(`${link.name}`)}</Link>
            </li>
          ))}
          <div className="flex gap-[0.5rem]">
            {locales.map((lang, i) => (
              <button key={i} onClick={() => handleCheckLocale(lang)}>
                <Image
                  src={`/icons/${lang}.svg`}
                  alt={lang}
                  width={25}
                  height={10}
                  className="hover:scale-125 transition-all"
                />
              </button>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
