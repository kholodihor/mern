import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link as LocalizedLink, locales, pathnames } from "@/i18n/routing";
import { TLink } from "@/types";

const MobileMenu = ({ links }: { links: TLink[] }) => {
  const t = useTranslations("Menu");
  return (
    <nav className="absolute left-0 top-[14vh] mt-4 h-[85vh] w-full bg-black md:hidden">
      <ul className="m-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        {/* Language Switcher */}
        <li className="flex gap-2">
          {locales.map((lang, i) => (
            <Link key={i} href={`/${lang}`} passHref>
              <button aria-label={`Switch to ${lang} language`}>
                <Image
                  src={`/icons/${lang}.svg`}
                  alt={`Language: ${lang}`}
                  width={35}
                  height={10}
                />
              </button>
            </Link>
          ))}
        </li>

        {/* Navigation Links */}
        {links.map((link, index) => (
          <LocalizedLink
            key={index}
            href={{ pathname: link.href as keyof typeof pathnames }}
          >
            <li className="relative cursor-pointer text-xl uppercase" id="link">
              {t(link.name)}
            </li>
          </LocalizedLink>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
