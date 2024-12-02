'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image';
import { useGallery } from '@/hooks/useGallery';
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from 'react';

const Gallery = () => {
  const { galleryList, fetchGalleryAsList, deleteGalleryItem } = useGallery();

  useEffect(() => {
    fetchGalleryAsList();
  }, [])

  return (
    <section className="px-[24px] relative">
      <h1 className="text-3xl font-bold mb-[24px]">Галерея</h1>
      <ul className="w-full flex flex-wrap gap-[1rem] text-white">
        <li>
          <Link href='/admin/gallery/add'>
            <button className='w-[13rem] h-[13rem] border border-white text-[5rem]'>+</button>
          </Link>
        </li>
        {galleryList && galleryList.map((item, index) => (
          <li key={index} className='flex flex-col relative'>
            <Image src={item.images[0]} width={208} height={208} alt={item.car} />
            <div className='absolute bottom-0 left-0 w-full text-center 
            bg-white/30 backdrop-blur-md text-sm p-2 whitespace-nowrap'>
              {item.car}
            </div>
            <button
              onClick={() => deleteGalleryItem(item.id)}
              className='absolute top-0 right-0 text-red-700 p-2 hover:scale-110'>
              <FaRegTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Gallery
