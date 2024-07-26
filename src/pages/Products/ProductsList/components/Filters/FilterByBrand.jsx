import React, { useState } from 'react';
import PropTypes from 'prop-types';

FilterByBrand.propTypes = {};

function FilterByBrand({ onChange, onSubmit }) {
  const [brandsList, setBrandsList] = useState([
    'Acer',
    'Macbook',
    'Dell',
    'Microsoft',
    'HP',
    'Razer',
    'Lenovo',
    'Asus',
  ]);
  const [filterByBrand, setFilterByBrand] = useState([]);

  const handleChange = (e) => {
    var keyFilterBrand = e.target.value;
    let newFilterByBrand;
    if (!filterByBrand.includes(keyFilterBrand)) {
      newFilterByBrand = [...filterByBrand, keyFilterBrand];
      setFilterByBrand(newFilterByBrand);
    } else {
      newFilterByBrand = filterByBrand.filter(
        (brand) => brand !== keyFilterBrand,
      );
      setFilterByBrand(newFilterByBrand);
    }

    onChange(newFilterByBrand);
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-lg font-medium">Theo thương hiệu</h3>
      <ul>
        {brandsList.map((brandItem) => (
          <li key={brandItem} className="mb-1">
            <label className="flex w-fit cursor-pointer items-center gap-2 hover:text-red-500">
              <input
                onChange={handleChange}
                type="checkbox"
                name="brands"
                value={brandItem}
              />
              {brandItem}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByBrand;
