/* eslint-disable @next/next/no-img-element */

import { INewsItem } from "@/types";
import React, { useState } from "react";

interface INewsItemProps {
  item: INewsItem;
  index: number;
}

const MobileNews = ({ item, index }: INewsItemProps) => {
  const [activeImage, setActiveImage] = useState(item.images[0]);
  return (
    <div
      className={`slide-row flex w-full mx-auto transition-all relative px-4 mb-[2rem] ${
        index % 2 !== 0 ? "justify-end" : "justify-start"
      }`}
    >
      <div className="slide-col relative w-[80vw] sm:w-[90vw] h-[90vh] sm:h-[400px] mb-[1rem]">
        {/* Thumbnail images on the side */}
        <div
          className={`hidden sm:flex gap-2 flex-col absolute top-[50%] -translate-y-[50%] z-[10] ${
            index % 2 !== 0 ? "left-0" : "right-0"
          }`}
        >
          {item.images.map((image, i) => (
            <img
              src={image}
              key={i}
              alt="thumbnail"
              onClick={() => setActiveImage(image)}
              className={`w-[60px] h-[60px] rounded-full object-cover cursor-pointer ${
                image === activeImage ? "border-2 border-white" : ""
              }`}
            />
          ))}
        </div>

        {/* Text content */}
        <div
          className={`absolute bottom-0 sm:top-[50%] sm:-translate-y-[50%] w-full sm:w-[350px] md:w-[530px] min-h-[270px] bg-[rgba(255,255,255,0.5)] backdrop-blur-sm backdrop-brightness-10 p-4 rounded-md z-[5] overflow-hidden text-black ${
            index % 2 !== 0
              ? "left-0 sm:left-[150px]"
              : "right-0 sm:right-[150px]"
          }`}
        >
          <h2 className="mb-[12px] font-bold text-lg">{item.car}</h2>
          <ul className="text-sm leading-[1.3] mb-4">
            {item.services.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
          <ul className="text-sm leading-[1.3]">
            <li>{item.contact.serviceCenter}</li>
            <li>{item.contact.address}</li>
            <li>{item.contact.phone}</li>
            <li>{item.contact.email}</li>
          </ul>
          <ul className="text-sm leading-[1.3] mt-4 flex flex-wrap text-blue-400">
            {item.hashtags.map((hashtag, idx) => (
              <li key={idx} className="mr-2">
                {hashtag}
              </li>
            ))}
          </ul>
        </div>

        {/* Active image */}
        <div
          className={`absolute top-0 z-[2] h-[220px] w-full sm:w-auto sm:h-full ${
            index % 2 !== 0 ? "right-0" : "left-0"
          }`}
        >
          <img
            className="h-full w-full sm:w-[350px] object-cover rounded-md"
            src={activeImage}
            alt={item.car}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNews;
