import { useEffect, useRef, useState } from 'react';
import Headroom from 'react-headroom';
import { MdMenu } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from '~/assets/icons/cart.svg';
import HeartIcon from '~/assets/icons/heart.svg';
import UserIcon from '~/assets/icons/user.svg';
import Tooltip from '~/components/Tooltip';
import AccountDropdown from './components/Dropdown/AccountDropdown';
import Navigation from './components/Navigation/Navigation';
import SearchBox from './components/Search/SearchBox';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { locales } from '~/i18n/i18n';

const NavList = [
  {
    id: 1,
    path: '/',
    name: 'Trang chủ',
  },
  {
    id: 2,
    path: '/contact',
    name: 'Liên hệ',
  },
  {
    id: 3,
    path: '/about',
    name: 'Giới thiệu',
  },
  {
    id: 4,
    path: '/sign-up',
    name: 'Đăng ký',
  },
];

export default function Header() {
  const { t, i18n } = useTranslation('header');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isShowedMobileNavigation, setShowMobileNavigation] = useState(false);
  const [showMenuLanguage, setShowMenuLanguage] = useState(false);
  const currentLanguage = [locales[i18n.language]];
  const isAuthenticated = true;

  const accountDropdownRef = useRef(null);
  const menuLanguageRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!accountDropdownRef.current.contains(e.target)) {
        setShowAccountDropdown(false);
      }
      if (!menuLanguageRef.current.contains(e.target)) {
        setShowMenuLanguage(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <Headroom>
        <header className="border-b border-solid border-[#D9D9D9] bg-white">
          <div className="bg-black py-3 font-poppins">
            <div className="relative mx-auto flex w-full max-w-[1300px] items-center justify-center text-[#FAFAFA]">
              <p className="text-xs font-normal leading-normal lg:text-sm">
                {t('Promotions')}
                <span className="ml-2 cursor-pointer font-semibold text-[#FAFAFA] underline">
                  ShopNow
                </span>
              </p>
              <div
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-sm"
                ref={menuLanguageRef}
              >
                <div
                  onClick={() =>
                    setShowMenuLanguage((prevStatus) => !prevStatus)
                  }
                  className="flex cursor-pointer items-center gap-2 px-2"
                >
                  {currentLanguage}
                  <button className="cursor-pointer text-lg">
                    <IoIosArrowDown />
                  </button>
                </div>
                <div
                  className={`${showMenuLanguage ? 'block' : 'hidden'} absolute top-[calc(100%+12px)] w-full bg-black`}
                >
                  <div className="px-2 py-2 hover:bg-[#DB4444]">
                    <label
                      className="block w-full cursor-pointer"
                      onClick={() => setShowMenuLanguage(false)}
                    >
                      <input
                        onChange={handleChangeLanguage}
                        type="radio"
                        name="languages"
                        value="vi"
                        hidden
                      />
                      Tiếng Việt
                    </label>
                  </div>
                  <div className="px-2 py-2 hover:bg-[#DB4444]">
                    <label
                      className="block w-full cursor-pointer"
                      onClick={() => setShowMenuLanguage(false)}
                    >
                      <input
                        onChange={handleChangeLanguage}
                        type="radio"
                        name="languages"
                        value="en"
                        hidden
                      />
                      English
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1300px] items-center px-6 py-4 lg:justify-between lg:py-5 2xl:px-0 2xl:py-6">
            <div className="mr-12 flex items-center justify-center lg:mr-0">
              <Link
                className="font-inter text-xl font-bold leading-none -tracking-[0.72px] text-black lg:text-2xl"
                to="/"
              >
                Exclusive
              </Link>
            </div>
            <Navigation authenticated={isAuthenticated} />
            <div className="flex w-full items-center justify-between gap-8 lg:w-auto lg:justify-normal">
              <SearchBox />

              <div className="flex items-center gap-6 text-xl">
                <Link to="/wishlist">
                  <Tooltip infoText="Danh sách yêu thích">
                    <div className="flex h-8 w-8 cursor-pointer items-center">
                      <img
                        alt="icon"
                        className="max-w-full object-cover"
                        src={HeartIcon}
                      />
                    </div>
                  </Tooltip>
                </Link>
                <Link to="/cart">
                  <Tooltip infoText="Giỏ hàng">
                    <div className="relative flex h-7 w-7 cursor-pointer items-center">
                      <img
                        alt="icon"
                        className="max-w-full object-cover"
                        src={CartIcon}
                        ref={accountDropdownRef}
                      />
                      <span className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        1
                      </span>
                    </div>
                  </Tooltip>
                </Link>
                <div
                  onClick={() => setShowMobileNavigation(true)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center text-2xl lg:hidden"
                >
                  <MdMenu />
                </div>
                {isAuthenticated && (
                  <div
                    className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
                    ref={accountDropdownRef}
                    onClick={() =>
                      setShowAccountDropdown((prevStatus) => !prevStatus)
                    }
                  >
                    <img alt="icon" src={UserIcon} />
                    {showAccountDropdown && (
                      <div className="bg-[rgba(0, 0, 0, 0.04)] absolute right-0 top-[calc(100%+10px)] flex flex-col rounded bg-gradient-to-r from-[#9c7b9e] to-[#312c31] px-5 pb-2 pt-4 text-white">
                        <AccountDropdown />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </Headroom>
      <div>
        <nav
          className={`fixed bottom-0 left-0 top-0 z-50 h-screen lg:hidden ${isShowedMobileNavigation ? 'translate-x-0' : '-translate-x-full'} bg-[#4E4B66] font-poppins transition-transform`}
        >
          <ul className="block w-56 items-center gap-12 px-5 py-4 lg:flex lg:w-auto">
            {NavList.map((navItem) => (
              <li
                onClick={() => setShowMobileNavigation(false)}
                key={navItem.id}
              >
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-[#D9DBE9]' : 'border-transparent'} block border-b-2 border-solid py-1 text-center text-sm font-normal leading-normal text-white transition-colors hover:border-[#D9DBE9] lg:text-base`
                  }
                  to={navItem.path}
                >
                  {navItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          onClick={() => setShowMobileNavigation(false)}
          className={`${isShowedMobileNavigation ? 'visible opacity-25' : 'invisible opacity-0'} fixed bottom-0 left-0 right-0 top-0 z-10 bg-black transition-all`}
        ></div>
      </div>
    </>
  );
}
