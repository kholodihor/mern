import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Link as LocalizedLink,
  locales,
  type pathnames,
} from "@/i18n/navigation";
import type { TLink } from "@/types";

const MobileMenu = ({ links }: { links: TLink[] }) => {
  const t = useTranslations("Menu");
  return (
    <nav className="absolute left-0 top-[14vh] mt-4 h-[85vh] w-full bg-black md:hidden">
      <ul className="m-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        {/* Language Switcher */}
        <li className="flex gap-2">
          {locales.map((lang) => (
            <Link key={lang} href={`/${lang}`} passHref>
              <button type="button" aria-label={`Switch to ${lang} language`}>
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
        {links.map((link) => (
          <LocalizedLink
            key={link.href}
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
