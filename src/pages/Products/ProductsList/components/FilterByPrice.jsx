import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import { formatPrice } from '~/utils/formatPrice';
FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange, priceGte, priceLte }) {
  const PRICE_RANGE = [
    { id: 1, value: 'option 1', gte: null, lte: 500000 },
    { id: 2, value: 'option 2', gte: 500000, lte: 1000000 },
    { id: 3, value: 'option 3', gte: 1000000, lte: 2000000 },
    { id: 4, value: 'option 4', gte: 2000000, lte: 3000000 },
    { id: 5, value: 'option 5', gte: 3000000, lte: null },
  ];

  const [activeRange, setActiveRange] = useState(() => {
    const currentRange = PRICE_RANGE.find(
      (range) =>
        range.gte === (priceGte ? Number(priceGte) : null) &&
        range.lte === (priceLte ? Number(priceLte) : null),
    );
    return currentRange ? currentRange.value : null;
  });

  const handlePriceChange = (e) => {
    const { priceGte, priceLte } = e.target.dataset;
    if (onChange) {
      onChange({
        price_gte: priceGte ? Number(priceGte) : null,
        price_lte: priceLte ? Number(priceLte) : null,
      });
    }
  };

  useEffect(() => {
    const currentRange = PRICE_RANGE.find(
      (range) =>
        range.gte === (priceGte ? Number(priceGte) : null) &&
        range.lte === (priceLte ? Number(priceLte) : null),
    );
    if (currentRange) {
      setActiveRange(currentRange.value);
    } else {
      setActiveRange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceGte, priceLte]);

  return (
    <div className="group relative w-[200px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Lọc giá
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col gap-2 border border-solid border-gray-300 bg-white p-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        {PRICE_RANGE.map((range) => {
          let labelContent = '';
          if (!range.gte) {
            labelContent = `Dưới ${formatPrice(range.lte)}`;
          } else if (!range.lte) {
            labelContent = `Trên ${formatPrice(range.gte)}`;
          } else {
            labelContent = `Từ ${formatPrice(range.gte)} - ${formatPrice(range.lte)}`;
          }
          return (
            <div key={uuidv4()}>
              <label className="flex cursor-pointer items-center gap-2 hover:text-[#DB4444]">
                <input
                  hidden
                  onChange={handlePriceChange}
                  type="radio"
                  data-price-gte={range.gte}
                  data-price-lte={range.lte}
                  value={range.value}
                  name="price-range"
                />
                {labelContent}
                {activeRange === range.value && (
                  <IoMdCheckmark className="text-sm" />
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterByPrice;
