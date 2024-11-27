import Link from "next/link";
import Image from "next/image";
import { TLink } from "@/types";
import { Link as LocalizedLink, locales, pathnames } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const MobileMenu = ({ links }: { links: TLink[] }) => {
  const t = useTranslations("Menu");
  return (
    <nav className="w-full h-[85vh] absolute top-[14vh] left-0 bg-black mt-4 md:hidden">
      <ul className="w-full h-full m-0 p-4 flex flex-col justify-center items-center gap-4">
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
          <LocalizedLink key={index} href={{ pathname: link.href as keyof typeof pathnames }}>
            <li className="relative uppercase text-xl cursor-pointer" id="link">
              {t(link.name)}
            </li>
          </LocalizedLink>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;