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
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">Application Details</h2>
      
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <FaRegUser className="text-blue-400 text-xl min-w-[1.5rem]" />
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-xl">{application?.name || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <FaPhoneAlt className="text-green-400 text-xl min-w-[1.5rem]" />
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-xl">{application?.phone || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <IoMdMail className="text-yellow-400 text-xl min-w-[1.5rem]" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-xl">{application?.email || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <CiBarcode className="text-purple-400 text-xl min-w-[1.5rem]" />
            <div>
              <p className="text-gray-400 text-sm">VIN</p>
              <p className="text-xl">{application?.vin || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-950 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <FaRegMessage className="text-red-400 text-xl min-w-[1.5rem]" />
            <h3 className="text-lg font-medium">Message</h3>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-5 border border-gray-800 shadow-inner">
            {application?.message ? (
              <p className="text-lg whitespace-pre-wrap leading-relaxed">{application.message}</p>
            ) : (
              <p className="text-gray-500 italic">No message provided</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationById;
