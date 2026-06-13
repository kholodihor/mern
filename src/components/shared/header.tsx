"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// Import only the specific icons needed
import { links } from "@/constants/links";
import { Link, locales, usePathname, useRouter } from "@/i18n/navigation";

// Dynamically import MobileMenu with improved loading strategy
const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => ({ default: mod.default })),
  {
    loading: () => (
      <div className="h-[50vh] w-full animate-pulse bg-black/50"></div>
    ),
    ssr: false, // Disable server-side rendering for the mobile menu
  },
);

const Header = function Header() {
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
    [router, pathname],
  );

  if (pathname.split("/").includes("login")) return null;

  return (
    <header
      className={clsx(
        "backdrop-brightness-10 fixed left-0 top-0 z-50 flex h-[18vh] w-full items-center justify-between px-6 py-4 backdrop-blur-sm",
        "md:h-[16vh]",
        {
          "lg:top-[4vh]": !pathname.split("/").includes("admin"),
          "lg:top-0": pathname.split("/").includes("admin"),
          "bg-black": showMobileMenu,
          "bg-black/50": !showMobileMenu,
        },
      )}
      id="header"
    >
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="MERN logo"
          width={110}
          height={70}
          sizes="110px"
          priority={true}
          quality={90}
          className="object-contain"
        />
      </Link>
      <button
        type="button"
        aria-expanded={showMobileMenu}
        aria-controls="mobile-menu"
        onClick={toggleMobileMenu}
        className="mr-6 block border-none bg-none text-white md:hidden"
      >
        {showMobileMenu ? (
          <FaTimes className="text-[2rem] transition-all" />
        ) : (
          <FaBars className="text-[2rem] transition-all" />
        )}
      </button>

      {showMobileMenu && <MobileMenu links={links} />}

      <nav className="hidden md:block" aria-label="Main Menu">
        <ul
          className="m-0 flex items-center justify-around gap-6 p-2"
          id="links"
        >
          {links.map((link) => (
            <li
              key={link.href}
              aria-current={link.href === pathname ? "page" : undefined}
              className={clsx(
                "relative whitespace-nowrap text-sm font-medium uppercase transition-all hover:text-blue-400 lg:text-base",
                {
                  "text-blue-400 underline":
                    link.href !== "/" &&
                    pathname.split("/").includes(link.href.replace(/\//g, "")),
                  "text-white": !(
                    link.href !== "/" &&
                    pathname.split("/").includes(link.href.replace(/\//g, ""))
                  ),
                },
              )}
            >
              <Link href={link.href}>{t(`${link.name}`)}</Link>
            </li>
          ))}
          <ul className="flex gap-3 border-l border-white/20 pl-6">
            {locales.map((lang) => (
              <li key={lang}>
                <button
                  type="button"
                  onClick={() => handleCheckLocale(lang)}
                  aria-label={`Change language to ${lang}`}
                  className="rounded px-2 py-1 text-sm font-medium transition-all hover:bg-white/10 hover:text-blue-400"
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
