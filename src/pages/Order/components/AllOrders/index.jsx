import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TemplateImage from '~/assets/images/product01.png';
import { Link } from 'react-router-dom';
import OrderedProduct from '~/components/OrderedProduct';
import { formatPrice } from '~/utils/formatPrice';
AllOrders.propTypes = {};

function AllOrders({ data }) {
  const [ordersList, setOrdersList] = useState(() => data || []);

  return (
    <section className="flex flex-col gap-10">
      {ordersList.length > 0 ? (
        ordersList.map((orderItem, _id) => {
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
              <div className="text-sm">
                <div className="border-gray flex border border-dotted">
                  <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                    Mã đơn hàng
                  </h4>
                  <p className="w-1/5 px-4 py-2 text-end">
                    {orderItem.orderCode}
                  </p>
                </div>
                <div className="border-gray flex border border-dotted">
                  <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                    Tiền vận chuyển
                  </h4>
                  <p className="w-1/5 px-4 py-2 text-end">Free</p>
                </div>
                <div className="border-gray flex border border-dotted">
                  <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                    Tổng hóa đơn
                  </h4>
                  <p className="w-1/5 px-4 py-2 text-end">
                    {formatPrice(150000, 'VNĐ')}
                  </p>
                </div>
                <div className="border-gray flex border border-dotted">
                  <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                    Tình trạng đơn hàng
                  </h4>
                  <p className="w-1/5 px-4 py-2 text-end">{orderItem.status}</p>
                </div>
                <div className="border-gray flex border border-dotted">
                  <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                    Phương thức thanh toán
                  </h4>
                  <p className="w-1/5 px-4 py-2 text-end">
                    {orderItem.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded bg-white">
          Chưa có đơn hàng nào
        </div>
      )}
    </section>
  );
}

export default AllOrders;
