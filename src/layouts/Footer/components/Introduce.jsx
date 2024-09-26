import { useState } from 'react';
import { CiPaperplane } from 'react-icons/ci';
import { toast } from 'react-toastify';
import discountApi from '~/apis/discountApi';
import Spinner from '~/components/Animations/Spinner';
export default function Introduce() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (e) => {
    let newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleGetDiscount = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setIsLoading(true);
      const response = await discountApi.create({ email });
      if (response.status === 404) {
        toast.error('Email không đáp ứng điều ứng đủ điều kiện của cửa hàng.');
      } else if (response.status === 200) {
        toast.success('Mã giảm giá đã được gửi về Email');
      }

      setEmail('');
    } catch (error) {
      throw new Error('Error get discount!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-[#FAFAFA]">
      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all ${isLoading ? 'visible bg-opacity-20' : 'invisible bg-opacity-0'}`}
      >
        <Spinner />
      </div>
      <div className="mb-4">
        <h2 className="mb-6 text-2xl font-bold">SOMEHOW</h2>
        <p className="text-base font-semibold uppercase">
          Giảm 10% cho đơn hàng đầu tiên
        </p>
        <p className="text-sm italic">
          (Chỉ áp dụng cho các Email đã đăng ký tài khoản)
        </p>
      </div>
      <form
        onSubmit={handleGetDiscount}
        className="rounded border border-solid border-[#FAFAFA]"
      >
        <div className="relative flex items-center gap-6 pl-4 pr-10">
          <input
            type="email"
            className="w-full bg-transparent py-2 text-sm text-[#FAFAFA] outline-none"
            value={email}
            onChange={handleEmailChange}
            placeholder="Nhập email của bạn..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-[#FAFAFA]"
          >
            <CiPaperplane />
          </button>
        </div>
      </form>
    </div>
  );
}
