import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';
import styleApi from '~/apis/styleApi';

function FilterByStyle({ onChange, currentStyle }) {
  const [styleList, setStyleList] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(currentStyle);

  const getAllStyles = async () => {
    try {
      const response = await styleApi.getAll();
      setStyleList(response);
    } catch (error) {
      throw new Error('Failed to get all styles');
    }
  };

  const handleSelectStyle = (e) => {
    const style = e.target.value;
    setCurrentSelection(style);
    if (onChange) {
      onChange({ style });
    }
  };

  useEffect(() => {
    getAllStyles();
  }, []);

  return (
    <div className="group relative w-[200px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Phong cách
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col gap-2 border border-solid border-gray-300 bg-white p-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        {styleList.map(({ name }) => {
          const uniqueKey = uuidv4();
          return (
            <div key={uniqueKey}>
              <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
                <input
                  onChange={handleSelectStyle}
                  type="radio"
                  hidden
                  name="style"
                  value={name}
                />
                {name} {currentSelection === name && <IoMdCheckmark />}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterByStyle;
