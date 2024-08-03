import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavLinksList from './components/NavLinksList';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import AllOrders from './components/AllOrders';
import UnpaidOrder from './components/UnpaidOrders';
import { IoSearchOutline } from 'react-icons/io5';
import { set } from 'react-hook-form';

OrdersPage.propTypes = {};

function OrdersPage(props) {
  const NavLinks = [
    {
      path: '/my-orders/all',
      name: 'Tất cả',
    },
    {
      path: '/my-orders/unpaid',
      name: 'Chờ thanh toán',
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
    {
      path: '/my-orders/return',
      name: 'Trả hàng/ Hoàn tiền',
    },
  ];

  const { orderStatus } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([
    {
      orderCode: '240725FM46SMR7',
      totalCost: '50000',
      status: 'Đơn đã hủy',
      requestBy: 'Người mua',
      paymentMethod: 'COD',
      data: [
        {
          productName:
            'Tất thể thao Nike, vớ Adidas cổ ngắn, trung, dài cho nam, nữ thể thao. Tất cổ cao dệt kim 3 kích cỡ 5cm, 12cm, 16cm',
          productType: 'Nike trắng 16cm',
          productQuantity: '1',
          productPrice: 50000,
        },
        {
          productName:
            'Camera WIFI XOAY 360 IMOU Ranger 2 A52P 5MP 3K - A42P 4MP - A32EP 3MP - A22EP 2MP Trong Nhà Còi Hú Báo Động, chính hãng',
          productType: 'A52P 5MP 3K Siêu nét',
          productQuantity: '1',
          productPrice: 100000,
        },
      ],
    },
    {
      orderCode: '240725FM46SMR7',
      totalCost: '50000',
      status: 'Đơn đã thanh toán',
      requestBy: 'Người mua',
      paymentMethod: 'Payment',
      data: [
        {
          productName:
            'Tất thể thao Nike, vớ Adidas cổ ngắn, trung, dài cho nam, nữ thể thao. Tất cổ cao dệt kim 3 kích cỡ 5cm, 12cm, 16cm',
          productType: 'Nike trắng 16cm',
          productQuantity: '1',
          productPrice: 50000,
        },
      ],
    },
  ]);

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
