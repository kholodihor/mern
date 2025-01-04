"use client";

import { useNews } from "@/hooks/useNews";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import DeleteButton from "../shared/delete-button";

const News = () => {
  const { newsList, deleteArticle } = useNews();

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
        {newsList &&
          newsList.map((item) => (
            <li key={item.id} className="relative flex flex-col h-[210px] w-[220px] overflow-hidden">
              <Image
                src={item.image}
                width={250}
                height={210}
                alt={item.title.ua}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "/images/placeholder-news.jpg";
                }}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 flex h-1/5 w-full items-center truncate whitespace-nowrap bg-white/30 p-2 text-center text-sm backdrop-blur-md">
                {item.title.ua}
              </div>
              <DeleteButton onClick={() => deleteArticle(item.id)} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default News;
