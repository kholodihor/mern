import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ContactLink = () => {
  const t = useTranslations("Contacts");
  return (
    <Link
      href="/contacts"
      className="fixed bottom-2 right-2 z-50 flex h-20 w-20 items-center justify-center whitespace-pre-line rounded-full bg-[linear-gradient(to_right,#3498db,#2c3e50)] p-2 text-center text-xs font-semibold leading-tight text-white shadow-xl transition-transform duration-300 hover:scale-110 md:bottom-10 md:right-10 md:h-28 md:w-28 md:text-sm"
    >
      {t("link")}
    </Link>
  );
};

export default ContactLink;
