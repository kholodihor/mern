import Avatar from 'react-avatar';
import { IReviewItem } from '@/types';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { colors } from '@/constants';

const ReviewCard = ({ data: card, index }: { data: IReviewItem, index?: number }) => {

  return (
    <article id={card.name} className="w-[90%] sm:w-[75%] md:w-[300px] h-[315px] 
    border border-white rounded-[2.5rem] 
    flex flex-col justify-center items-center px-4 py-6 mx-auto">
      <div className="h-full flex flex-col justify-start w-full gap-2">
        <div className="flex items-center gap-4 w-full">
          <Avatar name={card.name} round={true} size='40' color={colors[index!]} />
          <div className="flex flex-col flex-1">
            <h4 className="text-[20px] -mb-[5px]">
              {card.name}
            </h4>
            <span className='text-[16px] text-white font-[800]'>{card.created_at}</span>
          </div>
        </div>
        <Rating style={{ maxWidth: 100 }} value={card.rating} readOnly />
        <p className="text-gray-400">{card.review}</p>
      </div>
    </article>
  );
};

export default ReviewCard;

