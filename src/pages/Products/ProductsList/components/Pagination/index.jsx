import React, { useState } from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {};

function Pagination({ totalPage, currentPage, onChange }) {
  const handleChangPage = (page) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <ul className="flex gap-2">
      {[...Array(totalPage)].map((_, index) => (
        <li
          onClick={() => handleChangPage(index + 1)}
          className={`${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-500 hover:text-white'} flex size-10 cursor-pointer items-center justify-center rounded transition-all`}
          key={index}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
