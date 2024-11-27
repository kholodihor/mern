import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import ContactsLocation from "./location";
import ApplicationForm from "./application";

const Contacts = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh]"
      aria-labelledby="contacts-title"
    >
      <SectionTitle id='services-title' title={t("title_2")} />
      <ApplicationForm />
      <ContactsLocation />
    </section>
  )
}

export default Contacts

