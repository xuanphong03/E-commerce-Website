import React, { useState } from 'react';
import PropTypes from 'prop-types';

FilterByRangePrice.propTypes = {};

function FilterByRangePrice({ onChange }) {
  const [rangePrice, setRangePrice] = useState({
    priceGte: 0,
    priceLte: 10000000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || value % 1 !== 0) return;
    const newRangePrice = { ...rangePrice, [name]: +value };
    setRangePrice(newRangePrice);
    if (onChange) {
      onChange(newRangePrice);
    }
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-lg font-medium">Khoảng giá</h3>
      <div>
        <div className="flex flex-col gap-1">
          <label>Giá thấp nhất</label>
          <input
            onChange={handleChange}
            value={rangePrice['priceGte']}
            name="priceGte"
            type="number"
            className="w-full rounded border border-solid border-black px-2 py-1 outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Giá cao nhất</label>
          <input
            onChange={handleChange}
            value={rangePrice['priceLte']}
            name="priceLte"
            type="number"
            className="w-full rounded border border-solid border-black px-2 py-1 outline-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterByRangePrice;
