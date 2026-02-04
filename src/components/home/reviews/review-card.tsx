import { Rating } from "@smastrom/react-rating";
import { formatReviewDate } from "@/helpers/formatDate";
import type { Review } from "@/types/reviews";
import "@smastrom/react-rating/style.css";

const SimpleAvatar = ({ name, size = 48 }: { name: string; size?: number }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-white/20"
    >
      {initials}
    </div>
  );
};

const ReviewCard = ({ data: card }: { data: Review }) => {
  return (
    <article
      id={card.name}
      className="mx-auto flex h-[320px] w-full flex-col rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 sm:w-[300px] sm:p-6"
    >
      {/* Header with avatar and user info */}
      <header className="mb-3 flex items-center gap-3">
        <SimpleAvatar name={card.name} size={48} />
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
      <p
        className="flex-1 overflow-y-auto text-sm leading-relaxed text-gray-300 sm:text-base scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4B5563 transparent",
        }}
      >
        {card.review}
      </p>
    </article>
  );
};

export default ReviewCard;
