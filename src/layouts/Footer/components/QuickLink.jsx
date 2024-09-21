import { Link } from 'react-router-dom';

export default function QuickLink() {
  return (
    <div className="w-48 text-[#FAFAFA]">
      <h2 className="mb-6 text-xl font-medium">Quick Link</h2>
      <ul className="flex flex-col gap-4 text-sm">
        <li>
          <Link to="/term-and-policy/privacy-policy">Chính sách bảo mật</Link>
        </li>
        <li>
          <Link to="/term-and-policy/term-of-service">Điều khoản dịch vụ</Link>
        </li>
        <li>
          <Link to="/contact">Liên hệ</Link>
        </li>
      </ul>
    </div>
  );
}
