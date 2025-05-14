import { useState } from "react";
import clsx from "clsx";
import { doc, updateDoc } from "firebase/firestore";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { formatDateWithSlashes } from "@/helpers/formatDate";
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
    <li className="mb-2 overflow-hidden rounded-lg bg-gray-900 shadow-md transition-all hover:shadow-lg">
      <div className="flex w-full flex-wrap items-center gap-2 p-4 sm:flex-nowrap sm:gap-4">
        {/* Name with View Icon */}
        <div className="w-full sm:w-1/5">
          <Link
            href={`/admin/applications/${item.id}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-white transition-colors hover:bg-blue-900/30 hover:text-blue-400"
          >
            <span className="truncate font-medium">{item?.name || "N/A"}</span>
            <FaEye className="ml-auto text-blue-400" />
          </Link>
        </div>

        {/* Phone */}
        <div className="w-full sm:w-1/5">
          <div className="rounded-md px-3 py-2">
            <p className="text-sm text-gray-400">Phone</p>
            <p className="font-medium">{item?.phone || "N/A"}</p>
          </div>
        </div>

        {/* Date */}
        <div className="w-full sm:w-1/5">
          <div className="rounded-md px-3 py-2">
            <p className="text-sm text-gray-400">Date</p>
            <p
              className={clsx("font-medium", {
                "text-green-400": isWithin48Hours(item.created_at),
                "text-red-400": isOutOf96Hours(item.created_at),
              })}
            >
              {formatDateWithSlashes(item?.created_at)}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="w-full sm:w-1/5">
          <div className="rounded-md px-3 py-2">
            <p className="mb-1 text-sm text-gray-400">Status</p>
            <select
              name="status"
              id="status"
              defaultValue={item?.status}
              onChange={(e) => handleStatus(e.target.value)}
              className={clsx(
                "w-full cursor-pointer rounded-md border px-3 py-1 text-center font-medium uppercase transition-colors",
                {
                  "border-green-500 bg-green-900/20 text-green-400":
                    status === "new",
                  "border-yellow-500 bg-yellow-900/20 text-yellow-400":
                    status === "inprocess",
                  "border-gray-500 bg-gray-900/20 text-gray-400":
                    status !== "new" && status !== "inprocess",
                }
              )}
            >
              <option value="new" className="bg-black uppercase">
                new
              </option>
              <option value="inprocess" className="bg-black uppercase">
                in process
              </option>
              <option value="done" className="bg-black uppercase">
                done
              </option>
            </select>
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex w-full justify-center sm:w-1/5">
          <button
            className="flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors hover:bg-red-900/30 hover:text-red-400"
            onClick={() => onDelete(item?.id)}
            aria-label="Delete application"
          >
            <FaRegTrashAlt className="text-lg" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ApplicationItem;
