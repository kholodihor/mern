import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Avatar from "react-avatar";
import { colors } from "@/constants";
import { formatReviewDate } from "@/helpers/formatDate";

const ReviewCard = ({ data: card, index }: { data: any; index?: number }) => {
  return (
    <article
      id={card.name}
      className="mx-auto flex h-[320px] w-full flex-col rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 sm:w-[300px] sm:p-6"
    >
      {/* Header with avatar and user info */}
      <header className="mb-3 flex items-center gap-3">
        <Avatar
          name={card.name}
          round={true}
          size="48"
          color={colors[index!]}
          className="flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-lg font-semibold">{card.name}</h4>
          <time className="text-sm text-gray-300">
            {formatReviewDate(card.created_at)}
          </time>
        </div>
      </header>

      {/* Rating */}
      <div className="mb-3">
        <Rating style={{ maxWidth: 100 }} value={card.rating} readOnly />
      </div>

      {/* Review text */}
      <p className="no-scrollbar flex-1 overflow-y-auto text-sm leading-relaxed text-gray-300 sm:text-base">
        {card.review}
      </p>
    </article>
  );
};

export default ReviewCard;
