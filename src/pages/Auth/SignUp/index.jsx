import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import signupBackground from '~/assets/images/signup-bg.png';
import { register } from '../userSlice';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitSignUpForm = async (data) => {
    try {
      // auto set user = email
      data.username = data.email;

      const action = register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // do something here when register successfully
      enqueueSnackbar('Register successfully!!! 🥳🥳🥳', {
        variant: 'success',
      });
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
