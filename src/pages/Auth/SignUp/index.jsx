import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import signupBackground from '~/assets/images/signup-bg.png';
import { register } from '../userSlice';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitSignUpForm = async (data) => {
    try {
      if (data.name) {
        data.name = data.name.trim();
      }
      const action = register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);

      // do something here when register successfully
      enqueueSnackbar('Đăng ký thành công!', {
        variant: 'success',
      });
      // Chuyển hướng về trang Home
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' });
    }
  };

  return (
    <main className="mx-auto grid max-w-[1300px] grid-cols-12 pb-[60px] pt-5">
      <div className="hidden h-[550px] lg:col-span-7 lg:block">
        <img alt="background" className="max-h-full" src={signupBackground} />
      </div>
      <section className="col-span-12 mx-auto flex items-center lg:col-span-5">
        <SignUpForm onSubmit={handleSubmitSignUpForm} />
      </section>
    </main>
  );
}
