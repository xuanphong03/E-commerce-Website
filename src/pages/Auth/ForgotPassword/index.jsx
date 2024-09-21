import { useState } from 'react';
import CheckForgetAccount from './components/CheckForgetAccount';
import StatusUpdatePassword from './components/StatusUpdatePassword';
import Steps from './components/Steps';
import UpdateForgetAccount from './components/UpdateForgetAccount';
import userApi from '~/apis/userApi';
import { toast } from 'react-toastify';
import Spinner from '~/components/Animations/Spinner';

function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);

  const handleVerifyAccount = async (data) => {
    try {
      setIsLoading(true);
      const response = await userApi.checkAccount(data);
      if (response.status === 200) {
        setUserEmail(data.email);
        setCurrentStep((prev) => prev + 1);
      } else {
        toast.error('Email không tồn tại trong cơ sở dữ liệu');
      }
    } catch (error) {
      throw new Error('Failed to verify account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    try {
      setIsLoading(true);
      const { status } = await userApi.resetAccount(data);
      if (status === 200) {
        setResetPasswordStatus(true);
      } else if (status === 404) {
        setResetPasswordStatus(false);
      }
    } catch {
      throw new Error('Failed to reset password');
    } finally {
      setIsLoading(false);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const steps = [
    {
      id: 'verification',
      name: 'Xác minh',
      element: <CheckForgetAccount onSubmit={handleVerifyAccount} />,
    },
    {
      id: 'reset-password',
      name: 'Đặt lại mật khẩu',
      element: (
        <UpdateForgetAccount
          userEmail={userEmail}
          onSubmit={handleResetPassword}
        />
      ),
    },
    {
      id: 'status',
      name: 'Trạng thái',
      element: (
        <StatusUpdatePassword resetPasswordStatus={resetPasswordStatus} />
      ),
    },
  ];
  return (
    <section className="py-10">
      {isLoading && (
        <div className="fixed inset-0 z-[99999]">
          <div className="fixed inset-0 bg-black bg-opacity-20"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}
      <div className="mx-auto w-1/2">
        <h1 className="text-center text-4xl font-light uppercase tracking-wider">
          Quên mật khẩu
        </h1>
        <div className="mt-4 flex justify-center">
          <Steps currentStep={currentStep} steps={steps} />
        </div>
        <div className="mx-auto mt-8 flex w-[550px] justify-center rounded-md px-6 py-3 shadow-form-identify">
          {steps[currentStep - 1]?.element}
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
