"use client";

import { motion } from 'framer-motion'
import { useTranslations } from "next-intl";
import { cards } from "@/constants";

const ServicesList = () => {
  const t = useTranslations("Services");
  return (
    <section className="w-full pt-[18vh] md:pt-[25vh]  min-h-screen bg-black text-white py-16 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto max-w-4xl"
    >
      <h1 className="mainTitle">{t("title")}</h1>
      <ul className="space-y-6">
        {cards.map((card, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
                {card.emoji}
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">
                  {t(card.title)}
                </h2>
                <p className="text-gray-300">
                  {t(card.text)}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </section>
  );
};

export default ServicesList;
