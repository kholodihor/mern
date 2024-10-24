"use client";

import { motion } from "framer-motion"
import Lottie from "lottie-react";
import carservice from "@/constants/animations/carservice.json";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }

  return (
    <motion.section
      id="about"
      className="p-8 w-full flex justify-center items-center flex-col text-center min-h-[100vh] pt-[18vh] md:pt-[25vh]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-labelledby="about-title"
    >
      <motion.h1 id="about-title" className="mainTitle" variants={itemVariants}>
        {t("title")}
      </motion.h1>

      <motion.div className="sm:flex justify-center items-center gap-4" variants={containerVariants}>
        <motion.div className="w-full sm:w-3/5 flex justify-center items-center" variants={itemVariants}>
          <p className="text-center text-[1.1rem]">
            {t("content")}
            <br />
            <br />
            <motion.a
              href="#contacts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("call")}
            >
              <strong>{t("call")}</strong>
            </motion.a>
          </p>
        </motion.div>

        <motion.div className="w-full sm:w-2/5 mt-6 sm:mt-0" variants={itemVariants}>
          <Lottie animationData={carservice} className="w-full invert" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        className="w-screen h-12 flex justify-center items-center gap-4 mt-8"
        id="dots"
        variants={containerVariants}
        aria-label="Carousel navigation dots"
      >
        {[...Array(5)].map((_, index) => (
          <motion.span
            key={index}
            variants={dotVariants}
            className="w-2 h-2 bg-gray-400 rounded-full"
            role="button"
            aria-label={`Navigate to slide ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </motion.div>
    </motion.section>

  );
};

export default About;
