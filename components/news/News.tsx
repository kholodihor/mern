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
    >
      <motion.div 
        className="flex flex-col justify-center items-center gap-4"
        variants={containerVariants}
      >
        <motion.h1 
          className="mainTitle"
          variants={itemVariants}
        >
          {t("title")}
        </motion.h1>
        {newsData.map((item: INewsItem, index: number) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isTabletOrMobile ? (
              <MobileNews item={item} index={index} />
            ) : (
              <NewsItem item={item} index={index} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default News;
