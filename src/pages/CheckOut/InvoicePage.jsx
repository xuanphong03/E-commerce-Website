import { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartApi from '~/apis/cartApi';
import orderApi from '~/apis/orderApi';
import paymentApi from '~/apis/paymentApi';
import { formatPrice } from '~/utils/formatPrice';
import { setPaymentInfo } from '../Auth/userSlice';
import InputPayment from './customs/InputPayment';
import { defaultConstants } from '~/constants/default';
import discountApi from '~/apis/discountApi';
import { toast } from 'react-toastify';
import { CheckoutContext } from '.';

function InvoicePage() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập tên của bạn.')
      .test(
        'Họ và tên phải có ít nhất 2 từ',
        'Họ và tên phải chứa ít nhất 2 từ.',
        (value) => {
          return value.trim().split(' ').length >= 2;
        },
      ),
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
    phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
    address: yup.string().required('Vui lòng nhập địa chỉ giao hàng'),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.current);
  const user = useSelector((state) => state.user.current);
  const paymentInfo = useSelector((state) => state.user.paymentInfo);

  const [saveInfoStatus, setSaveInfoStatus] = useState(true);
  const [paymentMethod, setMethodPayment] = useState('');
  const [cartData, setCartData] = useState({
    cartItemsList: [],
    totalProductPrice: 0,
    totalPayment: 0,
    deliveryFee: 0,
    discountFee: 0,
  });

  const { discountCode, setDiscountCode } = useContext(CheckoutContext);

  const handleChangeMethodPayment = (e) => {
    let newMethodPayment = e.target.value;
    setMethodPayment(newMethodPayment);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: paymentInfo.name || user.name,
      email: paymentInfo.email || user.email,
      phoneNumber: paymentInfo.phoneNumber || user.phoneNumber,
      address: paymentInfo.address || user.address,
    },
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await cartApi.getAll({ user_id: id });
        const { cart_items, totalPayment } = response;
        const deliveryFee =
          totalPayment > defaultConstants.minTotalPayment
            ? 0
            : defaultConstants.shippingFee;

        setCartData({
          discountFee: 0,
          cartItemsList: cart_items,
          totalPayment: totalPayment + deliveryFee,
          totalProductPrice: totalPayment,
          deliveryFee: deliveryFee,
        });
      })();
    } catch (error) {
      throw new Error('Error in get cart api');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formSubmit = async (data) => {
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
    const { name, email, phoneNumber, address } = data;
    if (saveInfoStatus) {
      dispatch(setPaymentInfo({ name, email, phoneNumber, address }));
    }

    if (paymentMethod === 'vnpay') {
      try {
        const paymentInfo = {
          amount: cartData.totalPayment,
          bankCode: 'NCB',
        };
        const {
          data: { code, paymentUrl },
        } = await paymentApi.get(paymentInfo);
        if (code === 'ok' && paymentUrl) {
          window.location.href = paymentUrl;
        }
      } catch (error) {
        throw new Error('Lỗi khi xử lý thanh toán với VNPay');
      }
    } else {
      try {
        const data = {
          user_id: id,
          orderDetails: cartData.cartItemsList,
          address: address,
          phoneNumber: phoneNumber,
          emailAddress: email,
          paymentMethods: 'COD',
          shippingFee: cartData.deliveryFee,
          paymentStatus: 0,
          percentDiscount: 0,
          orderStatus: null,
        };
        if (cartData.discountFee) {
          data.skuDiscount = discountCode;
          data.percentDiscount = 10;
        }
        await orderApi.create(data);

        navigate('/payment/cod');
      } catch (error) {
        throw new Error('Có lỗi ở thanh toán COD');
      }
    }
  };

  const handleChangeDiscountCouponCode = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleGetDiscountCoupon = async () => {
    if (!discountCode) {
      return toast.warning('Vui lòng nhập mã giảm giá!');
    }
    try {
      const response = await discountApi.confirm(discountCode);
      if (response.status === 400) {
        throw new Error('Mã giảm giá không hợp lệ');
      }
      const { percentDiscount } = response;
      const discountFee =
        (percentDiscount * cartData.totalProductPrice) / 100 || 0;
      setCartData({
        ...cartData,
        totalPayment: cartData.totalPayment - discountFee,
        discountFee,
      });
      toast.success('Áp dụng mã giảm giá thành công');
    } catch (error) {
      toast.error(error.message);
      throw new Error('Discount code is invalid');
    } finally {
      setDiscountCode('');
    }
  };
  return (
    <main className="mx-auto max-w-[1300px] pb-20 pt-4">
      <h1 className="my-12 text-[36px] font-medium leading-[30px] tracking-[1.44px]">
        Chi tiết thanh toán
      </h1>
      <form
        className="flex justify-between"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="mb-4 flex w-[500px] flex-col gap-5">
          <InputPayment
            id="payment-name"
            label="Họ và tên"
            autofocus={true}
            required
            register={{ ...register('name') }}
            errorMessage={errors.name?.message}
          />

          <InputPayment
            id="payment-email"
            label="Email"
            required
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
          />

          <InputPayment
            id="payment-phoneNumber"
            label="Số điện thoại"
            required
            register={{ ...register('phoneNumber') }}
            errorMessage={errors.phoneNumber?.message}
          />

          <InputPayment
            id="payment-address"
            label="Địa chỉ giao hàng"
            required
            register={{ ...register('address') }}
            errorMessage={errors.address?.message}
          />
          <div>
            <label
              className="flex cursor-pointer items-center gap-2"
              htmlFor="save-info"
              onClick={() => setSaveInfoStatus((prevStatus) => !prevStatus)}
            >
              <span
                className={`flex size-5 items-center justify-center rounded border-2 border-solid transition-colors ${saveInfoStatus ? 'border-[#DB4444] bg-[#DB4444]' : 'border-[#2c2c2c]'}`}
              >
                {saveInfoStatus && <FaCheck className="text-white" />}
              </span>
              Lưu thông tin này để thanh toán nhanh hơn vào lần sau
            </label>
            <input
              id="save-info"
              type="checkbox"
              name="save-info"
              value="save-info"
              hidden
            />
          </div>
        </div>
        <div className="flex w-[500px] flex-col gap-8">
          <ul className="flex flex-col gap-6">
            {cartData.cartItemsList.map(
              ({
                itemDetail_id,
                name,
                image,
                totalPrice,
                quantity,
                size,
                color,
              }) => {
                return (
                  <li key={itemDetail_id}>
                    <article className="flex gap-2">
                      <div className="size-12">
                        <img className="max-h-full" alt="product" src={image} />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <h3>
                            {name}
                            <span className="ml-2 text-sm">
                              | Màu: {color} | Size: {size}
                            </span>
                          </h3>
                          <p className="text-sm">Số lượng: {quantity}</p>
                        </div>
                        <p>{formatPrice(totalPrice, 'VNĐ')}</p>
                      </div>
                    </article>
                  </li>
                );
              },
            )}
          </ul>
          <div className="flex flex-col gap-4">
            <p className="flex justify-between">
              Tổng tiền sản phẩm{' '}
              <span>{formatPrice(cartData.totalProductPrice, 'VNĐ')}</span>
            </p>
            <hr></hr>
            <p className="flex justify-between">
              Giảm giá
              <span>{formatPrice(cartData.discountFee, 'VNĐ')}</span>
            </p>
            <hr></hr>
            <p className="flex justify-between">
              Tiền vận chuyển{' '}
              <span>
                {cartData.deliveryFee !== 0
                  ? formatPrice(cartData.deliveryFee, 'VNĐ')
                  : 'Miễn phí'}
              </span>
            </p>
            <hr></hr>
            <p className="flex justify-between">
              Tổng hóa đơn{' '}
              <span>{formatPrice(cartData.totalPayment, 'VNĐ')}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="mb-2 max-w-[50%] basis-1/2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  onChange={handleChangeMethodPayment}
                  name="methods-payment"
                  value="vnpay"
                />
                VNPay
                <img
                  alt="logo"
                  className="h-5 rounded"
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                />
              </label>
            </div>
            <div className="mb-2 max-w-[50%] basis-1/2">
              <label className="flex items-center gap-2">
                <input
                  onChange={handleChangeMethodPayment}
                  type="radio"
                  name="methods-payment"
                  value="cod"
                />
                Thanh toán bằng tiền mặt
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`${isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#FAFAFA] hover:text-[#DB4444]'} flex h-10 w-full items-center justify-center gap-4 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-8 py-5 font-medium text-[#FAFAFA] transition-all`}
            >
              {isSubmitting ? (
                <>
                  Thanh toán...
                  <span className="animate-spin text-lg font-bold">
                    <FaSpinner />
                  </span>
                </>
              ) : (
                <>Thanh toán</>
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-5 flex gap-4">
        <div className="h-10 w-[300px] rounded border border-solid border-gray-300 px-6 py-2">
          <input
            value={discountCode}
            onChange={handleChangeDiscountCouponCode}
            placeholder="Mã giảm giá"
            className="w-full text-base text-black outline-none"
          />
        </div>
        <button
          onClick={handleGetDiscountCoupon}
          className={`flex h-10 items-center justify-center rounded border-2 border-solid bg-[#DB4444] px-12 py-3 font-medium ${paymentInfo.total <= 0 ? 'cursor-not-allowed border-[#EEEEEE] bg-[#EEEEEE] text-gray-300' : 'cursor-pointer border-[#DB4444] text-[#fafafa] transition-colors hover:bg-[#fafafa] hover:text-[#DB4444]'}`}
        >
          Áp dụng
        </button>
      </div>
    </main>
  );
}

export default InvoicePage;
