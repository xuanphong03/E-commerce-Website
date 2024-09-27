import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField/InputField';
import RatingField from './RatingField';

ReviewProductForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  product: PropTypes.object.isRequired,
};

function ReviewProductForm({ onSubmit, onCancel, product }) {
  const schema = yup.object().shape({
    identification_pro: yup.string(),
    color: yup.string().required('Vui lòng nhập màu sắc sản phẩm'),
    size: yup.string().required('Vui lòng nhập kích thước sản phẩm'),
    rating: yup
      .number()
      .required('Vui lòng đánh giá sản phẩm')
      .min(1, 'Vui lòng đánh giá sản phẩm'),
    content: yup
      .string()
      .min(5, 'Nội dung đánh giá phải có ít nhất 5 ký tự')
      .max(256, 'Nội dung đánh giá không được vượt quá 256 ký tự')
      .required('Vui lòng nhập nội dung đánh giá'),
  });
  const { name } = useSelector((state) => state.user.current);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      identification_pro: product.identification_pro || '',
      color: product.color || '',
      size: product.size || '',
      rating: 0,
      content: '',
    },
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      onSubmit({ ...data, username: name });
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999999] bg-[rgba(0,0,0,0.5)]"></div>
      <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
        <div className="relative w-[600px] rounded-md bg-white">
          {isSubmitting && <LinearProgress />}
          <span
            onClick={onCancel}
            className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded bg-slate-200 text-lg hover:bg-slate-400"
          >
            &times;
          </span>
          <h1 className="p-4 text-center">Đánh giá sản phẩm</h1>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-10 px-4 py-4"
          >
            <div>
              <InputField
                id="product-name"
                label="Tên sản phẩm"
                readOnly
                register={{ ...register('identification_pro') }}
                errorMessage={errors.identification_pro?.message}
              />
            </div>
            <div className="flex gap-5">
              <div className="basis-1/2">
                <InputField
                  id="product-color"
                  label="Màu sắc"
                  readOnly
                  register={{ ...register('color') }}
                  errorMessage={errors.color?.message}
                />
              </div>
              <div className="basis-1/2">
                <InputField
                  id="product-size"
                  label="Kích thước"
                  readOnly
                  register={{ ...register('size') }}
                  errorMessage={errors.size?.message}
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <RatingField
                label="Đánh giá sản phẩm"
                register={{ ...register('rating') }}
                errorMessage={errors.rating?.message}
              />
            </div>
            <div>
              <label>Nội dung</label>
              <div className="mt-2">
                <textarea
                  {...register('content')}
                  placeholder="Nội dung đánh giá..."
                  className="w-full resize-none rounded border-2 border-solid border-[#ccc] p-1 outline-none"
                  rows={5}
                />
                {errors.content?.message && (
                  <p className="px-1 text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" color="primary" variant="contained">
                Gửi đánh giá
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReviewProductForm;
