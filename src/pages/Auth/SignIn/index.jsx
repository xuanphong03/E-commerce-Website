import background from '~/assets/images/signup-bg.png';
import SignInForm from './SignInForm';
import { login } from '../userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitSignInForm = async (data) => {
    try {
      const action = login(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      navigate('/');
    } catch (error) {
      enqueueSnackbar(
        'Tài khoản hoặc mật khẩu chưa chính xác! Vui lòng kiểm tra lại',
        { variant: 'error', autoHideDuration: 2000 },
      );
    }
  };

  return (
    <main className="mx-auto grid max-w-[1300px] grid-cols-12 pb-[60px] pt-5">
      <div className="col-span-7 h-[550px]">
        <img alt="background" className="max-h-full" src={background} />
      </div>
      <section className="col-span-5 flex items-center">
        <SignInForm onSubmit={handleSubmitSignInForm} />
      </section>
    </main>
  );
}
