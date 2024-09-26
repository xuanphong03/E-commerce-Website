import UserIcon from '~/assets/icons/user2.svg';
import OrderIcon from '~/assets/icons/Group.svg';
import StarIcon from '~/assets/icons/Icon-Reviews.svg';
import LogoutIcon from '~/assets/icons/Icon-logout.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '~/pages/Auth/userSlice';

export default function AccountDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DropdownMenu = [
    {
      to: '/account/information',
      pathIcon: UserIcon,
      name: 'Quản lý tài khoản',
    },
    {
      to: '/my-orders/',
      pathIcon: OrderIcon,
      name: 'Đơn hàng',
    },
    {
      to: '/my-reviews',
      pathIcon: StarIcon,
      name: 'Đánh giá',
    },
  ];

  const handleLogoutAccount = () => {
    const action = logout();
    dispatch(action);
    navigate('/');
  };

  return (
    <ul className="min-w-40 lg:min-w-52">
      {DropdownMenu.map((menuItem, index) => (
        <li
          key={index}
          className="border-b border-solid border-transparent py-2 transition-colors hover:border-white lg:mb-2"
        >
          <Link to={menuItem.to} className="flex items-center gap-6">
            <div className="flex size-6 items-center justify-center">
              <img
                className="max-h-full w-auto"
                alt="icon"
                src={menuItem.pathIcon}
              />
            </div>
            <p className="black text-xs font-normal leading-normal text-[#fafafa] lg:text-sm">
              {menuItem.name}
            </p>
          </Link>
        </li>
      ))}
      <li
        onClick={handleLogoutAccount}
        className="border-b border-solid border-transparent py-2 transition-colors hover:border-white lg:mb-2"
      >
        <div className="flex items-center gap-6">
          <div className="flex size-6 items-center justify-center">
            <img className="max-h-full w-auto" alt="icon" src={LogoutIcon} />
          </div>
          <p className="black text-xs font-normal leading-normal text-[#fafafa] lg:text-sm">
            Đăng xuất
          </p>
        </div>
      </li>
    </ul>
  );
}
