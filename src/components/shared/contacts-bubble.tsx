import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactsBubble = () => {
  return (
    <div
      className="absolute right-[2rem] top-[18vh] z-[9999] hidden aspect-video h-[20vw] rounded-md bg-black text-white sm:w-[40vw] md:block lg:hidden"
      aria-labelledby="contact-info-heading"
    >
      <div className="sr-only" id="contact-info-heading">
        Contact Information
      </div>
      <dl className="flex h-full w-full flex-col items-start justify-center gap-2 pl-4 text-sm">
        <dt className="font-bold underline">
          Niezależny serwis BMW, Rolls-Royce i MINI
        </dt>
        <dd className="flex gap-2">
          <FaMapMarkerAlt
            className="text-blue-400 sm:mr-2"
            aria-hidden="true" /* Mark icon as decorative */
          />
          <span>ul. Przyszłość 2A Stanisławów Pierwszy</span>
        </dd>
        <dd className="flex gap-2">
          <FaEnvelope
            className="text-blue-400 sm:mr-2"
            aria-hidden="true" /* Decorative icon */
          />
          <a href="mailto:mern.serwis@gmail.com" className="underline">
            mern.serwis@gmail.com
          </a>
        </dd>
        <dd className="flex gap-2">
          <FaPhone
            className="text-blue-400 sm:mr-2"
            aria-hidden="true" /* Decorative icon */
          />
          <a href="tel:+48509158159" className="underline">
            509 158 159
          </a>
        </dd>
        <dd className="flex gap-2">
          <FaPhone
            className="text-blue-400 sm:mr-2"
            aria-hidden="true" /* Decorative icon */
          />
          <a href="tel:+48509159158" className="underline">
            509 159 158
          </a>
        </dd>
      </dl>
      <div className="absolute -right-[1.8rem] top-[10%] h-0 w-0 rotate-90 border-b-[2rem] border-l-[1rem] border-r-[1rem] border-b-black border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default ContactsBubble;
