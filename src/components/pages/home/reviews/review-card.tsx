import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Avatar from "react-avatar";
import { colors } from "@/constants";
import { formatDate } from "@/helpers/formatDate";

const ReviewCard = ({ data: card, index }: { data: any; index?: number }) => {
  return (
    <article
      id={card.name}
      className="mx-auto flex h-[315px] w-[90%] flex-col items-center justify-center rounded-[2.5rem] border border-white px-4 py-6 sm:w-[75%] md:w-[300px]"
    >
      <div className="flex h-full w-full flex-col justify-start gap-2">
        <div className="flex w-full items-center gap-4">
          <Avatar
            name={card.name}
            round={true}
            size="40"
            color={colors[index!]}
          />
          <div className="flex flex-1 flex-col">
            <h4 className="-mb-[5px] text-[20px]">{card.name}</h4>
            <span className="text-[16px] font-[800] text-white">
              {formatDate(card.created_at)}
            </span>
          </div>
        </div>
        <Rating style={{ maxWidth: 100 }} value={card.rating} readOnly />
        <p className="text-gray-400">{card.review}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
