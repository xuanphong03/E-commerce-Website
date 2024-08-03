import { CiFilter } from 'react-icons/ci';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterByBrand from '../Filters/FilterByBrand';
import FilterByRating from '../Filters/FilterByRating';
import FilterByRangePrice from '../Filters/FilterByRangePrice';
import FilterByCategory from '../Filters/FilterByCategory';

FiltersAside.propTypes = {};

function FiltersAside({ onFilter }) {
  const [filters, setFilters] = useState({
    brands: [],
    ratingGte: 1,
    priceGte: 0,
    priceLte: 10000000,
  });
  const handleFilterByBrandsChange = (data) => {
    const newFilters = { ...filters, brands: data };
    setFilters(newFilters);
  };
  const handleFilterByRatingChange = (data) => {
    const newFilters = { ...filters, ratingGte: data };
    setFilters(newFilters);
  };
  const handleFilterRangePriceChange = (data) => {
    const newFilters = {
      ...filters,
      priceGte: data.priceGte,
      priceLte: data.priceLte,
    };
    setFilters(newFilters);
  };
  const handleFilterProduct = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };
  const handleFilterCategoryChange = (category) => {};
  return (
    <div className="px-4 py-2">
      <h2 className="flex items-center gap-2 pb-5 pt-2 text-base font-medium uppercase">
        <CiFilter />
        Bộ lọc tìm kiếm
      </h2>
      <div>
        <FilterByCategory onChange={handleFilterCategoryChange} />
        {/* <FilterByBrand onChange={handleFilterByBrandsChange} /> */}
        <FilterByRating onChange={handleFilterByRatingChange} />
        <FilterByRangePrice onChange={handleFilterRangePriceChange} />
      </div>

      <button
        onClick={handleFilterProduct}
        className="mt-5 w-full cursor-pointer rounded border-2 border-solid border-red-500 bg-red-500 px-5 py-2 text-base text-[#FAFAFA] transition-all hover:bg-[#FAFAFA] hover:text-red-500"
      >
        Lọc sản phẩm
      </button>
    </div>
  );
}

export default FiltersAside;
