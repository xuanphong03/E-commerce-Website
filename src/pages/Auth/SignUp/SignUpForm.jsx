import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputField from '~/components/form-controls/InputField/InputField';
import GoogleIcon from '~/assets/images/icon-google.png';
import { FaSpinner } from 'react-icons/fa6';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function SignUpForm({ onSubmit }) {
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
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu.')
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
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

  return (
    <div>
      <h2 className="mb-6 text-3xl font-medium leading-[30px] tracking-[1.44px]">
        Tạo tài khoản
      </h2>
      <p className="mb-10 text-sm">Nhập thông tin chi tiết của bạn dưới đây</p>
      <form
        className="mb-4 flex w-[400px] flex-col gap-10"
        onSubmit={handleSubmit(formSubmit)}
      >
        <InputField
          id="signup-name"
          label="Họ và tên"
          autofocus={true}
          register={{ ...register('name') }}
          errorMessage={errors.name?.message}
        />
        <InputField
          id="signup-email"
          label="Email"
          register={{ ...register('email') }}
          errorMessage={errors.email?.message}
        />
        <PasswordField
          id="signup-password"
          label="Mật khẩu"
          register={{ ...register('password') }}
          errorMessage={errors.password?.message}
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
      <button className="mb-8 flex h-14 w-full items-center justify-center gap-4 rounded border-2 border-solid border-[#BFBFBF] bg-[#FFFFFF] py-4 font-medium text-[#000000] transition-all">
        <img alt="icon" src={GoogleIcon} />
        Đăng nhập với Google
      </button>
      <p className="flex items-center justify-center gap-4 text-sm text-[#4c4c4c]">
        Bạn đã có tài khoản?
        <Link
          className="block border-b-2 border-solid border-[#4c4c4c] pb-1 font-medium transition-colors hover:border-[#DB4444] hover:text-[#DB4444]"
          to="/sign-in"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}
