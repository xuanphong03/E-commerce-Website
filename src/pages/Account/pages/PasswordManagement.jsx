import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import PasswordField from '~/components/form-controls/PasswordField/PasswordField';

PasswordManagement.propTypes = {
  onSubmit: PropTypes.func,
};

function PasswordManagement({ onSubmit }) {
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu mới.')
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
    retypeNewPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu mới.')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp'),
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
    if (onSubmit) {
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
          label="Mật khẩu hiện tại"
          register={{ ...register('currentPassword') }}
          errorMessage={errors.currentPassword?.message}
          autofocus
        />
      </div>
      <div className="w-3/5">
        <PasswordField
          label="Mật khẩu mới"
          register={{ ...register('newPassword') }}
          errorMessage={errors.newPassword?.message}
        />
      </div>
      <div className="w-3/5">
        <PasswordField
          label="Nhập lại mật khẩu mới"
          register={{ ...register('retypeNewPassword') }}
          errorMessage={errors.retypeNewPassword?.message}
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
