import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import orderApi from '~/apis/orderApi';
import OrderedProduct from '~/components/OrderedProduct';
import PopUp from '~/components/PopUp';
import { formatPrice } from '~/utils/formatPrice';

function UnpaidOrder() {
  const [unpaidOrderList, setUnpaidOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.current);
  const [showPopUp, setShowPopUp] = useState(false);
  const [cancelledOrderId, setCancelledOrderId] = useState(null);

  const getUnpaidOrderList = async () => {
    try {
      const userId = user.id;
      const paymentStatus = 0;
      const response = await orderApi.getOrderListByPaymentStatus(
        userId,
        paymentStatus,
      );
      setUnpaidOrderList(
        response.filter(({ orderStatus }) => orderStatus !== 'Đã Hủy'),
      );
    } catch (error) {
      throw new Error('Failed to get unpaid order list');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    getUnpaidOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelOrder = async () => {
    if (!cancelledOrderId) {
      return;
    }
    try {
      const response = await orderApi.cancelOrder(cancelledOrderId);
      if (response.status === 200) {
        toast.success('Hủy đơn hàng thành công');
        getUnpaidOrderList();
      } else if (response.status === 400) {
        throw new Error('Hủy đơn hàng thất bại');
      }
    } catch (error) {
      toast.error(error.message);
      throw new Error('Failed to cancel order');
    } finally {
      setShowPopUp(false);
      setCancelledOrderId(null);
    }
  };

  const togglePopUp = () => {
    if (showPopUp) {
      setCancelledOrderId(null);
    }
    setShowPopUp(!showPopUp);
  };

  if (isLoading) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded bg-white">
        Đang lấy dữ liệu...
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-10">
      {showPopUp && (
        <PopUp
          message="Bạn chắc chắn muốn hủy đơn hàng này chứ?"
          type="warning"
          onCancel={togglePopUp}
          onConfirm={handleCancelOrder}
        />
      )}
      {unpaidOrderList.length > 0 ? (
        unpaidOrderList.map(
          ({
            id,
            orderDetails,
            orderStatus,
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
                    <p className="w-1/5 px-4 py-2 text-end">
                      {orderStatus ?? 'Đang xử lý'}
                    </p>
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
                <div
                  onClick={() => {
                    if (!orderStatus) {
                      setCancelledOrderId(id);
                      togglePopUp();
                    }
                  }}
                  className="mt-5 flex justify-end"
                >
                  <button
                    className={`rounded px-5 py-2 text-sm text-white ${orderStatus ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-red-500 hover:opacity-80'}`}
                  >
                    Hủy đơn hàng
                  </button>
                </div>
              </div>
            );
          },
        )
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded bg-white">
          Không có đơn hàng nào
        </div>
      )}
    </section>
  );
}

export default UnpaidOrder;
