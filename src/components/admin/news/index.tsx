"use client";

import Image from "next/image";
import { useNews } from "@/hooks/useNews";
import { Link } from "@/i18n/navigation";
import DeleteButton from "../shared/delete-button";

const News = () => {
  const { newsList, deleteArticle } = useNews();

  return (
    <section className="relative px-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Актуальності</h1>
      <ul className="flex w-full flex-wrap gap-4 text-white">
        <li>
          <Link href="/admin/news/add">
            <button
              type="button"
              className="h-52 w-52 border border-white text-[5rem]"
            >
              +
            </button>
          </Link>
        </li>
        {newsList?.map((item) => (
          <li
            key={item.id}
            className="relative flex h-[210px] w-[220px] flex-col overflow-hidden"
          >
            <Image
              src={item.images[0] || "/images/placeholder-news.jpg"}
              width={250}
              height={210}
              alt={item.title.ua}
              className="h-full w-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/images/placeholder-news.jpg";
              }}
            />
            <div className="absolute bottom-0 left-0 w-full truncate bg-white/30 p-2 text-center text-sm backdrop-blur-md">
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
