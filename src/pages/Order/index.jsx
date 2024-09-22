import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Outlet, Route, Routes } from 'react-router-dom';
import AllOrders from './components/AllOrders';
import NavLinksList from './components/NavLinksList';
import UnpaidOrder from './components/UnpaidOrders';
import ErrorPage from '../Error';
import PaidOrders from './components/PaidOrders';

OrdersPage.propTypes = {};

function OrdersPage(props) {
  const NavLinks = [
    {
      path: '/my-orders/',
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

  return (
    <main className="bg-[#F5F5F5] pb-10 pt-5">
      <div className="mx-auto max-w-[1300px]">
        <nav className="w-full overflow-hidden rounded bg-white">
          <NavLinksList data={NavLinks} />
        </nav>

        <div className="mt-5">
          <Routes>
            <Route path="/" element={<AllOrders />} />
            <Route path="/paid" element={<PaidOrders />} />
            <Route path="/unpaid" element={<UnpaidOrder />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default OrdersPage;
