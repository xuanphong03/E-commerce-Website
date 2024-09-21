import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';
import materialApi from '~/apis/materialApi';

FilterByMaterial.propTypes = {
  onChange: PropTypes.func,
};

function FilterByMaterial({ onChange }) {
  const [materialList, setMaterialList] = useState([]);

  const getAllMaterials = async () => {
    try {
      const response = await materialApi.getAll();
      console.log(response);
    } catch (error) {
      throw new Error('Failed to fetch material list');
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return (
    <div className="group relative w-[250px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Chất liệu
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col flex-wrap gap-2 border border-solid border-gray-300 bg-white px-4 py-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input hidden value="S" type="radio" name="product-size" />S
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input hidden value="M" type="radio" name="product-size" />M
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterByMaterial;
