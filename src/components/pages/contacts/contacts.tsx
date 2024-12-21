import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import ApplicationForm from "./application";
import ContactsLocation from "./location";

const Contacts = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby="contacts-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle id="services-title" title={t("title_2")} />
        
        <div className="mt-8 sm:mt-12 lg:mt-16 space-y-12 sm:space-y-16">
          <ApplicationForm />
          <ContactsLocation />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
