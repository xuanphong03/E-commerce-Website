import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TemplateImage from '~/assets/images/product01.png';
import { Link } from 'react-router-dom';
import OrderedProduct from '~/components/OrderedProduct';
AllOrders.propTypes = {};

function AllOrders({ data }) {
  return (
    <section className="flex flex-col gap-10">
      {data.map((orderItem, _id) => {
        return (
          <div key={_id} className="rounded bg-white p-5">
            <ul className="mb-5">
              {orderItem.data.map((product, _id) => {
                return (
                  <li key={_id}>
                    <OrderedProduct
                      productImage={TemplateImage}
                      productName={product.productName}
                      productType={product.productType}
                      productPrice={product.productPrice}
                      productQuantity={product.productQuantity}
                    />
                  </li>
                );
              })}
            </ul>
            <p className="mb-5 text-end">
              Thành tiền:{' '}
              <span className="text-2xl font-medium">50.000 VNĐ</span>
            </p>
            <div>
              <div className="border-gray flex border border-dotted">
                <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                  Tình trạng đơn hàng
                </h4>
                <p className="w-1/5 px-4 py-2 text-end">{orderItem.status}</p>
              </div>
              <div className="border-gray flex border border-dotted">
                <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                  Yêu cầu bởi
                </h4>
                <p className="w-1/5 px-4 py-2 text-end">
                  {orderItem.requestBy}
                </p>
              </div>
              <div className="border-gray flex border border-dotted">
                <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                  Phương thức thanh toán
                </h4>
                <p className="w-1/5 px-4 py-2 text-end">
                  {orderItem.paymentMethod}
                </p>
              </div>
              <div className="border-gray flex border border-dotted">
                <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                  Mã đơn hàng
                </h4>
                <p className="w-1/5 px-4 py-2 text-end">
                  {orderItem.orderCode}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default AllOrders;
