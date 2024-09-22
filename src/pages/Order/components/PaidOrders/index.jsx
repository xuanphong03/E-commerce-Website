import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import orderApi from '~/apis/orderApi';
import { useSelector } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice';
import OrderedProduct from '~/components/OrderedProduct';
import { v4 as uuidv4 } from 'uuid';

PaidOrders.propTypes = {};

function PaidOrders(props) {
  const [paidOrderList, setPaidOrderList] = useState([]);
  const user = useSelector((state) => state.user.current);

  const getPaidOrderList = async () => {
    try {
      const userId = user.id;
      const paymentStatus = 1;
      const response = await orderApi.getOrderListByPaymentStatus(
        userId,
        paymentStatus,
      );
      setPaidOrderList(response);
    } catch (error) {
      throw new Error('Failed to get unpaid order list');
    }
  };

  useEffect(() => {
    getPaidOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="flex flex-col gap-10">
      {paidOrderList.length > 0 ? (
        paidOrderList.map(
          ({
            orderDetails,
            shippingStatus,
            paymentMethods,
            shippingFee,
            totalAmountOrder,
            skuOrder,
          }) => {
            const uniqueKey = uuidv4();
            return (
              <div key={uniqueKey} className="rounded bg-white p-5">
                <ul className="mb-5">
                  {orderDetails.map(
                    ({ name, totalPrice, quantity, color, size, image }) => {
                      const uniqueKey = uuidv4();
                      return (
                        <li key={uniqueKey}>
                          <OrderedProduct
                            productImage={image}
                            productName={name}
                            productSize={size}
                            productColor={color}
                            productPrice={totalPrice}
                            productQuantity={quantity}
                          />
                        </li>
                      );
                    },
                  )}
                </ul>
                <div className="text-sm">
                  <div className="border-gray flex border border-dotted">
                    <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                      Mã đơn hàng
                    </h4>
                    <p className="w-1/5 px-4 py-2 text-end">{skuOrder}</p>
                  </div>
                  <div className="border-gray flex border border-dotted">
                    <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                      Tiền vận chuyển
                    </h4>
                    <p className="w-1/5 px-4 py-2 text-end">
                      {shippingFee
                        ? formatPrice(shippingFee, 'VNĐ')
                        : 'Miễn phí'}
                    </p>
                  </div>
                  <div className="border-gray flex border border-dotted">
                    <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                      Tổng hóa đơn
                    </h4>
                    <p className="w-1/5 px-4 py-2 text-end">
                      {formatPrice(totalAmountOrder, 'VNĐ')}
                    </p>
                  </div>
                  <div className="border-gray flex border border-dotted">
                    <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                      Tình trạng đơn hàng
                    </h4>
                    <p className="w-1/5 px-4 py-2 text-end">{shippingStatus}</p>
                  </div>
                  <div className="border-gray flex border border-dotted">
                    <h4 className="border-gray w-4/5 border-r border-dotted px-4 py-2 text-end">
                      Phương thức thanh toán
                    </h4>
                    <p className="w-1/5 px-4 py-2 text-end">
                      {paymentMethods === 'COD'
                        ? paymentMethods
                        : `Thanh toán online ${paymentMethods}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          },
        )
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded bg-white">
          Chưa có đơn hàng nào
        </div>
      )}
    </section>
  );
}

export default PaidOrders;
