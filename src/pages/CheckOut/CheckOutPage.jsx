import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import InputPayment from './customs/InputPayment';
import { FaCheck } from 'react-icons/fa6';
import TemplateImage01 from '~/assets/images/product01.png';
import TemplateImage04 from '~/assets/images/product04.png';
import { regex } from '~/constants/regex';
import { use } from 'i18next';
CheckOutPage.propTypes = {};

function CheckOutPage(props) {
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

  const [saveInfoStatus, setSaveInfoStatus] = useState(true);
  const [methodPayment, setMethodPayment] = useState('');
  const [infoBuyer, setInfoBuyer] = useState({});
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
  });

  const formSubmit = async (data) => {
    setInfoBuyer(data);
    if (!methodPayment) {
      alert('vui lòng chọn phương thức thanh toán');
      return;
    }
  };

  return (
    <main className="mx-auto max-w-[1300px] pb-20 pt-4">
      <h1 className="my-12 font-inter text-[36px] font-medium leading-[30px] tracking-[1.44px]">
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
            id="payment-phoneNumber"
            label="Số điện thoại"
            autofocus={true}
            required
            register={{ ...register('phoneNumber') }}
            errorMessage={errors.phoneNumber?.message}
          />

          <InputPayment
            id="payment-email"
            label="Email"
            autofocus={true}
            required
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
          />

          <InputPayment
            id="payment-address"
            label="Địa chỉ giao hàng"
            autofocus={true}
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
            <li>
              <article className="flex gap-6">
                <div className="size-12">
                  <img
                    className="max-h-full"
                    alt="product"
                    src={TemplateImage01}
                  />
                </div>
                <div className="flex flex-1 items-center justify-between font-poppins">
                  <h3>
                    LCD Monitor <span>x1</span>
                  </h3>
                  <p>$650</p>
                </div>
              </article>
            </li>
            <li>
              <article className="flex gap-6">
                <div className="size-12">
                  <img
                    className="max-h-full"
                    alt="product"
                    src={TemplateImage04}
                  />
                </div>
                <div className="flex flex-1 items-center justify-between font-poppins">
                  <h3>
                    H1 Gamepad <span>x1</span>
                  </h3>
                  <p>$650</p>
                </div>
              </article>
            </li>
          </ul>
          <div className="flex flex-col gap-4 font-poppins">
            <p className="flex justify-between">
              Tổng tiền sản phẩm <span>$1750</span>
            </p>
            <hr></hr>
            <p className="flex justify-between">
              Tiền vận chuyển <span>Free</span>
            </p>
            <hr></hr>
            <p className="flex justify-between">
              Tổng hóa đơn <span>$1750</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-between font-poppins">
            <div className="mb-2 max-w-[50%] basis-1/2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  onChange={handleChangeMethodPayment}
                  name="methods-payment"
                  value="mbbank"
                />
                MB Bank
                <img
                  className="h-5 rounded"
                  alt="logo"
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/7ace1c174097505.Y3JvcCwxMDEwLDc5MCwwLDA.jpg"
                />
              </label>
            </div>
            <div className="mb-2 max-w-[50%] basis-1/2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  onChange={handleChangeMethodPayment}
                  name="methods-payment"
                  value="paypal"
                />
                Paypal
                <img
                  className="h-5 rounded"
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAH7WEIC38EYtYpjJ504pJKHKt021pdRYiQ&s"
                />
              </label>
            </div>
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
                <input type="radio" name="methods-payment" value="cod" />
                Thanh toán bằng tiền mặt
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <input
              placeholder="Mã giảm giá..."
              className="h-10 w-3/5 rounded border border-solid border-[#2c2c2c] px-2 px-4 outline-none"
            />
            <button
              type="submit"
              className={`flex items-center justify-center gap-4 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-2 py-1 font-poppins font-medium text-[#FAFAFA] transition-all hover:bg-[#FAFAFA] hover:text-[#DB4444]`}
            >
              Dùng mã giảm giá
            </button>
          </div>
          <div>
            <button
              type="submit"
              className={`${isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#FAFAFA] hover:text-[#DB4444]'} flex h-10 w-full items-center justify-center gap-4 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-8 py-2 font-poppins font-medium text-[#FAFAFA] transition-all`}
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
    </main>
  );
}

export default CheckOutPage;
