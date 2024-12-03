import { useTranslations } from "next-intl";
import Contacts from "@/components/shared/contacts";
import MyMap from "@/components/shared/map";
import SectionTitle from "@/components/shared/section-title";

const Location = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="mt-[10vh] flex w-full flex-col p-2"
      aria-labelledby="contacts-title"
    >
      <SectionTitle id="services-title" title={t("title")} />
      <div className="mt-[10vh] flex w-full flex-col items-center justify-center lg:flex-row">
        <Contacts />
        <MyMap />
      </div>
    </section>
  );
};

export default Location;
