"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
// Import only the specific icons needed
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from "@/constants/links";
import { Link, locales, usePathname, useRouter } from "@/i18n/routing";

// Dynamically import MobileMenu with improved loading strategy
const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => ({ default: mod.default })),
  {
    loading: () => (
      <div className="h-[50vh] w-full animate-pulse bg-black/50"></div>
    ),
    ssr: false, // Disable server-side rendering for the mobile menu
  }
);

// Memoize the component to prevent unnecessary re-renders
const Header = memo(function Header() {
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

  // Use useCallback to prevent function recreation on each render
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  // Use useCallback to prevent function recreation on each render
  const handleCheckLocale = useCallback(
    (item: string) => {
      router.replace(pathname, { locale: item });
    },
    [router, pathname]
  );

  if (pathname.split("/").includes("login")) return null;

  return (
    <header
      className={clsx(
        "backdrop-brightness-10 fixed left-0 top-0 z-50 flex h-[15vh] w-full items-center justify-between px-6 py-4 backdrop-blur-sm",
        "md:h-[14vh]",
        {
          "lg:top-[4vh]": !pathname.split("/").includes("admin"),
          "lg:top-0": pathname.split("/").includes("admin"),
          "bg-black": showMobileMenu,
          "bg-black/50": !showMobileMenu,
        }
      )}
      id="header"
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="MERN logo"
          width={150}
          height={150}
          priority={true}
          quality={90}
        />
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
              <Link href={link.href}>{t(`${link.name}`)}</Link>
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
});

export default Header;
