"use client";

import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Avatar from "react-avatar";
import { FaRegTrashAlt } from "react-icons/fa";
import { colors } from "@/constants";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";

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
    });

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
    <section className="relative px-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Відгуки</h1>
      <ul className="flex w-full flex-wrap gap-[1rem] text-white">
        <li>
          <Link href="/admin/testimonials/add">
            <button className="h-[13rem] w-[13rem] border border-white text-[5rem]">
              +
            </button>
          </Link>
        </li>
        {testimonials &&
          testimonials.map((card, index) => (
            <li
              id={card.name}
              key={index}
              className="relative flex h-[13rem] w-[13rem] flex-col items-center justify-center overflow-hidden border border-white px-4 py-6"
            >
              <div className="flex h-full w-full flex-col justify-start gap-2">
                <div className="flex w-full items-center gap-4">
                  <Avatar
                    name={card.name}
                    round={true}
                    size="40"
                    color={colors[index!]}
                  />
                  <div className="flex flex-1 flex-col">
                    <h4 className="-mb-[5px] text-[14px]">{card.name}</h4>
                    <span className="text-[14px] font-[800] text-white">
                      {formatDate(card.created_at)}
                    </span>
                  </div>
                </div>
                <Rating
                  style={{ maxWidth: 100 }}
                  value={card.rating}
                  readOnly
                />
                <p className="text-gray-400">{card.review}</p>
              </div>
              <button
                onClick={() => deleteReview(card.id)}
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

export default TestimonialsPage;
