import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Socials from './socials'

const Contacts = () => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center 
     flex-col sm:text-left pb-6 px-4 xl:px-[4rem]">
      <ul className="w-full" role="list">
        <li className="my-4 sm:flex items-center justify-center gap-4 text-[1rem] sm:text-[1.2rem]">
          <span className="flex justify-center w-full sm:w-[2rem] mb-4 md:mb-0">
            <FaMapMarkerAlt className="text-white sm:mr-2 text-[24px] sm:text-[32px]" aria-hidden="true" />
          </span>
          <span className="text-gray-500 text-center sm:text-left whitespace-nowrap w-full mx-auto inline-block">
            Przyszłość 2A, 05-126 Stanisławów Pierwszy
          </span>
        </li>
        <li className="my-4 text-center sm:flex items-center justify-start gap-4 text-[1rem] sm:text-[1.2rem]">
          <span className="flex justify-center w-full sm:w-[2rem] mb-4 md:mb-0">
            <FaPhone className="text-white sm:mr-2 text-[24px] sm:text-[32px]" aria-hidden="true" />
          </span>
          <span className="text-gray-500 text-center">
            <a href="tel:+48509158159">+48 509 158 159</a>
          </span>
        </li>
        <li className="my-4 text-center sm:flex items-center justify-start gap-4 text-[1rem] sm:text-[1.2rem]">
          <span className="flex justify-center w-full sm:w-[2rem] mb-4 md:mb-0">
            <FaEnvelope className="text-white sm:mr-2 text-[24px] sm:text-[32px]" aria-hidden="true" />
          </span>
          <span className="text-gray-500 text-center">
            <a href="mailto:mern.serwis@gmail.com">mern.serwis@gmail.com</a>
          </span>
        </li>
        <Socials />
      </ul>
    </div>
  )
}

export default Contacts
