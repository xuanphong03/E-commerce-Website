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
      const action = register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // do something here when register successfully
      enqueueSnackbar('Đăng ký thành công!!! 🥳🥳🥳', {
        variant: 'success',
      });
      // Chuyển hướng về trang Home
      navigate('/');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <main className="mx-auto grid max-w-[1300px] grid-cols-12 pb-[60px] pt-5">
      <div className="col-span-7 h-[550px]">
        <img alt="background" className="max-h-full" src={signupBackground} />
      </div>
      <section className="col-span-5 flex items-center">
        <SignUpForm onSubmit={handleSubmitSignUpForm} />
      </section>
    </main>
  );
}
