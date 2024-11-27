import Contacts from "@/components/shared/contacts";
import MyMap from "@/components/shared/map";

const ContactsLocation = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-center items-center w-full px-4 mt-[10vh]">
      <Contacts />
      <MyMap />
    </section>
  )
}

export default ContactsLocation
