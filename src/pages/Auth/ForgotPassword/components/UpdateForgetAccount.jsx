import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputField from './form-controls/InputField';
import { Fragment } from 'react';

UpdateForgetAccount.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateForgetAccount({ onSubmit }) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
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

  return (
    <Fragment>
      <div
        className={`fixed inset-0 !z-[9999] flex items-center justify-center bg-black transition-all duration-300 ${!isSubmitting ? 'invisible bg-opacity-0' : 'visible bg-opacity-30'}`}
      >
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div>
          <InputField
            id="email"
            label="Email"
            placeholder="Nhập email người dùng"
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
            autofocus={true}
            type="email"
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
        <div className="flex justify-end">
          <button className="rounded-md bg-blue-500 px-6 py-2 text-sm text-white">
            Xác nhận
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default UpdateForgetAccount;
