/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";

interface INewsItemProps {
  item: {
    title: string;
    text: string;
    images: string[];
  };
  index: number;
}

const MobileNews = ({ item, index }: INewsItemProps) => {
  const [activeImage, setActiveImage] = useState(item.images[0]);
  return (
    <div
      className={`slide-row flex w-full mx-auto transition-all relative px-4 justify-center`}
    >
      <div className="slide-col relative w-[90vw] h-[80vh] mb-[1rem] sm:mb-0 sm:h-[400px] relative">
        <div
          className={`hidden sm:flex gap-2 flex-col absolute top-[50%] -translate-y-[50%] z-[10] ${
            index % 2 !== 0 ? "left-0" : "right-0"
          }`}
        >
          {item.images.map((image, i) => (
            <img
              src={image}
              key={i}
              alt="photo"
              onClick={() => setActiveImage(image)}
              className={`w-[60px] h-[60px] rounded-full object-cover cursor-pointer ${
                image === activeImage && "border-2 border-white"
              }`}
            />
          ))}
        </div>
        <div
          className={`absolute bottom-0 sm:top-[50%] sm:-translate-y-[50%] w-full sm:w-[350px] md:w-[530px] h-[270px] bg-[rgba(255,255,255,0.5)] backdrop-blur-sm backdrop-brightness-10 p-[25px] rounded-md z-[5] overflow-hidden text-black ${
            index % 2 !== 0
              ? "left-0  sm:left-[150px]"
              : "right-0  sm:right-[150px]"
          }`}
        >
          <h2 className="mb-[12px]">{item.title}</h2>
          <p className="text-sm leading-[1.3]">{item.text}</p>
        </div>
        <div
          className={`absolute top-0 z-[2]  h-full ${
            index % 2 !== 0 ? "right-0" : "left-0"
          }`}
        >
          <img
            className="h-full w-full md:w-[350px] object-cover rounded-md"
            src={activeImage}
            alt={item.title}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNews;
