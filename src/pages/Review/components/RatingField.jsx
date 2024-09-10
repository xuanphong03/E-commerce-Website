import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

RatingField.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  errorMessage: PropTypes.string,
};

function RatingField({ label, register, errorMessage }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const handleRating = (e) => {
    const { value } = e.target;
    setRating(value);
  };
  return (
    <div className="relative flex items-center gap-3">
      <label>{label}:</label>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <input
                type="radio"
                value={currentRating}
                onClick={handleRating}
                hidden
                {...register}
              />
              <FaStar
                size={20}
                className="transition-all"
                color={
                  currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {errorMessage && (
        <span className="absolute left-0 top-[calc(100%+4px)] px-1 text-sm text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default RatingField;
