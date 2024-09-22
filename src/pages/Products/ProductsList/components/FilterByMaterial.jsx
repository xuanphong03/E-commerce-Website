import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';
import materialApi from '~/apis/materialApi';
import { v4 as uuidv4 } from 'uuid';

FilterByMaterial.propTypes = {
  onChange: PropTypes.func,
};

function FilterByMaterial({ onChange, currentMaterial }) {
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(currentMaterial);
  const getAllMaterials = async () => {
    try {
      const response = await materialApi.getAll();
      setMaterialList(response);
    } catch (error) {
      throw new Error('Failed to fetch material list');
    }
  };

  const handleChangeMaterial = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    if (onChange) {
      onChange({ material });
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return (
    <div className="group relative w-[200px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Chất liệu
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col flex-wrap gap-2 border border-solid border-gray-300 bg-white px-4 py-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        {materialList.map(({ name }) => {
          const uniqueKey = uuidv4();
          return (
            <div key={uniqueKey}>
              <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
                <input
                  onChange={handleChangeMaterial}
                  hidden
                  value={name}
                  type="radio"
                  name="material"
                />{' '}
                {name} {selectedMaterial === name && <IoMdCheckmark />}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterByMaterial;
