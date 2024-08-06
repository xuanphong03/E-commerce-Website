import PropTypes from 'prop-types';
import { IoMdArrowDropdown } from 'react-icons/io';

FilterByColor.propTypes = {
  onChange: PropTypes.func,
};

function FilterByColor({ onChange }) {
  const handleColorChange = (e) => {
    const { value } = e.target;
    if (onChange) {
      onChange({ color: value });
    }
  };

  return (
    <div className="group relative w-[250px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Màu sắc
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-wrap gap-2 border border-solid border-gray-300 bg-white px-4 py-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-red-500">
            <input
              onChange={handleColorChange}
              value="Đỏ"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-blue-500">
            <input
              value="Xanh nước biển"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-green-500">
            <input
              value="Xanh lá cây"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-pink-500">
            <input
              onChange={handleColorChange}
              value="Hồng"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-gray-500">
            <input
              onChange={handleColorChange}
              value="Xám"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-black">
            <input
              onChange={handleColorChange}
              value="Đen"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-white">
            <input
              onChange={handleColorChange}
              value="Trắng"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-yellow-500">
            <input
              onChange={handleColorChange}
              value="Vàng"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
        <div>
          <label className="flex size-6 cursor-pointer items-center gap-2 rounded-full border border-solid border-gray-300 bg-violet-500">
            <input
              onChange={handleColorChange}
              value="Tím"
              type="radio"
              hidden
              name="product-color"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterByColor;
