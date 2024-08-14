import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavLinksList from './components/NavLinksList';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import AllOrders from './components/AllOrders';
import UnpaidOrder from './components/UnpaidOrders';
import { IoSearchOutline } from 'react-icons/io5';
import { set } from 'react-hook-form';
import orderApi from '~/apis/orderApi';
import { useSelector } from 'react-redux';

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

  const { orderStatus } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([]);
  const { id } = useSelector((state) => state.user.current);
  const handleSearchValueChange = (e) => {
    let newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await orderApi.getAll();
        console.log('Order: ', response);
      } catch (error) {
        throw new Error('Có lỗi API Order');
      }
    })();
  }, []);

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
              <Route index element={<AllOrders data={orders} />} />
              <Route path="unpaid" element={<UnpaidOrder data={orders} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default OrdersPage;
