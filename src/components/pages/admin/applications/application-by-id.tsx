"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { CiBarcode } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { db } from "@/lib/firebase";

const ApplicationById = ({ id }: { id: string }) => {
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

  const application = applications.find((application) => application.id === id);

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
