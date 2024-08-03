import React, { useState } from 'react';
import PropTypes from 'prop-types';

FilterByRangePrice.propTypes = {};

function FilterByRangePrice({ onChange }) {
  const [rangePrice, setRangePrice] = useState({
    priceGte: 0,
    priceLte: 10000000,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const price = Number(e.target.value);
    if (price < 0 || price % 1 !== 0) return;
    const newRangePrice = { ...rangePrice, [name]: price };
    setRangePrice(newRangePrice);
    if (onChange) {
      onChange(newRangePrice);
    }
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-base font-medium">Khoảng giá</h3>
      <div className="text-sm">
        <div className="flex flex-col gap-1">
          <label>Giá thấp nhất</label>
          <div className="relative">
            <input
              onChange={handleChange}
              value={rangePrice['priceGte']}
              name="priceGte"
              type="text"
              className="w-full rounded border border-solid border-black px-2 py-1 outline-blue-500"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              VNĐ
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Giá cao nhất</label>
          <div className="relative">
            <input
              onChange={handleChange}
              value={rangePrice['priceLte']}
              name="priceLte"
              type="text"
              className="w-full rounded border border-solid border-black px-2 py-1 outline-blue-500"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              VNĐ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterByRangePrice;
