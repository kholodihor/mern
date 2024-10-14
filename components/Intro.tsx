"use client";

import { motion } from 'framer-motion'
import IntroSlider from "./IntroSlider";
import { useTranslations } from "next-intl";
import { pathnames ,locales} from "@/i18n";
import { Link } from "@/navigation";
import ContactsBubble from "./ContactsBubble";

const Intro = () => {
  const t = useTranslations("Menu");

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
    <IntroSlider />
    <div className="absolute w-full sm:w-2/3 text-center sm:text-left top-[40%] sm:top-[35%] sm:left-[10%] z-10">
    <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
            duration: 1.5
          }}
          className="uppercase text-[13vh] sm:text-[20vh] font-bold bg-clip-text text-transparent drop-shadow-[5px_5px_0_#000] bg-gradient-to-r from-sky-500 to-indigo-500"
        >
          MERN
        </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          ease: "easeOut"
        }}
        className='w-full sm:-mt-[3rem]  h-full flex flex-col justify-between items-center md:flex-row'
      >
        <p className="uppercase text-[1.7rem] sm:text-[2rem] font-bold bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent drop-shadow-[2px_2px_0_#000]">{t("motto")}</p>
        <button className='bg-gradient-to-r hover:bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] py-2 px-4 rounded-lg w-[250px] mt-4 md:mb-4 whitespace-nowrap'><Link  href={{ pathname: '/contacts'}}>{t("button")} </Link></button>
      </motion.div>
    </div>
   
    <ContactsBubble />
  </div>
  );
};

export default Intro;
