import { useEffect, useRef, useState } from 'react';
import Headroom from 'react-headroom';
import { MdMenu } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from '~/assets/icons/cart.svg';
import HeartIcon from '~/assets/icons/heart.svg';
import UserIcon from '~/assets/icons/user.svg';
import Tooltip from '~/components/Tooltip';
import AccountDropdown from './components/Dropdown/AccountDropdown';
import Navigation from './components/Navigation/Navigation';
import SearchBox from './components/Search/SearchBox';
import { useSelector } from 'react-redux';

export default function Header() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const infoUser = useSelector((state) => state.user.current);
  const isAuthenticated = !!infoUser.id;

  const accountDropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (isAuthenticated && !accountDropdownRef.current.contains(e.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <header>
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-solid border-[#D9D9D9] bg-white">
        <div className="bg-black py-3">
          <div className="relative mx-auto flex w-full max-w-[1300px] items-center justify-center text-[#FAFAFA]">
            <p className="text-xs font-normal leading-normal lg:text-sm">
              Giảm giá mùa hè cho tất cả đồ bơi và giao hàng nhanh miễn phí -
              GIẢM GIÁ 50%!
              <span className="ml-2 cursor-pointer font-semibold text-[#FAFAFA] underline">
                ShopNow
              </span>
            </p>
            {!isAuthenticated && (
              <Link
                to="/sign-in"
                className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm"
              >
                <FaRegUser />
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
        <div className="mx-auto flex max-w-[1300px] items-center px-6 py-4 lg:justify-between lg:py-5 2xl:px-0 2xl:py-6">
          <div className="mr-12 flex items-center justify-center lg:mr-0">
            <Link
              className="text-xl font-bold leading-none -tracking-[0.72px] text-black lg:text-2xl"
              to="/"
            >
              Exclusive
            </Link>
          </div>
          <Navigation />
          <div className="flex w-full items-center justify-between gap-8 lg:w-auto lg:justify-normal">
            <SearchBox />

            {isAuthenticated && (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
