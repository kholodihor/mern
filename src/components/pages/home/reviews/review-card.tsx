import { colors } from "@/constants";
import { formatReviewDate } from "@/helpers/formatDate";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Avatar from "react-avatar";

const ReviewCard = ({ data: card, index }: { data: any; index?: number }) => {
  return (
    <article
      id={card.name}
      className="mx-auto h-[320px] w-full sm:w-[300px] flex flex-col rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 sm:p-6 transition-all hover:border-white/30 hover:bg-white/10"
    >
      {/* Header with avatar and user info */}
      <header className="flex items-center gap-3 mb-3">
        <Avatar
          name={card.name}
          round={true}
          size="48"
          color={colors[index!]}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold truncate">{card.name}</h4>
          <time className="text-sm text-gray-300">
            {formatReviewDate(card.created_at)}
          </time>
        </div>
      </header>

      {/* Rating */}
      <div className="mb-3">
        <Rating
          style={{ maxWidth: 100 }}
          value={card.rating}
          readOnly
        />
      </div>

      {/* Review text */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-1 overflow-y-auto no-scrollbar">
        {card.review}
      </p>
    </article>
  );
};

export default ReviewCard;
