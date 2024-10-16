import { INewsItem } from "@/types";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface INewsItemProps {
  item: INewsItem;
  index: number;
}

const MobileNews = ({ item, index }: INewsItemProps) => {
  const t = useTranslations("News");
  const [activeImage, setActiveImage] = useState(item.images[0]);

  return (
    <div className="w-full mx-auto px-4 mb-8">
      <div className="relative w-full max-w-md mx-auto">
        {/* Main image */}
        <div className="relative w-full h-64 mb-4">
          <Image
            src={activeImage}
            alt={item.car}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Thumbnail images */}
        <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
          {item.images.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(image)}
              className={`flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 ${
                image === activeImage ? "border-blue-500" : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`${item.car} thumbnail ${i + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

        {/* Text content */}
        <div className="bg-white/30 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg">
          <h2 className="mb-3 font-bold text-xl">{item.car}</h2>
          <ul className="text-sm mb-4 space-y-1">
            {item.services.map((service, idx) => (
              <li key={idx}>{t(service)}</li>
            ))}
          </ul>
          <ul className="text-sm mb-4 space-y-1">
            <li>{t(item.contact.serviceCenter)}</li>
            <li>{item.contact.address}</li>
            <li>{item.contact.phone}</li>
            <li>{item.contact.email}</li>
          </ul>
          <ul className="text-sm flex flex-wrap gap-2">
            {item.hashtags.map((hashtag, idx) => (
              <li key={idx} className="text-blue-600">
                #{t(hashtag)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNews;