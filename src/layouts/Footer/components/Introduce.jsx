import { useState } from 'react';
import { CiPaperplane } from 'react-icons/ci';
import discountApi from '~/apis/discountApi';
export default function Introduce() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    let newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleGetDiscount = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await discountApi.create({ email });
      setEmail('');
    } catch (error) {
      throw new Error('Error get discount!');
    }
  };

  return (
    <div className="text-[#FAFAFA]">
      <h2 className="mb-6 text-2xl font-bold">SOMEHOW</h2>
      <h3 className="mb-6 text-xl font-medium">Đăng ký</h3>
      <p className="mb-4 text-sm">Giảm giá 10% cho đơn hàng đầu tiên</p>
      <form
        onSubmit={handleGetDiscount}
        className="flex items-center gap-6 rounded border border-solid border-[#FAFAFA] px-4"
      >
        <input
          type="email"
          className="bg-transparent py-2 text-sm text-[#FAFAFA] outline-none"
          value={email}
          onChange={handleEmailChange}
          placeholder="Nhập email của bạn"
        />
        <button
          type="submit"
          className="cursor-pointer text-3xl text-[#FAFAFA]"
        >
          <CiPaperplane />
        </button>
      </form>
    </div>
  );
}
