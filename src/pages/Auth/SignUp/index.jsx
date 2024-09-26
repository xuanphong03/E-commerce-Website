import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import signupBackground from '~/assets/images/signup-bg.png';
import { register } from '../userSlice';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import SignUpByEmail from './SignUpByEmail';
import { toast } from 'react-toastify';
import Spinner from '~/components/Animations/Spinner';
import userApi from '~/apis/userApi';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({});

  const verifyEmail = async (data) => {
    try {
      const response = await userApi.verifyEmail(data);
      if (response.status === 400) {
        toast.error('Email đã được dùng để đăng ký');
      } else {
        setUserInfo((prev) => ({ ...prev, ...data }));
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      throw new Error('Email đã được dùng để đăng ký');
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await userApi.verifyEmail(userInfo);
    } catch (error) {
      throw new Error('Failed verify email when register');
    }
  };

  const handleRegisterAccount = async (data) => {
    try {
      const { password, otpCode } = data;
      const registerData = { ...userInfo, password, otpCode };
      if (registerData.name) {
        registerData.name = registerData.name.trim();
      }
      const action = register(registerData);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // do something here when register successfully
      toast.success('Đăng ký tài khoản thành công');
      navigate('/');
    } catch (error) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại');
      throw new Error('Failed register email when register');
    }
  };

  const STEPS = [
    {
      step: 1,
      name: 'Register by email',
      page: <SignUpByEmail onSubmit={verifyEmail} />,
    },
    {
      step: 2,
      name: 'Setup password',
      page: (
        <SignUpForm
          emailUser={userInfo.email ?? null}
          onSubmit={handleRegisterAccount}
          onResendOTP={handleResendOTP}
        />
      ),
    },
  ];

  return (
    <main className="mx-auto grid max-w-[1300px] grid-cols-12 pb-[60px] pt-5">
      <div className="col-span-7 h-[550px]">
        <img alt="background" className="max-h-full" src={signupBackground} />
      </div>
      <section className="col-span-5 flex items-center">
        {STEPS.find(({ step }) => step === currentStep).page}
      </section>
    </main>
  );
}
