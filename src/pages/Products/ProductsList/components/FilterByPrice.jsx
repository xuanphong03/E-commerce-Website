import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [priceRange, setPriceRange] = useState(null);

  const handlePriceChange = (e) => {
    const { priceGte, priceLte } = e.target.dataset;
    const { value } = e.target;
    setPriceRange(value);
    if (onChange) {
      onChange({
        price_gte: priceGte,
        price_lte: priceLte,
      });
    }
  };

  return (
    <div className="group relative w-[200px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Lọc giá
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col gap-2 border border-solid border-gray-300 bg-white p-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        <div>
          <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
            <input
              hidden
              onChange={handlePriceChange}
              type="radio"
              data-price-gte={0}
              data-price-lte={500000}
              value="price-range-1"
              name="price-range"
            />
            Dưới 500.000đ
            {priceRange === 'price-range-1' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
            <input
              hidden
              onChange={handlePriceChange}
              type="radio"
              data-price-gte={500000}
              data-price-lte={1000000}
              value="price-range-2"
              name="price-range"
            />
            500.000đ - 1.000.000đ
            {priceRange === 'price-range-2' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
            <input
              hidden
              onChange={handlePriceChange}
              type="radio"
              data-price-gte={1000000}
              data-price-lte={2000000}
              value="price-range-3"
              name="price-range"
            />
            1.000.000đ - 2.000.000đ
            {priceRange === 'price-range-3' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
            <input
              hidden
              onChange={handlePriceChange}
              type="radio"
              data-price-gte={2000000}
              data-price-lte={3000000}
              value="price-range-4"
              name="price-range"
            />
            2.000.000đ - 3.000.000đ
            {priceRange === 'price-range-4' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
            <input
              hidden
              onChange={handlePriceChange}
              type="radio"
              data-price-gte={3000000}
              data-price-lte={100000000}
              value="price-range-5"
              name="price-range"
            />
            Trên 3.000.000đ
            {priceRange === 'price-range-5' && <IoMdCheckmark />}
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterByPrice;
