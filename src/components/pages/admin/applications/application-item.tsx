import { useState } from "react";
import clsx from "clsx";
import { doc, updateDoc } from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { isOutOf96Hours } from "@/helpers/isOutOf96Hours";
import { isWithin48Hours } from "@/helpers/isWithin48Hours";
import { Link } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { IApplicationResponse } from "@/types";

type ApplicationItemProps = {
  item: IApplicationResponse;
  onDelete: (id: string) => void;
};

const ApplicationItem = ({ item, onDelete }: ApplicationItemProps) => {
  const [status, setStatus] = useState(item.status);

  const handleStatus = async (value: string) => {
    try {
      setStatus(value);
      if (value !== item.status) {
        const itemRef = doc(db, "applications", item.id);
        await updateDoc(itemRef, { status: value });
        console.log("Status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <li
      className={clsx("flex w-full gap-4 border-b border-b-slate-700 p-4", {
        "text-green-400": isWithin48Hours(item.created_at),
        "text-red-400": isOutOf96Hours(item.created_at),
      })}
    >
      <span className="flex w-1/5 justify-center hover:text-blue-300">
        <Link
          href={`/admin/applications/${item.id}`}
          className="flex items-center gap-2"
        >
          {item?.name}
          <FaEye />
        </Link>
      </span>

      <span className="flex w-1/5 justify-center">{item?.phone}</span>

      <span className={`flex w-1/5 justify-center`}>{item?.created_at}</span>

      <span className={`flex w-1/5 justify-center`}>
        <select
          name="status"
          id="status"
          defaultValue={item?.status}
          onChange={(e) => handleStatus(e.target.value)}
          className={clsx(
            "flex items-center justify-center rounded-xl border bg-black px-2 text-center uppercase",
            {
              "bg-green-200 text-green-700": status === "new",
              "bg-yellow-200 text-yellow-700": status === "inprocess",
              "bg-gray-200 text-gray-700":
                status !== "new" && status !== "inprocess",
            }
          )}
        >
          <option value="new" className="uppercase">
            new
          </option>
          <option value="inprocess" className="uppercase">
            in process
          </option>
          <option value="done" className="uppercase">
            done
          </option>
        </select>
      </span>

      <span className="flex w-1/5 justify-center">
        <button className="text-red-500" onClick={() => onDelete(item?.id)}>
          <FaRegTrashAlt />
        </button>
      </span>
    </li>
  );
};

export default ApplicationItem;
