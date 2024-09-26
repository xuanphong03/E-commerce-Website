import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import ReviewsList from './pages/ReviewsList';
import ReviewsProduct from './pages/ReviewsProduct';

function ReviewPage() {
  return (
    <main className="mx-auto max-w-[1400px] py-10">
      <div className="flex gap-10">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-red-500 text-red-500' : ''} border-b-2 border-solid border-transparent pb-5 text-lg transition-all`
          }
          to="/my-reviews"
          end
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
          <Route index element={<ReviewsList />} />
          <Route path="/reviews-product" element={<ReviewsProduct />} />
        </Routes>
        <Outlet />
      </div>
    </main>
  );
}

export default ReviewPage;
