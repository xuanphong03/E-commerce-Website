import { useState } from 'react';
import { CiPaperplane } from 'react-icons/ci';
export default function Introduce() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    let newEmail = e.target.value;
    setEmail(newEmail);
  };

  return (
    <div className="text-[#FAFAFA]">
      <h2 className="mb-6 text-2xl font-bold">Exclusive</h2>
      <h3 className="mb-6 text-xl font-medium">Đăng ký</h3>
      <p className="mb-4 text-sm">Giảm giá 10% cho đơn hàng đầu tiên</p>
      <div className="flex items-center gap-6 rounded border border-solid border-[#FAFAFA] px-4">
        <input
          type="email"
          className="bg-transparent py-2 text-sm text-[#FAFAFA] outline-none"
          value={email}
          onChange={handleEmailChange}
          placeholder="Nhập email của bạn"
        />
        <button className="cursor-pointer text-3xl text-[#FAFAFA]">
          <CiPaperplane />
        </button>
      </div>
    </div>
  );
}
