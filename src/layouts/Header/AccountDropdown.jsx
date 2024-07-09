import UserIcon from '~/assets/icons/user2.svg';
import OrderIcon from '~/assets/icons/Group.svg';
import CancelIcon from '~/assets/icons/icon-cancel.svg';
import StarIcon from '~/assets/icons/Icon-Reviews.svg';
import LogoutIcon from '~/assets/icons/Icon-logout.svg';
import { Link } from 'react-router-dom';

const DropdownMenu = [
  {
    to: '/account',
    pathIcon: UserIcon,
    name: 'Quản lý tài khoản',
  },
  {
    to: '/my-orders',
    pathIcon: OrderIcon,
    name: 'Đơn hàng đã đặt',
  },
  {
    to: '/my-cancelation',
    pathIcon: CancelIcon,
    name: 'Đơn hàng đã hủy',
  },
  {
    to: '/my-reviews',
    pathIcon: StarIcon,
    name: 'Đánh giá của tôi',
  },
  {
    to: '/',
    pathIcon: LogoutIcon,
    name: 'Đăng xuất',
  },
];

export default function AccountDropdown() {
  return (
    <ul className="min-w-48 font-poppins">
      {DropdownMenu.map((menuItem, index) => (
        <li
          key={index}
          className="mb-2 border-b border-solid border-transparent py-2 transition-colors hover:border-white"
        >
          <Link to={menuItem.to} className="flex items-center gap-4">
            <img className="h-6" alt="icon" src={menuItem.pathIcon} />
            <p className="black text-sm font-normal leading-normal text-[#fafafa]">
              {menuItem.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
