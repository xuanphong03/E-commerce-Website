import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Account() {
  const user = useSelector((state) => state.user.current);
  const isAuthenticated = !!user.id;

  return (
    <div className="w-48 text-[#FAFAFA]">
      <h2 className="mb-6 text-xl font-medium">Account</h2>
      <ul className="flex flex-col gap-4 text-sm">
        {isAuthenticated ? (
          <Fragment>
            <li>
              <Link to="/account">Tài khoản của tôi</Link>
            </li>
            <li>
              <Link to="/cart">Giỏ hàng</Link>
            </li>
            <li>
              <Link to="/wishlist">Danh sách yêu thích</Link>
            </li>
          </Fragment>
        ) : (
          <li>
            <Link to="/sign-in">Đăng nhập / Đăng ký</Link>
          </li>
        )}
        <li>
          <Link to="/products/all_products">Cửa hàng</Link>
        </li>
      </ul>
    </div>
  );
}
