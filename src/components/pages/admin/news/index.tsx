"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";

const News = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "news");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const newsData: any[] = [];
        snapshot.forEach((doc) => {
          newsData.push({ ...doc.data(), id: doc.id });
        });
        setNews(newsData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative px-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Актуальності</h1>
      <ul className="flex w-full flex-wrap gap-[1rem] text-white">
        <li>
          <Link href="/admin/news/add">
            <button className="h-[13rem] w-[13rem] border border-white text-[5rem]">
              +
            </button>
          </Link>
        </li>
        {news &&
          news.map((item) => (
            <li key={item.id} className="relative flex flex-col">
              <Image
                src={item.image}
                width={270}
                height={270}
                alt={item.title.ua}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "/placeholder-image.jpg"; // Add a placeholder image
                }}
              />
              <div className="absolute bottom-0 left-0 flex h-1/5 w-full items-center truncate whitespace-nowrap bg-white/30 p-2 text-center text-sm backdrop-blur-md">
                {item.title.ua}
              </div>
              <button
                // onClick={() => deleteGalleryItem(item.id)}
                className="absolute right-0 top-0 p-2 text-red-700 hover:scale-110"
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default News;
