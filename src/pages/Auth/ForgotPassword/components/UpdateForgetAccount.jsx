import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputField from './form-controls/InputField';
import { Fragment } from 'react';
import Spinner from '~/components/Animations/Spinner';
import userApi from '~/apis/userApi';

UpdateForgetAccount.propTypes = {
  onSubmit: PropTypes.func,
  userEmail: PropTypes.string,
};

function UpdateForgetAccount({ onSubmit, userEmail }) {
  const schema = yup.object().shape({
    OTPCode: yup.string().required('Vui lòng nhập mã OTP.'),
    new_password: yup
      .string()
      .required('Vui lòng nhập mật khẩu mới.')
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
    renew_password: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu mới.')
      .oneOf([yup.ref('new_password')], 'Mật khẩu không khớp'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleResendOTPCode = async (e) => {
    if (!userEmail) return;
    e.preventDefault();
    try {
      const response = await userApi.checkAccount({ email: userEmail });
      if (response.status !== 200) {
        throw new Error('Failed to resend OTP');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Fragment>
      <div
        className={`fixed inset-0 !z-[9999] flex items-center justify-center bg-black transition-all duration-300 ${!isSubmitting ? 'invisible bg-opacity-0' : 'visible bg-opacity-30'}`}
      >
        <Spinner />
      </div>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div>
          <InputField
            id="otp-code"
            label="Mã OTP"
            placeholder="Nhập mã OTP"
            register={{ ...register('OTPCode') }}
            errorMessage={errors.OTPCode?.message}
            autofocus={true}
            type="text"
          />
        </div>
        <div>
          <InputField
            id="new_password"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            register={{ ...register('new_password') }}
            errorMessage={errors.new_password?.message}
            type="password"
          />
        </div>
        <div>
          <InputField
            id="renew_password"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            register={{ ...register('renew_password') }}
            errorMessage={errors.renew_password?.message}
            type="password"
          />
        </div>
        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={handleResendOTPCode}
            className="rounded-md bg-green-500 px-6 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Gửi lại mã OTP
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-6 py-2 text-sm text-white hover:bg-opacity-80"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default UpdateForgetAccount;
