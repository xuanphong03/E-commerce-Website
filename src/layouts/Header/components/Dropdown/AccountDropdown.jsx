import UserIcon from '~/assets/icons/user2.svg';
import OrderIcon from '~/assets/icons/Group.svg';
import CancelIcon from '~/assets/icons/icon-cancel.svg';
import StarIcon from '~/assets/icons/Icon-Reviews.svg';
import LogoutIcon from '~/assets/icons/Icon-logout.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AccountDropdown() {
  const { t } = useTranslation('header');
  const DropdownMenu = [
    {
      to: '/account',
      pathIcon: UserIcon,
      name: `${t('Dropdown Manage My Account')}`,
    },
    {
      to: '/my-orders',
      pathIcon: OrderIcon,
      name: `${t('Dropdown My Order')}`,
    },
    {
      to: '/my-cancelation',
      pathIcon: CancelIcon,
      name: `${t('Dropdown My Cancellations')}`,
    },
    {
      to: '/my-reviews',
      pathIcon: StarIcon,
      name: `${t('Dropdown My Reviews')}`,
    },
    {
      to: '/',
      pathIcon: LogoutIcon,
      name: `${t('Dropdown Logout')}`,
    },
  ];
  return (
    <ul className="min-w-40 font-poppins lg:min-w-52">
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
    </ul>
  );
}
