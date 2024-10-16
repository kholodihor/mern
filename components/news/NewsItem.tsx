/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useTranslations } from "next-intl";
import { INewsItem } from "@/types";
import React, { useState } from "react";

interface INewsItemProps {
  item: INewsItem;
  index: number;
}

const NewsItem = ({ item, index }: INewsItemProps) => {
  const t = useTranslations("News");
  const [activeImage, setActiveImage] = useState(item.images[0]);

  return (
    <div
      className={`slide-row flex flex-col w-full mx-auto transition-all relative px-4 my-[2rem] ${
        index % 2 !== 0 ? "justify-end" : "justify-start"
      }`}
    >
      <div className="slide-col relative w-[85vw] xl:w-[80vw] 2xl:w-[65vw] h-[400px]">
        {/* Thumbnail images on the side */}
        <div
          className={`flex gap-2 flex-col absolute top-[50%] -translate-y-[50%] ${
            index % 2 !== 0 ? "left-0" : "right-0"
          }`}
        >
          {item.images.map((image, i) => (
           <Image
           src={image}
           key={i}
           alt="thumbnail"
           width={60}
           height={60}
           onClick={() => setActiveImage(image)}
           className={`rounded-full object-cover cursor-pointer ${image === activeImage ? "border-2 border-white" : ""}`}
         />
          ))}
        </div>

        {/* Text content */}
        <div
          className={`absolute top-[50%] -translate-y-[50%] w-[530px] min-h-[270px] bg-[rgba(255,255,255,0.2)] backdrop-blur-sm backdrop-brightness-10 p-4 rounded-md z-[2] ${
            index % 2 !== 0 ? "left-[250px]" : "right-[250px]"
          }`}
        >
       <div className="flex items-center justify-between mb-[24px]">
       <h2 className="font-bold text-lg">{item.car}</h2>
       <span className="text-gray-500">{item.createdAt}</span>
       </div>
          <ul className="text-sm leading-[1.3] mb-4">
            {item.services.map((service, idx) => (
              <li key={idx}>{t(service)}</li>
            ))}
          </ul>
          <ul className="text-sm leading-[1.3]">
            <li>{t(item.contact.serviceCenter)}</li>
            <li>{item.contact.address}</li>
            <li>{item.contact.phone}</li>
            <li>{item.contact.email}</li>
          </ul>
          <ul className="text-sm leading-[1.3] mt-4 flex flex-wrap text-blue-500">
            {item.hashtags.map((hashtag, idx) => (
              <li key={idx} className="mr-2">
                {t(hashtag)}
              </li>
            ))}
          </ul>
        </div>

        {/* Active image */}
        <div
          className={`absolute top-0 h-full ${
            index % 2 !== 0 ? "right-0" : "left-0"
          }`}
        >
         <Image
           src={activeImage}
           alt={item.car}
           width={350}
           height={0}
           className="h-full object-cover rounded-md"
/>
        </div>
      </div>
      <div className="w-[30vw] h-[2px] bg-blue-300 mx-auto mt-[4rem]"></div>
    </div>
  );
};

export default NewsItem;
