import moment from 'moment';
import queryString from 'query-string';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import paymentApi from '~/apis/paymentApi';
import Spinner from '~/components/Animations/Spinner';
import { formatPrice } from '~/utils/formatPrice';
import { CheckoutContext } from '..';
import discountApi from '~/apis/discountApi';
import cartApi from '~/apis/cartApi';
import { defaultConstants } from '~/constants/default';

function PaymentByVietQR() {
  const QR_INFO = {
    accountNo: '4610691866',
    accountName: 'PHU MINH HUONG',
    acqId: '970418',
    addInfo: 'Donation for Education',
    template: 'compact',
  };
  const [qrDataURL, setQrDataURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const { discountCode } = useContext(CheckoutContext);
  const { id, name } = useSelector((state) => state.user.current);
  const [totalPayment, setTotalPayment] = useState(0);

  const generateVietQR = async () => {
    try {
      setLoading(true);
      const { totalPayment } = await cartApi.getAll({
        user_id: id,
      });
      let amount = totalPayment;
      amount =
        amount >= defaultConstants.minTotalPayment
          ? amount
          : amount + defaultConstants.shippingFee;
      if (discountCode) {
        const validDiscount = checkValidDiscount(discountCode);
        amount = validDiscount ? amount * 0.9 : amount;
      }
      const {
        data: { qrDataURL },
      } = await paymentApi.generateVietQR({
        ...QR_INFO,
        amount,
        addInfo: `${name} thanh toan`,
      });
      setQrDataURL(qrDataURL);
      setTotalPayment(amount);
    } catch (error) {
      throw new Error('Failed to generate VietQR');
    } finally {
      setLoading(false);
    }
  };

  const checkValidDiscount = async (discountCode) => {
    try {
      const response = await discountApi.confirm(discountCode);
      return response.status !== 400;
    } catch (error) {
      throw new Error('Failed to check valid discount ');
    }
  };

  useEffect(() => {
    generateVietQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <Fragment>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-20 py-10">
          <Spinner />
        </div>
        <div className="min-h-[calc(100vh-130px)]"></div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-20 py-10">
        <div className="flex items-center gap-2 rounded-md bg-white px-10 py-8">
          <div className="flex w-fit flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-700">
              Mã QR chuyển khoản
            </h1>
            <img alt="QR Code" src={qrDataURL} className="w-100" />
          </div>
          <div className="max-w-100 space-y-3 px-4">
            <div className="rounded bg-orange-200 px-5 py-4 text-center font-bold text-[#7A6306]">
              Vui lòng chuyển khoản đúng nội dung để chúng tôi xác nhận thanh
              toán
            </div>
            <div className="flex gap-2">
              <h4 className="font-bold">Tên tài khoản:</h4>{' '}
              <p>{QR_INFO.accountName}</p>
            </div>
            <hr></hr>
            <div className="flex gap-2">
              <h4 className="font-bold">Số tài khoản:</h4>{' '}
              <p>{QR_INFO.accountNo}</p>
            </div>
            <hr></hr>
            <div className="flex gap-2">
              <h4 className="font-bold">Số tiền:</h4>{' '}
              <p>{formatPrice(totalPayment, 'VNĐ')}</p>
            </div>
            <hr></hr>
            <div className="flex gap-2">
              <h4 className="shrink-0 font-bold">Nội dung:</h4>{' '}
              <p>
                {`${name} chuyen khoan ${moment(Date.now()).format('DD-MM-YYYY  ')}`.toUpperCase()}
              </p>
            </div>
            <button className="mx-auto block w-full rounded bg-blue-500 px-5 py-2 text-white hover:opacity-80">
              Tôi đã thanh toán
            </button>
            <p className="text-sm text-gray-500">
              *Sau khi đã thanh toán vui lòng bấm vào nút <br></br>
              <b>Tôi đã thanh toán</b> để hệ thống xác nhận đơn hàng của bạn
            </p>
            <Link
              to="/"
              className="ml-auto block w-fit rounded bg-red-500 px-5 py-2 text-white hover:bg-opacity-80"
            >
              Hủy thanh toán
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-[calc(100vh-130px)]"></div>
    </Fragment>
  );
}

export default PaymentByVietQR;
