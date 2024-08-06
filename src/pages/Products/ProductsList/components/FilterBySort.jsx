import { useState } from 'react';
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io';

const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function FilterBySort({ onChange }) {
  const [sort, setSort] = useState(SORT.ASC);

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
    if (onChange) {
      onChange({ _sort: value });
    }
  };

  return (
    <div className="group relative w-[150px] cursor-pointer text-sm">
      <h4 className="flex items-center justify-between rounded border border-solid border-gray-300 px-4 py-2 font-medium">
        Sắp xếp
        <span className="text-2xl transition-all duration-300 group-hover:rotate-180">
          <IoMdArrowDropdown />
        </span>
      </h4>
      <div className="invisible absolute top-full z-10 flex w-full flex-col gap-2 border border-solid border-gray-300 bg-white p-2 text-sm opacity-0 group-hover:visible group-hover:opacity-100">
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              onChange={handleSortChange}
              type="radio"
              hidden
              value={SORT.ASC}
              name="sort"
            />
            Giá tăng dần
            {sort === SORT.ASC && <IoMdCheckmark className="text-sm" />}
          </label>
        </div>
        <div>
          <label className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#DB4444]">
            <input
              onChange={handleSortChange}
              type="radio"
              hidden
              value={SORT.DESC}
              name="sort"
            />
            Giá giảm dần
            {sort === SORT.DESC && <IoMdCheckmark className="text-sm" />}
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBySort;
