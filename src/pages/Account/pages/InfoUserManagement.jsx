import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputField from '~/components/form-controls/InputField/InputField';

InfoUserManagement.propTypes = {
  onSubmit: PropTypes.func,
};

function InfoUserManagement({ onSubmit }) {
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
    tel: yup.string().required('Vui lòng nhập số điện thoại'),
    address: yup.string().required('Vui lòng nhập địa chỉ nhận hàng'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'Nguyễn Xuân Phong',
      email: 'nxphong1006.work@gmail.com',
      tel: '08657833590',
      address: 'Cụm 8, Vĩnh Ninh, Vĩnh Quỳnh, Thanh Trì, Hà Nội',
    },
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col gap-14 pl-10 pt-2"
    >
      <div className="w-3/5">
        <InputField
          id="info-name"
          label="Họ và tên"
          register={{ ...register('name') }}
          errorMessage={errors.name?.message}
        />
      </div>
      <div className="w-3/5">
        <InputField
          id="info-email"
          label="Email"
          register={{ ...register('email') }}
          errorMessage={errors.email?.message}
        />
      </div>
      <div className="w-3/5">
        <InputField
          id="info-tel"
          label="Số điện thoại"
          register={{ ...register('tel') }}
          errorMessage={errors.tel?.message}
        />
      </div>
      <div className="w-3/5">
        <InputField
          id="info-address"
          label="Địa chỉ nhận hàng"
          register={{ ...register('address') }}
          errorMessage={errors.address?.message}
        />
      </div>
      <div className="flex w-3/5 justify-end">
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-white text-[#BD4444]' : 'cursor-pointer'} w-44 rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-5 py-2 text-white transition-all hover:bg-white hover:text-[#BD4444]`}
        >
          {isSubmitting ? 'Loading...' : 'Thay đổi thông tin'}
        </button>
      </div>
    </form>
  );
}

export default InfoUserManagement;
