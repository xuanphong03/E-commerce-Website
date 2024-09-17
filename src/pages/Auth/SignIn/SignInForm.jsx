import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import InputField from '~/components/form-controls/InputField/InputField';
import GoogleIcon from '~/assets/images/icon-google.png';
import { FaSpinner } from 'react-icons/fa6';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function SignInForm({ onSubmit }) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
    password: yup.string().required('Vui lòng nhập mật khẩu.'),
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
        Đăng nhập
      </h2>
      <p className="mb-10 text-sm">Nhập thông tin chi tiết của bạn dưới đây</p>
      <form
        className="mb-4 flex w-[400px] flex-col gap-10"
        onSubmit={handleSubmit(formSubmit)}
      >
        <InputField
          id="signup-email"
          label="Email"
          register={{ ...register('email') }}
          errorMessage={errors.email?.message}
          autofocus={true}
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
              Đăng nhập...
              <span className="animate-spin text-lg font-bold">
                <FaSpinner />
              </span>
            </>
          ) : (
            <>Đăng nhập</>
          )}
        </button>
      </form>
      <div className="flex items-center justify-between text-sm">
        <Link
          to="/sign-in/identify"
          className="cursor-pointer hover:text-[#DB4444]"
        >
          Quên mật khẩu?
        </Link>
        <p className="flex items-center justify-center gap-2 text-[#4c4c4c]">
          Bạn chưa có tài khoản?
          <Link
            className="block font-medium underline transition-colors hover:border-[#DB4444] hover:text-[#DB4444]"
            to="/sign-up"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
