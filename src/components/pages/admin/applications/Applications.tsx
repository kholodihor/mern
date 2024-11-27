"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { IApplicationResponse } from "@/types";
import ApplicationItem from "./ApplicationItem";

const Applications = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const applicationsRef = collection(db, "applications");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      if (!snapshot.empty) {
        const applicationsData: any[] = [];
        snapshot.forEach((doc) => {
          applicationsData.push({ ...doc.data(), id: doc.id });
        });
        setApplications(applicationsData);
      }
    })

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю заявку?")) {
      try {
        const itemRef = doc(db, "applications", id);
        await deleteDoc(itemRef);
        alert("Заявку успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <section className="px-[24px] relative">
      <h1 className="text-3xl font-bold mb-[24px]">Заявки на сервіс</h1>
      <ul className="w-full flex flex-col gap-[1rem] text-white">
        {applications &&
          Array.isArray(applications) &&
          applications.map((item: IApplicationResponse) => (
            <ApplicationItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
      </ul>
    </section>
  );
};

export default Applications;
