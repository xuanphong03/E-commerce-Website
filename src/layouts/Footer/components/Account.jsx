import { Link } from 'react-router-dom';

export default function Account() {
  return (
    <div className="w-48 text-[#FAFAFA]">
      <h2 className="mb-6 text-xl font-medium">Account</h2>
      <ul className="text-sm">
        <li className="mb-4">
          <Link to="/account">Tài khoản của tôi</Link>
        </li>
        <li className="mb-4">
          <Link to="/sign-in">Đăng nhập / Đăng ký</Link>
        </li>
        <li className="mb-4">
          <Link to="/cart">Giỏ hàng</Link>
        </li>
        <li className="mb-4">
          <Link to="/wish-list">Danh sách yêu thích</Link>
        </li>
        <li className="">
          <Link to="/">Cửa hàng</Link>
        </li>
      </ul>
    </div>
  );
}
