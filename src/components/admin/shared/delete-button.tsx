import { FaRegTrashAlt } from "react-icons/fa";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-0 top-0 p-2 text-red-500 hover:scale-110 hover:text-red-700"
    >
      <FaRegTrashAlt />
    </button>
  );
};

export default DeleteButton;
