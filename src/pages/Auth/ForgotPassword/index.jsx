import { useState } from 'react';
import CheckForgetAccount from './components/CheckForgetAccount';
import StatusUpdatePassword from './components/StatusUpdatePassword';
import Steps from './components/Steps';
import UpdateForgetAccount from './components/UpdateForgetAccount';

function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);
  const handleVerifyAccount = async (data) => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleResetPassword = async (data) => {
    try {
      setResetPasswordStatus(true);
    } catch {
      setResetPasswordStatus(false);
    }
    setCurrentStep((prev) => prev + 1);
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
      element: <UpdateForgetAccount onSubmit={handleResetPassword} />,
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
      <div className="mx-auto w-1/2">
        <h1 className="text-center text-4xl font-light uppercase tracking-wider">
          Quên mật khẩu
        </h1>
        <div className="mt-4 flex justify-center">
          <Steps currentStep={currentStep} steps={steps} />
        </div>
        <div className="shadow-form-identify mx-auto mt-8 flex w-[550px] justify-center rounded-md px-6 py-3">
          {steps[currentStep - 1]?.element}
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
