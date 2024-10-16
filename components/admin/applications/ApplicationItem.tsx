import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import { isWithin48Hours } from "@/helpers/isWithin48Hours";
import { isWithin96Hours } from "@/helpers/isWithin96Hours";
import { IApplicationResponse } from "@/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { updateApplication } from "@/app/actions/applications"
import { useState } from "react";

type ApplicationItemProps = {
  item: IApplicationResponse;
  onDelete: (id: string) => void;
};

const ApplicationItem = ({ item, onDelete }: ApplicationItemProps) => {
  const [status, setStatus] = useState(item.status);
  const handleStatus = async (value: string) => {
    setStatus(value);
    if (value !== item.status) {
      await updateApplication(item.id, value);
    }
  };


  return (
    <li
      className={`w-full border-b border-b-slate-700 p-4 flex gap-4 ${
        isWithin48Hours(item.createdAt) && "text-green-400"
      } ${isWithin96Hours(item.createdAt) && "text-red-400"}`}
    >
      <span className="w-1/5 flex justify-center hover:text-blue-300">
        <Link href={`/admin/applications/${item.id}`}>{item?.name}</Link>
      </span>

      <span className="w-1/5 flex justify-center">{item?.phone}</span>

      <span className={`w-1/5 flex justify-center `}>
        {formatDate(item?.createdAt)}
      </span>

      <span className={`w-1/5 flex justify-center`}>
        <select
          name="status"
          id="status"
          defaultValue={item?.status}
          onChange={(e) => handleStatus(e.target.value)}
          className={`border text-center rounded-xl px-2 uppercase flex justify-center 
          items-center bg-black ${
            status === "new"
              ? "text-green-700 bg-green-200"
              : status === "inprocess"
              ? "text-yellow-700 bg-yellow-200"
              : "text-gray-700 bg-gray-200"
          }`}
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

      <span className="w-1/5 flex justify-center">
        <button className="text-red-500" onClick={() => onDelete(item?.id)}>
          <FaRegTrashAlt />
        </button>
      </span>
    </li>
  );
};

export default ApplicationItem;
