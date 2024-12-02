import { useTranslations } from "next-intl";

import SectionTitle from "@/components/shared/section-title";

import ApplicationForm from "./application";
import ContactsLocation from "./location";

const Contacts = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="flex min-h-screen w-full flex-col pt-[18vh] md:pt-[25vh]"
      aria-labelledby="contacts-title"
    >
      <SectionTitle id="services-title" title={t("title_2")} />
      <ApplicationForm />
      <ContactsLocation />
    </section>
  );
};

export default Contacts;
