import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '~/apis/cartApi';
import { updateCart } from '../Cart/cartSlice';

function PaymentByCOD() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    (async () => {
      try {
        setLoading(true);

        const { cart_items } = await cartApi.getAll({
          user_id: id,
        });
        await cartApi.delete(id, {
          user_id: id,
          cart_item: cart_items,
        });
        dispatch(updateCart({ quantity: 0 }));
      } catch (error) {
        throw new Error('Có lỗi xảy ra ở Payment By COD');
      } finally {
        setTimeout(() => setLoading(false), 1500);
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
            <FaRegCircleCheck className="text-green-500" />
          </span>
          <div className="mt-10 flex flex-col items-center gap-5">
            <h2 className="text-center text-3xl font-semibold">
              Đơn hàng của bạn đã được tiếp nhận!
            </h2>
            <p className="max-w-[700px] text-center">
              Cảm ơn vì đã ủng hộ chúng tôi. Chúng tôi sẽ liên hệ lại cho bạn
              trong vòng 24h tới.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentByCOD;
