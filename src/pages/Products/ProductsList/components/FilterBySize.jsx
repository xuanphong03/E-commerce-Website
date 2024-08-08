import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';

FilterBySize.propTypes = {
  onChange: PropTypes.func,
};

function FilterBySize({ onChange }) {
  const [size, setSize] = useState(null);

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setSize(value);
    if (onChange) {
      onChange({ size: value });
    }
  };

  return (
    <div className="group relative w-[250px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Kích thước
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col flex-wrap gap-2 border border-solid border-gray-300 bg-white px-4 py-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              hidden
              onChange={handleSizeChange}
              value="S"
              type="radio"
              name="product-size"
            />
            S{size === 'S' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              hidden
              onChange={handleSizeChange}
              value="M"
              type="radio"
              name="product-size"
            />
            M{size === 'M' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              hidden
              onChange={handleSizeChange}
              value="L"
              type="radio"
              name="product-size"
            />
            L{size === 'L' && <IoMdCheckmark />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              hidden
              onChange={handleSizeChange}
              value="XL"
              type="radio"
              name="product-size"
            />
            XL
            {size === 'XL' && <IoMdCheckmark />}
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBySize;
