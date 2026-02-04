import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Socials from "./socials";

const Contacts = () => {
  return (
    <div className="flex w-full flex-col justify-center px-4 pb-6 sm:text-left lg:w-1/2 xl:px-16">
      <ul className="w-full border-gray-500 md:border-l md:pl-4">
        <li className="my-4 items-center justify-center gap-4 text-[1rem] sm:flex sm:text-[1.2rem]">
          <span className="mb-4 flex w-full justify-center sm:w-8 md:mb-0">
            <FaMapMarkerAlt
              className="text-[24px] text-yellow-500 sm:mr-2 sm:text-[28px]"
              aria-hidden="true"
            />
          </span>
          <span className="mx-auto inline-block w-full whitespace-nowrap text-center text-gray-500 sm:text-left">
            Przyszłość 2A, 05-126 Stanisławów Pierwszy
          </span>
        </li>
        <li className="my-4 items-center justify-start gap-4 text-center text-[1rem] sm:flex sm:text-[1.2rem]">
          <span className="mb-4 flex w-full justify-center sm:w-8 md:mb-0">
            <FaPhone
              className="text-[24px] text-green-500 sm:mr-2 sm:text-[28px]"
              aria-hidden="true"
            />
          </span>
          <span className="text-center text-gray-500">
            <a href="tel:+48509158159">+48 509 158 159</a>
          </span>
        </li>
        <li className="my-4 items-center justify-start gap-4 text-center text-[1rem] sm:flex sm:text-[1.2rem]">
          <span className="mb-4 flex w-full justify-center sm:w-8 md:mb-0">
            <FaEnvelope
              className="text-[24px] text-teal-500 sm:mr-2 sm:text-[28px]"
              aria-hidden="true"
            />
          </span>
          <span className="text-center text-gray-500">
            <a href="mailto:mern.serwis@gmail.com">mern.serwis@gmail.com</a>
          </span>
        </li>
        <Socials />
      </ul>
    </div>
  );
};

export default Contacts;
