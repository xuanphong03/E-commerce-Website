import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField/InputField';
import { regex } from '~/constants/regex';
InfoUserManagement.propTypes = {
  onSubmit: PropTypes.func,
};

function InfoUserManagement({ onSubmit, userInfo }) {
  const user = useSelector((state) => state.user.current);
  // const [provinces, setProvinces] = useState([]);
  // const [districts, setDistricts] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên của bạn.'),
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
    phoneNumber: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .test(
        'Check valid phone number',
        'Vui lòng nhập số điện thoại hợp lệ',
        (phoneNumber) => {
          return regex.phoneNumber.test(phoneNumber);
        },
      ),
    address: yup.string().required('Vui lòng nhập địa chỉ nhận hàng'),
    // province_id: yup.number().required('Vui lòng chọn tỉnh/thành phố'),
    // district_id: yup.number().required('Vui lòng chọn quận/huyện'),
  });

  const {
    handleSubmit,
    register,
    // watch,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userInfo?.name || user.name,
      email: userInfo?.email || user.email,
      phoneNumber: userInfo?.phoneNumber || user.phoneNumber,
      address: userInfo?.address || user.address,
    },
  });

  // const currentProvinceId = watch('province_id');

  // const getProvinces = async () => {
  //   try {
  //     const response = await publicProvinceApi.getProvinces();
  //     const provinces = response.results?.map((province) => ({
  //       id: province.province_id,
  //       name: province.province_name,
  //     }));
  //     setProvinces(provinces);
  //   } catch (error) {
  //     throw new Error('Error');
  //   }
  // };

  // const getDistricts = async (province_id) => {
  //   try {
  //     const response = await publicProvinceApi.getDistricts(province_id);
  //     const districts = response.results?.map((district) => ({
  //       id: district.district_id,
  //       name: district.district_name,
  //     }));
  //     setDistricts(districts);
  //   } catch (error) {
  //     throw new Error('Error');
  //   }
  // };

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  // useEffect(() => {
  //   getProvinces();
  // }, []);

  // useEffect(() => {
  //   if (currentProvinceId) {
  //     setValue('district_id', null);
  //     getDistricts(currentProvinceId);
  //   }
  // }, [currentProvinceId]);

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col gap-14 bg-white pl-10 pt-2"
    >
      <div className="flex w-full gap-10">
        <div className="flex w-3/5 flex-col gap-10">
          <InputField
            id="info-name"
            label="Họ và tên"
            register={{ ...register('name') }}
            errorMessage={errors.name?.message}
          />
          <InputField
            readOnly
            id="info-email"
            label="Email"
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
          />
          <InputField
            id="info-phoneNumber"
            label="Số điện thoại"
            register={{ ...register('phoneNumber') }}
            errorMessage={errors.phoneNumber?.message}
          />
          <InputField
            id="info-address"
            label="Địa chỉ nhận hàng"
            register={{ ...register('address') }}
            errorMessage={errors.address?.message}
          />
          {/* <div className="flex gap-5">
            <SelectAddress
              label="Tỉnh/Thành phố"
              options={provinces}
              register={{ ...register('province_id') }}
              errorMessage={errors.province_id?.message}
            />
            <SelectAddress
              label="Quận/Huyện"
              options={districts}
              register={{ ...register('district_id') }}
              errorMessage={errors.district_id?.message}
            />
          </div> */}
        </div>
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
