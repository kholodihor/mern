import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { isWithin48Hours } from "@/helpers/isWithin48Hours";
import { isOutOf96Hours } from "@/helpers/isOutOf96Hours";
import { IApplicationResponse } from "@/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

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
      className={clsx(
        'w-full border-b border-b-slate-700 p-4 flex gap-4',
        {
          'text-green-400': isWithin48Hours(item.created_at),
          'text-red-400': isOutOf96Hours(item.created_at),
        }
      )}
    >
      <span className="w-1/5 flex justify-center hover:text-blue-300">
        <Link href={`/admin/applications/${item.id}`} className='flex gap-2 items-center'>
          {item?.name}<FaEye />
        </Link>
      </span>

      <span className="w-1/5 flex justify-center">{item?.phone}</span>

      <span className={`w-1/5 flex justify-center `}>
        {item?.created_at}
      </span>

      <span className={`w-1/5 flex justify-center`}>
        <select
          name="status"
          id="status"
          defaultValue={item?.status}
          onChange={(e) => handleStatus(e.target.value)}
          className={clsx(
            'border text-center rounded-xl px-2 uppercase flex justify-center items-center bg-black',
            {
              'text-green-700 bg-green-200': status === 'new',
              'text-yellow-700 bg-yellow-200': status === 'inprocess',
              'text-gray-700 bg-gray-200': status !== 'new' && status !== 'inprocess',
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

      <span className="w-1/5 flex justify-center">
        <button className="text-red-500" onClick={() => onDelete(item?.id)}>
          <FaRegTrashAlt />
        </button>
      </span>
    </li>
  );
};

export default ApplicationItem;
