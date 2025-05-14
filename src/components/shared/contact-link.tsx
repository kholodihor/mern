import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ContactLink = () => {
  const t = useTranslations("Contacts");
  return (
    <Link
      href="/contacts"
      className="fixed bottom-2 right-2 z-50 flex h-[5rem] w-[5rem] items-center justify-center whitespace-pre-line rounded-full bg-[linear-gradient(to_right,_#3498db,_#2c3e50)] p-2 text-center text-xs font-semibold leading-tight text-white shadow-xl transition-transform duration-300 hover:scale-110 md:bottom-10 md:right-10 md:h-[7rem] md:w-[7rem] md:text-sm"
    >
      {t("link")}
    </Link>
  );
};

export default ContactLink;
