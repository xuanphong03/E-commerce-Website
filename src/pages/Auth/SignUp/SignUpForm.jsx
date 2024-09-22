import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputField from '~/components/form-controls/InputField/InputField';
import GoogleIcon from '~/assets/images/icon-google.png';
import { FaSpinner } from 'react-icons/fa6';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';
import { regex } from '~/constants/regex';

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function SignUpForm({ onSubmit }) {
  const schema = yup.object().shape({
    otpCode: yup
      .string()
      .required('Vui lòng nhập mã OTP đã được gửi về email của bạn.'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu.')
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu.')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
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
      await onSubmit(data);
    }
  };

  const handleResendOTP = async () => {
    // Gửi lại mã OTP
  };

  return (
    <div>
      <h2 className="mb-5 text-3xl font-medium leading-[30px] tracking-[1.44px]">
        Tạo tài khoản
      </h2>
      <p className="mb-10 text-base text-gray-600">
        Bước 2: Nhập mã OTP được gửi về email và mật khẩu
      </p>
      <form
        className="mb-4 flex w-[400px] flex-col gap-10"
        onSubmit={handleSubmit(formSubmit)}
      >
        <InputField
          id="signup-otp-code"
          label="Mã số OTP"
          autofocus={true}
          register={{ ...register('otpCode') }}
          errorMessage={errors.otpCode?.message}
        />
        <PasswordField
          id="signup-password"
          label="Mật khẩu"
          register={{ ...register('password') }}
          errorMessage={errors.password?.message}
        />
        <PasswordField
          id="signup-retypePassword"
          label="Nhập lại mật khẩu"
          register={{ ...register('retypePassword') }}
          errorMessage={errors.retypePassword?.message}
        />
        <button
          type="submit"
          className={`${isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#FAFAFA] hover:text-[#DB4444]'} flex h-14 items-center justify-center gap-4 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] py-4 font-medium text-[#FAFAFA] transition-all`}
        >
          {isSubmitting ? (
            <>
              Tạo tài khoản...
              <span className="animate-spin text-lg font-bold">
                <FaSpinner />
              </span>
            </>
          ) : (
            <>Tạo tài khoản</>
          )}
        </button>
      </form>
      <div className="flex items-center justify-between text-sm">
        <button onClick={handleResendOTP} className="hover:text-[#DB4444]">
          Gửi lại mã OTP
        </button>
        <p className="flex items-center justify-center gap-2 text-[#4c4c4c]">
          Bạn đã có tài khoản?
          <Link
            className="font-medium underline hover:text-[#DB4444]"
            to="/sign-in"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
