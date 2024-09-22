import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';

import PropTypes from 'prop-types';
PasswordManagement.propTypes = {
  onSubmit: PropTypes.func,
};

function PasswordManagement({ onSubmit }) {
  const schema = yup.object().shape({
    old_password: yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const formSubmit = async (data) => {
    if (onSubmit && !isSubmitting) {
      await onSubmit(data);
      reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col gap-14 pl-10 pt-2"
    >
      <div className="w-3/5">
        <PasswordField
          id="old_password"
          label="Mật khẩu hiện tại"
          register={{ ...register('old_password') }}
          errorMessage={errors.old_password?.message}
          autofocus
        />
      </div>
      <div className="w-3/5">
        <PasswordField
          id="new_password"
          label="Mật khẩu mới"
          register={{ ...register('new_password') }}
          errorMessage={errors.new_password?.message}
        />
      </div>
      <div className="w-3/5">
        <PasswordField
          id="renew_password"
          label="Nhập lại mật khẩu mới"
          register={{ ...register('renew_password') }}
          errorMessage={errors.renew_password?.message}
        />
      </div>
      <div className="flex w-3/5 justify-end">
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-white text-[#BD4444]' : 'cursor-pointer'} w-44 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-5 py-2 text-white transition-all hover:bg-white hover:text-[#BD4444]`}
        >
          {isSubmitting ? 'Loading...' : 'Thay đổi mật khẩu'}
        </button>
      </div>
    </form>
  );
}

export default PasswordManagement;
