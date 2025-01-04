"use client";

import { useGallery } from "@/hooks/useGallery";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import DeleteButton from "../shared/delete-button";

const Gallery = () => {
  const { galleryList, deleteGalleryItem } = useGallery();

  return (
    <section className="relative px-[24px] pb-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Галерея</h1>
      <ul className="flex w-full flex-wrap gap-[1rem] text-white">
        <li>
          <Link href="/admin/gallery/add">
            <button className="h-[13rem] w-[13rem] border border-white text-[5rem]">
              +
            </button>
          </Link>
        </li>
        {galleryList &&
          galleryList.map((item) => (
            <li key={item.id} className="relative flex flex-col">
              <Image
                src={item.images[0]}
                width={208}
                height={208}
                alt={item.car}
              />
              <div className="absolute bottom-0 left-0 w-full whitespace-nowrap
               bg-white/30 p-2 text-center text-sm backdrop-blur-md truncate">
                {item.car}
              </div>
              <DeleteButton onClick={() => deleteGalleryItem(item.id)} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Gallery;
