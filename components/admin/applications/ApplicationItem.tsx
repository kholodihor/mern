import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import { isWithin48Hours } from "@/helpers/isWithin48Hours";
import { isWithin96Hours } from "@/helpers/isWithin96Hours";
import { IApplicationResponse } from "@/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { updateApplication } from "@/utils/api/applications";

type ApplicationItemProps = {
  item: IApplicationResponse;
  onDelete: (id: string) => void;
};

const ApplicationItem = ({ item, onDelete }: ApplicationItemProps) => {
  const handleStatus = async (value: string) => {
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
        <Link href={`/admin/applications/${item.id}`}>{item.name}</Link>
      </span>

      <span className="w-1/5 flex justify-center">{item.phone}</span>

      <span className={`w-1/5 flex justify-center `}>
        {formatDate(item.createdAt)}
      </span>

      <span className={`w-1/5 flex justify-center`}>
        <select
          name="status"
          id="status"
          defaultValue={item.status}
          onChange={(e) => handleStatus(e.target.value)}
          className={`border text-center rounded-xl px-2 uppercase flex justify-center 
          items-center bg-black ${
            item.status === "new"
              ? "border-green-500 text-green-500"
              : item.status === "inprocess"
              ? "border-yellow-500 text-yellow-500"
              : "border-gray-300 text-gray-300"
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
        <button className="text-red-500" onClick={() => onDelete(item.id)}>
          <FaRegTrashAlt />
        </button>
      </span>
    </li>
  );
};

export default ApplicationItem;
