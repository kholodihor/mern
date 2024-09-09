"use client";

import { IApplicationResponse } from "@/types";
import { useApplications } from "@/hooks/swr/useApplications";
import ApplicationItem from "./ApplicationItem";
import Spiral from "@/components/spiral/Spiral";

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
        <Spiral />
      ) : (
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
      )}
    </section>
  );
};

export default Applications;
