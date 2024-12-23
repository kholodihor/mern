"use client";

import { useEffect } from "react";
import { IApplicationResponse } from "@/types";
import ApplicationItem from "./application-item";
import { useApplications } from "@/hooks/useApplications";

const Applications = () => {
  const { applications, fetchApplications, deleteApplication } = useApplications();

  useEffect(() => {
    const unsubscribe = fetchApplications();
    return () => unsubscribe();
  }, []);

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
              onDelete={deleteApplication}
            />
          ))}
      </ul>
    </section>
  );
};

export default Applications;
