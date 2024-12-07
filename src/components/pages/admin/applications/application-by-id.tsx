"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { CiBarcode } from "react-icons/ci";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { db } from "@/lib/firebase";

const ApplicationById = ({ id }: { id: string }) => {
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const ref = collection(db, "applications");
    const slugQuery = query(ref, where("__name__", "==", id));

    const unsubscribe = onSnapshot(slugQuery, (snapshot) => {
      if (!snapshot.empty) {
        const sortedData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setApplication(sortedData[0]);
      } else {
        setApplication(null);
      }
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <ul className="flex min-h-[100vh] w-full flex-col items-center justify-center gap-[1rem] p-4">
      <li className="flex w-[80%] gap-[1rem] p-4 text-xl">
        <FaRegUser />
        {application?.name}
      </li>
      <li className="flex w-[80%] gap-[1rem] p-4 text-xl">
        <FaPhoneAlt />
        {application?.phone}
      </li>
      <li className="flex w-[80%] gap-[1rem] p-4 text-xl">
        <IoMdMail />
        {application?.email}
      </li>
      <li className="flex w-[80%] gap-[1rem] p-4 text-xl">
        <CiBarcode />
        {application?.vin}
      </li>
      <li className="flex w-[80%] gap-[1rem] p-4 text-xl">
        <FaRegMessage className="min-w-[1.5rem]" />
        <p>{application?.message}</p>
      </li>
    </ul>
  );
};

export default ApplicationById;
