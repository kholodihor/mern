"use client";

import { links } from "@/constants/links";
import {
  Link,
  locales,
  pathnames,
  usePathname,
  useRouter,
} from "@/i18n/routing";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileMenu from "./mobile-menu";

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
      className={`backdrop-brightness-10 fixed left-0 top-0 z-50 flex h-[17vh] w-full items-center justify-between px-6 py-4 backdrop-blur-sm md:h-[16vh] lg:top-[7vh] ${showMobileMenu ? "bg-black" : "bg-black/50"
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
        className="mr-[1.5rem] block border-none bg-none text-white md:hidden"
      >
        {showMobileMenu ? (
          <FaTimes className="text-[2rem] transition-all" />
        ) : (
          <FaBars className="text-[2rem] transition-all" />
        )}
      </button>

      {showMobileMenu && <MobileMenu links={links} />}

      <nav className="hidden md:block" role="navigation" aria-label="Main Menu">
        <ul
          className="m-0 flex items-center justify-around gap-4 p-2"
          id="links"
        >
          {links.map((link, index) => (
            <li
              key={index}
              aria-current={link.href === pathname ? "page" : undefined}
              className={clsx(
                "relative whitespace-nowrap text-xs uppercase transition-all hover:text-blue-400 lg:text-[16px]",
                {
                  "text-blue-400 underline":
                    link.href !== "/" &&
                    pathname.split("/").includes(link.href.replace(/\//g, "")),
                  "text-white": !(
                    link.href !== "/" &&
                    pathname.split("/").includes(link.href.replace(/\//g, ""))
                  ),
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
                  className="hover:text-blue-400 hover:underline"
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
