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

  if (!application) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl">Loading application details...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <h2 className="mb-6 border-b border-gray-700 pb-3 text-2xl font-semibold">
        Application Details
      </h2>

      <div className="overflow-hidden rounded-lg bg-gray-900 shadow-lg">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <FaRegUser className="min-w-[1.5rem] text-xl text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-xl">{application?.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <FaPhoneAlt className="min-w-[1.5rem] text-xl text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-xl">{application?.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <IoMdMail className="min-w-[1.5rem] text-xl text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-xl">{application?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <CiBarcode className="min-w-[1.5rem] text-xl text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">VIN</p>
              <p className="text-xl">{application?.vin || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 bg-gray-950 p-6">
          <div className="mb-4 flex items-center gap-3">
            <FaRegMessage className="min-w-[1.5rem] text-xl text-red-400" />
            <h3 className="text-lg font-medium">Message</h3>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-inner">
            {application?.message ? (
              <p className="whitespace-pre-wrap text-lg leading-relaxed">
                {application.message}
              </p>
            ) : (
              <p className="italic text-gray-500">No message provided</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationById;
