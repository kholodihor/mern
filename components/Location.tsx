"use client";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import MyMap from "./MyMap";
import { useTranslations } from "next-intl";
import Socials from "./Socials";

const Location = () => {
  const t = useTranslations("Contacts");
  return (
    <section
      id="contacts"
      className="flex-wrap lg:flex-nowrap w-full min-h-[100vh] flex mt-[10vh]"
    >
      <div className="w-full lg:w-1/2 flex justify-center items-center flex-col text-center sm:text-left pb-6">
        <h1 className="mainTitle">{t("title")}</h1>
        <ul className="w-full sm:w-3/5">
          <li className="my-4 sm:flex items-center justify-start gap-4 text-[1.2rem]">
            <span className="flex justify-center w-full sm:w-[2rem]">
              <FaMapMarkerAlt className="text-blue-400 sm:mr-2" />
            </span>
            <span>Przyszłość 2A, 05-126 Stanisławów Pierwszy</span>
          </li>
          <li className="my-4 text-center sm:flex items-center justify-start gap-4 text-[1.2rem]">
            <span className="flex justify-center w-full sm:w-[2rem]">
              <FaPhone className="text-blue-400 sm:mr-2" />
            </span>
            <span>
              <a href="tel:+48 509 158 159">+48 509 158 159</a>
            </span>
          </li>
          <li className="my-4 text-center sm:flex items-center justify-start gap-4 text-[1.2rem]">
            <span className="flex justify-center w-full sm:w-[2rem]">
              <FaEnvelope className="text-blue-400 sm:mr-2" />
            </span>
            <span>
              <a href="mailto: mern.serwis@gmail.com">mern.serwis@gmail.com</a>
            </span>
          </li>
          <h2 className="mb-4 text-xl underline text-blue-400">
            {t("social")}
          </h2>
          <Socials />
        </ul>
      </div>
      <div className="w-full lg:w-1/2">
        <MyMap />
      </div>
    </section>
  );
};

export default Location;
