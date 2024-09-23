import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import paymentApi from '~/apis/paymentApi';
import cartApi from '~/apis/cartApi';
import queryString from 'query-string';
import { FaRegTimesCircle, FaSpinner } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '~/apis/orderApi';
import { updateCart } from '../Cart/cartSlice';
import { defaultConstants } from '~/constants/default';

const RESULT = {
  success: 'SUCCESS',
  failure: 'FAILURE',
};

function PaymentByVNPay() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const { id } = useSelector((state) => state.user.current);
  const { email, phoneNumber, address } = useSelector(
    (state) => state.user.paymentInfo,
  );
  const [paymentResult, setPaymentResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (isOrderCreated) return;
      try {
        setLoading(true);
        const queryParams = queryString.parse(location.search);
        // Gửi dữ liệu về API của bạn để xác nhận kết quả thanh toán
        const response = await paymentApi.verify(queryParams);

        if (response.message === 'Success') {
          const { cart_items, totalPayment } = await cartApi.getAll({
            user_id: id,
          });
          if (cart_items.length > 0) {
            (async () => {
              const shippingFee =
                totalPayment > defaultConstants.minTotalPayment
                  ? 0
                  : defaultConstants.shippingFee;
              await orderApi.create({
                user_id: id,
                // name: name,
                orderDetails: cart_items,
                address: address,
                phoneNumber: phoneNumber,
                emailAddress: email,
                paymentMethods: 'VNP',
                shippingFee: shippingFee,
                paymentStatus: 1,
                percentDiscount: 0,
                orderStatus: 2,
              });
              await cartApi.delete(id, {
                user_id: id,
                cart_item: cart_items,
              });
              dispatch(updateCart({ quantity: 0 }));
              setIsOrderCreated(true);
            })();
          }
          setPaymentResult(RESULT.success);
        } else {
          setPaymentResult(RESULT.failure);
        }
      } catch (error) {
        setPaymentResult(RESULT.failure);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[calc(100vh-112px)]">
      {loading && (
        <div className="flex h-full items-center justify-center bg-slate-100">
          <h2 className="flex items-center gap-4 text-2xl">
            <FaSpinner className="animate-spin duration-500" /> Đang chờ xử
            lý...
          </h2>
        </div>
      )}
      {!loading && (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-9xl">
            {paymentResult === RESULT.success ? (
              <FaRegCircleCheck className="text-green-500" />
            ) : (
              <FaRegTimesCircle className="text-red-500" />
            )}
          </span>
          <div className="mt-10 flex flex-col items-center gap-5">
            <h2 className="text-center text-3xl font-semibold">
              {paymentResult === RESULT.success
                ? `Đơn hàng của bạn đã được thanh toán thành công!`
                : `Thanh toán thất bại!`}
            </h2>
            <p className="max-w-[700px] text-center">
              {paymentResult === RESULT.success
                ? `Cảm ơn vì đã ủng hộ chúng tôi. Mong rằng sản phẩm của chúng tôi sẽ
              mang lại cho bạn một trải nghiệm tuyệt vời. Nếu có bất cứ thắc mắc
              nào về đơn hàng hãy liên hệ ngay cho chúng tôi.`
                : `Đã xảy ra sự cố khi xử lý thanh toán của bạn. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ thêm.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentByVNPay;
