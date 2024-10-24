"use client";

import { motion } from "framer-motion"
import { newsData } from "./newsData";
import { useMediaQuery } from "react-responsive";
import { useTranslations } from "next-intl";
import NewsItem from "./NewsItem";
import MobileNews from "./MobileNews";
import { INewsItem } from "@/types";

const News = () => {
  const t = useTranslations("News");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <motion.div
      className="min-h-[100vh] pt-[25vh] pb-[24px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      role="main" // Indicates the main content of the page
    >
      <motion.div
        className="flex flex-col justify-center items-center gap-4"
        variants={containerVariants}
      >
        <motion.h1
          className="mainTitle"
          variants={itemVariants}
          tabIndex={0} // Make the heading focusable
          aria-label={t("title")} // Provide an accessible label for the heading
        >
          {t("title")}
        </motion.h1>
        {newsData.length > 0 ? (
          newsData.map((item: INewsItem, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              role="article" // Specify that this is an article
              aria-labelledby={`news-title-${index}`} // Associate with the heading
            >
              {isTabletOrMobile ? (
                <MobileNews item={item} index={index} />
              ) : (
                <NewsItem item={item} index={index} />
              )}
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center"
            variants={itemVariants}
          >
            {t("noNews")} {/* Provide feedback if there are no news items */}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default News;
