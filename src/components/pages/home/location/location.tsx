import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import Contacts from "@/components/shared/contacts";
import MyMap from "@/components/shared/map";

const Location = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="flex flex-col w-full mt-[10vh] p-2"
      aria-labelledby="contacts-title"
    >
      <SectionTitle id='services-title' title={t("title")} />
      <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-[10vh]">
        <Contacts />
        <MyMap />
      </div>

    </section>
  )
}

export default Location
