import Contacts from "@/components/shared/contacts";
import MyMap from "@/components/shared/map";

const ContactsLocation = () => {
  return (
    <section className="mt-[10vh] flex w-full flex-col items-center justify-center px-4 lg:flex-row">
      <MyMap />
      <Contacts />
    </section>
  );
};

export default ContactsLocation;
