"use client";

import { Rating } from "@smastrom/react-rating";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/firebase";
import "@smastrom/react-rating/style.css";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const SimpleAvatar = ({ name, size = 40 }: { name: string; size?: number }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/20"
    >
      {initials}
    </div>
  );
};

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
      <ul className="flex w-full flex-wrap gap-4 text-white">
        <li>
          <Link href="/admin/testimonials/add">
            <button
              type="button"
              className="h-52 w-52 border border-white text-[5rem]"
            >
              +
            </button>
          </Link>
        </li>
        {testimonials?.map((card) => (
          <li
            id={card.name}
            key={card.id}
            className="relative flex h-52 w-52 flex-col items-center justify-center overflow-hidden border border-white px-4 py-6"
          >
            <div className="flex h-full w-full flex-col justify-start gap-2">
              <div className="flex w-full items-center gap-4">
                <SimpleAvatar name={card.name} size={40} />
                <div className="flex flex-1 flex-col">
                  <h4 className="-mb-[5px] text-[14px]">{card.name}</h4>
                  <span className="text-[14px] font-[800] text-white">
                    {formatDate(card.created_at)}
                  </span>
                </div>
              </div>
              <Rating style={{ maxWidth: 100 }} value={card.rating} readOnly />
              <p className="text-gray-400">{card.review}</p>
            </div>
            <button
              type="button"
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
