import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { set } from 'react-hook-form';

FilterViewer.propTypes = {};

function FilterViewer({ onChange, _filters }) {
  const [releasedFilter, setReleasedFilter] = useState(
    () => Boolean(_filters.isPromotion) || false,
  );
  const [promotionFilter, setPromotionFilter] = useState(
    () => Boolean(_filters.isReleased) || false,
  );
  const [filters, setFilters] = useState({
    _sort: 'ASC',
    isPromotion: promotionFilter,
    isReleased: releasedFilter,
  });
  const handleFilterSortChange = (e) => {
    const { value } = e.target;
    const newFilters = { ...filters, _sort: value };
    setFilters(newFilters);
    if (onChange) {
      onChange(newFilters);
    }
  };
  const handleToggleReleasedFilter = () => {
    setReleasedFilter((prev) => !prev);
    const newFilters = { ...filters, isReleased: !releasedFilter };
    if (onChange) {
      onChange(newFilters);
    }
  };
  const handleTogglePromotionFilter = () => {
    setPromotionFilter((prev) => !prev);
    const newFilters = { ...filters, isPromotion: !promotionFilter };
    if (onChange) {
      onChange(newFilters);
    }
  };
  return (
    <div className="flex h-10 w-full items-center gap-5 rounded bg-white px-5 shadow-table">
      <div className="border-gray overflow-hidden rounded border border-solid">
        <select
          onChange={handleFilterSortChange}
          name="sort"
          className="px-2 text-sm outline-none"
        >
          <option value="ASC">Giá tăng dần</option>
          <option value="DESC">Giá giảm dần</option>
        </select>
      </div>
      <p
        onClick={handleToggleReleasedFilter}
        className={`${releasedFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex cursor-pointer items-center justify-center rounded-full px-5 py-[2px] text-sm`}
      >
        Mới ra mắt
      </p>
      <p
        onClick={handleTogglePromotionFilter}
        className={`${promotionFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex cursor-pointer items-center justify-center rounded-full px-5 py-[2px] text-sm`}
      >
        Khuyến mãi
      </p>
    </div>
  );
}

export default FilterViewer;
