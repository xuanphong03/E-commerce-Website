import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';
import InputField from '~/components/form-controls/InputField/InputField';
import { FaSpinner } from 'react-icons/fa';

SignUpByEmail.propTypes = {
  onSubmit: PropTypes.func,
};

function SignUpByEmail({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập tên của bạn.')
      .test('min 2 words', 'Họ và tên phải chứa ít nhất 2 từ.', (value) => {
        return value.trim().split(' ').length >= 2;
      })
      .test('invalid name', 'Tên không được chứa chữ số', (name) => {
        const namePattern = /\d/;
        return !namePattern.test(name);
      }),
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
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
      <div>
        <h2 className="mb-5 text-3xl font-medium leading-[30px] tracking-[1.44px]">
          Tạo tài khoản
        </h2>
        <p className="mb-10 text-base text-gray-600">
          Bước 1: Nhập họ tên và email của bạn
        </p>
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

          <button
            type="submit"
            className={`${isSubmitting ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#FAFAFA] hover:text-[#DB4444]'} flex h-14 items-center justify-center gap-4 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] py-4 font-medium text-[#FAFAFA] transition-all`}
          >
            {isSubmitting ? (
              <>
                Xác minh Email...
                <span className="animate-spin text-lg font-bold">
                  <FaSpinner />
                </span>
              </>
            ) : (
              <>Xác minh Email</>
            )}
          </button>
        </form>
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
    </div>
  );
}

export default SignUpByEmail;
