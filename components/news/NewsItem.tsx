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

const NewsItem = ({ item, index }: INewsItemProps) => {
  const [activeImage, setActiveImage] = useState(item.images[0]);

  return (
    <div
      className={`slide-row flex w-full mx-auto transition-all relative px-4 ${
        index % 2 !== 0 ? "justify-end" : "justify-start"
      }`}
    >
      <div className="slide-col relative w-[80vw] h-[400px] relative">
        <div
          className={`flex gap-2 flex-col absolute top-[50%] -translate-y-[50%] ${
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
          className={`absolute top-[50%] -translate-y-[50%] w-[530px] h-[270px] bg-[rgba(255,255,255,0.5)] backdrop-blur-sm backdrop-brightness-10 p-[45px] rounded-md z-[2] ${
            index % 2 !== 0 ? "left-[250px]" : "right-[250px]"
          }`}
        >
          <h2 className="mb-[24px]">{item.title}</h2>
          <p className="text-sm leading-[1.3]">{item.text}</p>
        </div>
        <div
          className={`absolute top-0  h-full ${
            index % 2 !== 0 ? "right-0" : "left-0"
          }`}
        >
          <img
            className="h-full w-[350px] object-cover rounded-md"
            src={activeImage}
            alt={item.title}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
