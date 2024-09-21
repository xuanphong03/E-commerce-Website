import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputField from './form-controls/InputField';
import { Fragment } from 'react';

CheckForgetAccount.propTypes = {
  onSubmit: PropTypes.func,
};

function CheckForgetAccount({ onSubmit }) {
  const schema = yup.object().shape({
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
            id="forgot-password-email"
            label="Email"
            placeholder="Nhập email người dùng"
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
            type="email"
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

export default CheckForgetAccount;
