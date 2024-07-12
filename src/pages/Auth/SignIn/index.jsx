import { toast } from 'react-toastify';
import background from '~/assets/images/signup-bg.png';
import SignInForm from './SignInForm';
import { login, register } from '../userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

export default function SignInPage() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitSignInForm = async (data) => {
    try {
      const action = login(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
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
