import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ readonly = true, productReviewRate = 0 }) {
  const [selectedStarCount, setSelectedStarCount] = useState(() =>
    Math.floor(productReviewRate),
  );

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        return (
          <span
            key={index}
            className={`${selectedStarCount >= index + 1 ? 'text-[#FFAD33]' : 'text-[#BFBFBF]'} ${readonly ? '' : 'cursor-pointer'}`}
            onClick={() => {
              if (!readonly) {
                setSelectedStarCount(index + 1);
              }
            }}
          >
            <FaStar />
          </span>
        );
      })}
    </div>
  );
}
