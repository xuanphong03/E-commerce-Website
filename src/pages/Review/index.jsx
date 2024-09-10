import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Routes } from 'react-router-dom';
import ReviewsList from './pages/ReviewsList';
import ReviewsProduct from './pages/ReviewsProduct';

ReviewPage.propTypes = {};

function ReviewPage() {
  return (
    <main className="mx-auto max-w-[1400px] py-10">
      <div className="flex gap-10">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-red-500 text-red-500' : ''} border-b-2 border-solid border-transparent pb-5 text-lg transition-all`
          }
          to="/my-reviews/reviews-list"
        >
          Danh sách đánh giá
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-red-500 text-red-500' : ''} border-b-2 border-solid border-transparent pb-5 text-lg transition-all`
          }
          to="/my-reviews/reviews-product"
        >
          Sản phẩm đã đánh giá
        </NavLink>
      </div>
      <hr></hr>
      <div className="py-5">
        <Routes>
          <Route path="/reviews-list" element={<ReviewsList />} />
          <Route path="/reviews-product" element={<ReviewsProduct />} />
        </Routes>
      </div>
    </main>
  );
}

export default ReviewPage;
