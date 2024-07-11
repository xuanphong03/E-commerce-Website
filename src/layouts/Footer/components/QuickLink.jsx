import { Link } from 'react-router-dom';

export default function QuickLink() {
  return (
    <div className="w-48 font-poppins text-[#FAFAFA]">
      <h2 className="mb-6 text-xl font-medium">Quick Link</h2>
      <ul className="text-sm">
        <li className="mb-4">
          <Link to="/privacy-policy">Chính sách bảo mật</Link>
        </li>
        <li className="mb-4">
          <Link to="/term">Điều khoản sử dụng</Link>
        </li>
        <li className="mb-4">
          <Link to="/faq">FQA</Link>
        </li>
        <li className="">
          <Link to="/contact">Liên hệ</Link>
        </li>
      </ul>
    </div>
  );
}
