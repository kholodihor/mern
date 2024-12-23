import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import ApplicationForm from "./application";
import ContactsLocation from "./location";

const Contacts = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby="contacts-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="services-title" title={t("title_2")} />

        <div className="mt-8 space-y-12 sm:mt-12 sm:space-y-16 lg:mt-16">
          <ApplicationForm />
          <ContactsLocation />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
