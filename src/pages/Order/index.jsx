import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Outlet, Route, Routes } from 'react-router-dom';
import AllOrders from './components/AllOrders';
import NavLinksList from './components/NavLinksList';
import UnpaidOrder from './components/UnpaidOrders';

OrdersPage.propTypes = {};

function OrdersPage(props) {
  const NavLinks = [
    {
      path: '/my-orders/all',
      name: 'Tất cả',
    },
    {
      path: '/my-orders/unpaid',
      name: 'Chưa thanh toán',
    },
    {
      path: '/my-orders/paid',
      name: 'Đã thanh toán',
    },
    {
      path: '/my-orders/delivering',
      name: 'Đang vận chuyển',
    },
    {
      path: '/my-orders/receipted',
      name: 'Đã nhận hàng',
    },
    {
      path: '/my-orders/cancelled',
      name: 'Đã hủy',
    },
  ];

  const [searchValue, setSearchValue] = useState('');
  const handleSearchValueChange = (e) => {
    let newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };

  return (
    <main className="bg-[#F5F5F5] pb-10 pt-5">
      <div className="mx-auto max-w-[1300px]">
        <nav className="w-full overflow-hidden rounded bg-white">
          <NavLinksList data={NavLinks} />
        </nav>
        <div className="my-5 flex overflow-hidden rounded bg-white">
          <label
            htmlFor="search-orders"
            className="flex size-10 cursor-pointer items-center justify-center bg-[#4e4b66] text-xl text-white"
          >
            <IoSearchOutline />
          </label>
          <input
            value={searchValue}
            onChange={handleSearchValueChange}
            placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên sản phẩm"
            id="search-orders"
            className="flex-1 px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<AllOrders />} />
              <Route path="unpaid" element={<UnpaidOrder />} />
            </Route>
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default OrdersPage;
