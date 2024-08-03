import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

FilterCategory.propTypes = {};

function FilterCategory({ onChange, onSubmit }) {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Áo phông' },
    { id: 2, name: 'Áo polo' },
    { id: 3, name: 'Áo sweater' },
    { id: 4, name: 'Áo sơ mi' },
    { id: 5, name: 'Quần kaki' },
    { id: 6, name: 'Quần bò' },
    { id: 7, name: 'Quần short' },
  ]);
  // const [filterByBrand, setFilterCategory] = useState([]);

  // const handleChange = (e) => {
  //   var keyFilterBrand = e.target.value;
  //   let newFilterCategory;
  //   if (!filterByBrand.includes(keyFilterBrand)) {
  //     newFilterCategory = [...filterByBrand, keyFilterBrand];
  //     setFilterByBrand(newFilterByBrand);
  //   } else {
  //     newFilterByBrand = filterByBrand.filter(
  //       (brand) => brand !== keyFilterBrand,
  //     );
  //     setFilterByBrand(newFilterByBrand);
  //   }

  //   onChange(newFilterByBrand);
  // };

  const handleCategoryOnClick = (categoryId) => {
    const filters = {
      _page: 1,
      _limit: 16,
      _sort: 'ASC',
    };
    navigate(`/products/${categoryId}?${queryString.stringify(filters)}`);
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-base font-medium">Loại sản phẩm</h3>
      <ul>
        {categoriesList.map((category) => {
          return (
            <li
              onClick={() => handleCategoryOnClick(category.id)}
              key={category.id}
              className="mb-1 cursor-pointer text-sm hover:text-red-500"
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilterCategory;
