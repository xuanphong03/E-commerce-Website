import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

FilterByRating.propTypes = {};

function FilterByRating({ onChange }) {
  const handleChange = (e) => {
    const ratingGreaterThanValue = e.target.value;
    onChange(ratingGreaterThanValue);
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-base font-medium">Theo đánh giá</h3>
      <ul>
        {[...Array(5)].map((_, index) => (
          <li key={index} className="mb-2">
            <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-red-500">
              <input
                onChange={handleChange}
                type="radio"
                name="brands"
                value={index + 1}
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, _index) => {
                  return (
                    <React.Fragment key={_index}>
                      {_index > index ? <FaRegStar /> : <FaStar />}
                    </React.Fragment>
                  );
                })}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByRating;
