"use client";

import React from "react";
import { useApplications } from "@/hooks/swr/useApplications";

import { FaRegUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { CiBarcode } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";

const ApplicationById = ({ id }: { id: string }) => {
  const { getApplicationById } = useApplications();
  const application = getApplicationById(id);

  return (
    <ul className="w-full min-h-[100vh] flex justify-center items-center flex-col p-4  gap-[1rem]">
      <li className="p-4 flex text-xl gap-[1rem] w-[80%] ">
        <FaRegUser />
        {application?.name}
      </li>
      <li className="p-4 flex text-xl gap-[1rem] w-[80%] ">
        <FaPhoneAlt />
        {application?.phone}
      </li>
      <li className="p-4 flex text-xl gap-[1rem] w-[80%] ">
        <IoMdMail />
        {application?.email}
      </li>
      <li className="p-4 flex text-xl gap-[1rem] w-[80%] ">
        <CiBarcode />
        {application?.vin}
      </li>
      <li className="p-4 flex text-xl gap-[1rem] w-[80%] ">
        <FaRegMessage className="min-w-[1.5rem]" />
        <p>{application?.message}</p>
      </li>
    </ul>
  );
};

export default ApplicationById;
