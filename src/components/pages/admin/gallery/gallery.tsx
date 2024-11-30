'use client'

import { Link } from '@/i18n/routing'
import { db } from '@/lib/firebase';
// import { getImageUrlsFromGroup } from '@/utils/imageUploader';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const Gallery = () => {
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const applicationsRef = collection(db, "gallery");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      if (!snapshot.empty) {
        const galleryData: any[] = [];
        snapshot.forEach((doc) => {
          galleryData.push({ ...doc.data(), id: doc.id });
        });
        setGallery(galleryData);
      }
    })
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (!gallery[0]?.images) return
  //   const fetchImages = async (group: string) => {
  //     const images = await getImageUrlsFromGroup(group)
  //     const urls = images.map((image: any) => `https://ucarecdn.com/${image.file_id}/${image.filename}`)
  //     setGallery((prev) => [...prev, { images: urls }])
  //   }

  //   fetchImages(gallery[0]?.images)
  // }, [gallery])

  console.log(gallery)

  return (
    <section className="px-[24px] relative">
      <h1 className="text-3xl font-bold mb-[24px]">Заявки на сервіс</h1>
      <ul className="w-full flex flex-col gap-[1rem] text-white">
        <li>
          <Link href='/admin/gallery/add'>
            <button className='w-[10rem] h-[10rem] border border-white text-[5rem]'>+</button>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Gallery
