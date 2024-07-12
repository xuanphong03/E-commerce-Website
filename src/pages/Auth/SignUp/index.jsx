import signupBackground from '~/assets/images/signup-bg.png';
import SignUpForm from './SignUpForm';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  // const dispatch = useDispatch();

  const handleSubmitFormSignUp = async (data) => {
    try {
      // // auto set username = email
      // values.username = values.email;
      // const action = register(values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      // console.log("New user: ", user);
    } catch (error) {
      toast.error('Error!!!');
    }
  };

  return (
    <main className="mx-auto grid max-w-[1300px] grid-cols-12 pb-[60px] pt-5">
      <div className="col-span-7 h-[550px]">
        <img alt="background" className="max-h-full" src={signupBackground} />
      </div>
      <section className="col-span-5 flex items-center">
        <SignUpForm onSubmit={handleSubmitFormSignUp} />
      </section>
    </main>
  );
}
