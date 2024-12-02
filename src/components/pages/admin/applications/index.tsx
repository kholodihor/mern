/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { IApplicationResponse } from "@/types";

import ApplicationItem from "./application-item";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    });

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
    <section className="relative px-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Заявки на сервіс</h1>
      <ul className="flex w-full flex-col gap-[1rem] text-white">
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
