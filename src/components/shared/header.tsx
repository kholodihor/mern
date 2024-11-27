"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link, pathnames, locales } from "@/i18n/routing";
import { links } from "@/constants/links";
import MobileMenu from "./mobile-menu";
import clsx from "clsx";


const Header = () => {
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
      className={`fixed top-0 lg:top-[7vh] left-0 w-full h-[17vh] 
        md:h-[16vh] py-4 px-6 flex justify-between items-center 
        z-50 backdrop-blur-sm backdrop-brightness-10
        ${showMobileMenu ? "bg-black" : "bg-black/50"
        }`}
      id="header"
    >
      <Link href="/">
        <Image src="/logo.png" alt="MERN logo" width={150} height={150} />
      </Link>
      <button
        type="button"
        aria-expanded={showMobileMenu}
        aria-controls="mobile-menu"
        onClick={toggleMobileMenu}
        className="block md:hidden border-none bg-none text-white mr-[1.5rem]"
      >
        {showMobileMenu ? (
          <FaTimes className=" text-[2rem] transition-all" />
        ) : (
          <FaBars className="text-[2rem] transition-all" />
        )}
      </button>

      {showMobileMenu && (
        <MobileMenu links={links} />
      )}

      <nav className="hidden md:block" role="navigation" aria-label="Main Menu">
        <ul className="m-0 flex justify-around items-center gap-4 p-2" id="links">
          {links.map((link, index) => (
            <li
              key={index}
              aria-current={link.href === pathname ? "page" : undefined}
              className={clsx(
                "uppercase relative text-xs lg:text-[16px] whitespace-nowrap hover:text-blue-400 transition-all",
                {
                  "text-blue-400 underline": link.href !== "/" && pathname.split("/").includes(link.href.replace(/\//g, "")),
                  "text-white": !(link.href !== "/" && pathname.split("/").includes(link.href.replace(/\//g, "")))
                }
              )}
            >
              <Link href={{ pathname: link.href as keyof typeof pathnames }}>
                {t(`${link.name}`)}
              </Link>
            </li>
          ))}
          <ul className="flex gap-[0.5rem] xl:ml-[5rem]">
            {locales.map((lang, i) => (
              <li key={i}>
                <button
                  onClick={() => handleCheckLocale(lang)}
                  aria-label={`Change language to ${lang}`}
                >
                  {lang.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
