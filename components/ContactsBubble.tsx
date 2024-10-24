import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const ContactsBubble = () => {
  return (
    <div
      className="hidden md:block lg:hidden h-[20vw] sm:w-[40vw] aspect-video bg-black text-white absolute top-[18vh] right-[2rem] z-[9999] rounded-md"
      aria-labelledby="contact-info-heading"
    >
      <div className="sr-only" id="contact-info-heading">Contact Information</div>
      <dl className="w-full h-full flex flex-col justify-center items-start pl-4 gap-2 text-sm">
        <dt className="font-bold underline">Niezależny serwis BMW, Rolls-Royce i MINI</dt>
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
          <a href="tel:+48509158159" className="underline">509 158 159</a>
        </dd>
        <dd className="flex gap-2">
          <FaPhone
            className="text-blue-400 sm:mr-2"
            aria-hidden="true" /* Decorative icon */
          />
          <a href="tel:+48509159158" className="underline">509 159 158</a>
        </dd>
      </dl>
      <div className="absolute top-[10%] -right-[1.8rem] w-0 h-0 border-l-[1rem] border-l-transparent border-r-[1rem] border-r-transparent border-b-[2rem] border-b-black rotate-90"></div>
    </div>

  );
};

export default ContactsBubble;
