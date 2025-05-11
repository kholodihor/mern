import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ContactLink = () => {
  const t = useTranslations("Contacts");
  return (
    <Link
      href="/contacts"
      className="fixed bottom-2 right-2 md:bottom-10 md:right-10 z-50 w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem] flex items-center justify-center rounded-full
             bg-[linear-gradient(to_right,_#3498db,_#2c3e50)] text-white text-center text-xs md:text-sm font-semibold 
             leading-tight shadow-xl hover:scale-110 transition-transform duration-300 p-2 whitespace-pre-line"
    >
      {t("link")}
    </Link>
  )
}

export default ContactLink
