import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '~/assets/icons/search.svg';
import HeartIcon from '~/assets/icons/heart.svg';
import CartIcon from '~/assets/icons/cart.svg';
import UserIcon from '~/assets/icons/user.svg';
import { useEffect, useRef, useState } from 'react';
import Tooltip from '~/components/Tooltip';
import AccountDropdown from './AccountDropdown';
import Headroom from 'react-headroom';
import { MdMenu } from 'react-icons/md';

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
  const [search, setSearch] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isShowedMobileNavigation, setShowMobileNavigation] = useState(false);
  const isAuthenticated = true;

  const accountDropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!accountDropdownRef.current.contains(e.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleSearch = () => {
    if (!search) return;
    setSearch('');
  };

  const handleSearchChange = (e) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
  };

  return (
    <>
      <Headroom>
        <header className="border-b border-solid border-[#D9D9D9] bg-white">
          <div className="flex items-center justify-center bg-black py-3 font-poppins">
            <p className="text-xs font-normal leading-normal text-[#FAFAFA] lg:text-sm">
              Mùa hè giảm giá cho tất cả đồ bơi và miễn phí giao hàng nhanh -
              GIẢM GIÁ 50%!
              <span className="ml-2 cursor-pointer font-semibold text-[#FAFAFA] underline">
                ShopNow
              </span>
            </p>
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
            <nav className="hidden font-poppins lg:block">
              <ul className="flex items-center gap-12">
                {NavList.map((navItem) => (
                  <li key={navItem.id}>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive ? 'border-[#D9DBE9]' : 'border-transparent'} block border-b-2 border-solid py-1 text-center text-sm font-normal leading-normal transition-colors hover:border-[#D9DBE9] lg:text-base`
                      }
                      to={navItem.path}
                    >
                      {navItem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex w-full items-center justify-between gap-8 lg:w-auto lg:justify-normal">
              <div className="relative flex w-52 items-center rounded bg-[#f5f5f5] py-2 pl-5 pr-3 lg:w-60">
                <input
                  onChange={handleSearchChange}
                  value={search}
                  id="product-search"
                  type="text"
                  placeholder="Bạn đang tìm kiếm cái gì?"
                  className="w-full bg-[#f5f5f5] text-xs outline-none lg:text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <label
                  htmlFor="product-search"
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-xl lg:h-6 lg:w-6"
                  onClick={handleSearch}
                >
                  <img
                    alt="icon"
                    className="max-w-full object-cover"
                    src={SearchIcon}
                  />
                </label>
              </div>
              <div className="flex items-center gap-6 text-xl">
                <Link to="/wishlist">
                  <Tooltip infoText="Danh sách yêu thích">
                    <div className="flex h-6 w-6 cursor-pointer items-center lg:h-8 lg:w-8">
                      <img
                        alt="icon"
                        className="max-w-full object-cover"
                        src={HeartIcon}
                      />
                    </div>
                  </Tooltip>
                </Link>
                <Tooltip infoText="Giỏ hàng">
                  <div className="relative flex h-5 w-5 cursor-pointer items-center lg:h-7 lg:w-7">
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
                <div
                  onClick={() => setShowMobileNavigation(true)}
                  className="h-5 w-5 cursor-pointer lg:hidden"
                >
                  <MdMenu />
                </div>
                {isAuthenticated && (
                  <div
                    className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full lg:h-7 lg:w-7"
                    ref={accountDropdownRef}
                    onClick={() =>
                      setShowAccountDropdown((prevStatus) => !prevStatus)
                    }
                  >
                    <img alt="icon" src={UserIcon} />
                    {showAccountDropdown && (
                      <div className="bg-[rgba(0, 0, 0, 0.04)] absolute right-0 top-[calc(100%+10px)] flex flex-col rounded bg-gradient-to-r from-[#9c7b9e] to-[#312c31] px-5 py-4 text-white">
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
          <ul className="block w-56 items-center gap-12 px-5 py-4 lg:flex">
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
