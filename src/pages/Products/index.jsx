import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useParams } from 'react-router-dom';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';

Product.propTypes = {};

function Product() {
  return (
    <div>
      <Routes>
        <Route path="/:type" element={<ProductsList />} />
        <Route path="/:type/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default Product;
