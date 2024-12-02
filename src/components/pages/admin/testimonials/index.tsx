'use client'

import { Link } from '@/i18n/routing'
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { formatDate } from "@/helpers/formatDate";
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { colors } from '@/constants';
import { Rating } from '@smastrom/react-rating';
import Avatar from 'react-avatar';
import '@smastrom/react-rating/style.css'

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "testimonials");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.empty) {
        const testimonialsData: any[] = [];
        snapshot.forEach((doc) => {
          testimonialsData.push({ ...doc.data(), id: doc.id });
        });
        setTestimonials(testimonialsData);
      }
    })

    return () => unsubscribe();
  }, []);

  const deleteReview = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити відгук?")) {
      try {
        const itemRef = doc(db, "testimonials", id);
        await deleteDoc(itemRef);
        alert("Відгук успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <section className="px-[24px] relative">
      <h1 className="text-3xl font-bold mb-[24px]">Відгуки</h1>
      <ul className="w-full flex flex-wrap gap-[1rem] text-white">
        <li>
          <Link href='/admin/testimonials/add'>
            <button className='w-[13rem] h-[13rem] border border-white text-[5rem]'>+</button>
          </Link>
        </li>
        {testimonials && testimonials.map((card, index) => (
          <li id={card.name} key={index} className="w-[13rem] h-[13rem] 
           border border-white  
           flex flex-col justify-center items-center px-4 py-6 overflow-hidden relative">
            <div className="h-full flex flex-col justify-start w-full gap-2">
              <div className="flex items-center gap-4 w-full">
                <Avatar name={card.name} round={true} size='40' color={colors[index!]} />
                <div className="flex flex-col flex-1">
                  <h4 className="text-[14px] -mb-[5px]">
                    {card.name}
                  </h4>
                  <span className='text-[14px] text-white font-[800]'>{formatDate(card.created_at)}</span>
                </div>
              </div>
              <Rating style={{ maxWidth: 100 }} value={card.rating} readOnly />
              <p className="text-gray-400">{card.review}</p>
            </div>
            <button
              onClick={() => deleteReview(card.id)}
              className='absolute top-0 right-0 text-red-700 p-2 hover:scale-110'>
              <FaRegTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TestimonialsPage
