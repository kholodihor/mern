import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ContactLink = () => {
  const t = useTranslations("Contacts");
  return (
    <Link
      href="/contacts"
      className="fixed bottom-10 right-10 z-50 w-[8rem] h-[8rem] flex items-center justify-center rounded-full
             bg-gradient-to-br from-pink-500 to-yellow-400 text-white text-center text-sm font-semibold 
             leading-tight shadow-xl hover:scale-110 transition-transform duration-300 p-2"
    >
      {t("link")}
    </Link>


  )
}

export default ContactLink
