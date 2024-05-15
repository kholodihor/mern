"use client";

import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import { isWithin48Hours } from "@/helpers/isWithin48Hours";
import { isWithin96Hours } from "@/helpers/isWithin96Hours";
import { IApplicationResponse } from "@/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useApplications } from "@/hooks/swr/useApplications";
import Loader from "../loader/Loader";

const Applications = () => {
  const { applications, isLoading, deleteApplication } = useApplications();

  const handleDelete = (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю заявку?")) {
      deleteApplication(id);
    }
  };

  return (
    <section className="px-[24px] relative">
      <h1 className="text-3xl font-bold mb-[24px]">Заявки на сервіс</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="w-full flex flex-col gap-[1rem] text-white">
          {applications &&
            Array.isArray(applications) &&
            applications.map((item: IApplicationResponse) => (
              <li
                key={item.id}
                className={`w-full border-b border-b-slate-700 p-4 flex gap-4 ${
                  isWithin48Hours(item.createdAt) && "text-green-500"
                } ${isWithin96Hours(item.createdAt) && "text-red-500"}`}
              >
                <span className="w-1/4 flex justify-center hover:text-blue-300">
                  <Link href={`/admin/applications/${item.id}`}>
                    {item.name}
                  </Link>
                </span>

                <span className="w-1/4 flex justify-center">{item.phone}</span>
                <span className={`w-1/4 flex justify-center `}>
                  {formatDate(item.createdAt)}
                </span>
                <span className="w-1/4 flex justify-center">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </span>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default Applications;
