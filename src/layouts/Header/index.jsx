import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '~/assets/icons/search.svg';
import HeartIcon from '~/assets/icons/heart.svg';
import CartIcon from '~/assets/icons/cart.svg';
import { useState } from 'react';
import Tooltip from '~/components/Tooltip';

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

  const handleSearch = () => {
    if (!search) return;
    setSearch('');
  };

  const handleSearchChange = (e) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
  };

  return (
    <header className="border-b border-solid border-[#D9D9D9]">
      <div className="flex items-center justify-center bg-black py-3 font-poppins">
        <p className="text-sm font-normal leading-normal text-[#FAFAFA]">
          Mùa hè giảm giá cho tất cả đồ bơi và miễn phí giao hàng nhanh - GIẢM
          GIÁ 50%!
          <span className="ml-2 cursor-pointer font-semibold text-[#FAFAFA] underline">
            ShopNow
          </span>
        </p>
      </div>
      <div className="mx-auto flex max-w-[1300px] items-center justify-between pb-6 pt-12">
        <div className="flex items-center justify-center">
          <Link
            className="font-inter text-2xl font-bold leading-none -tracking-[0.72px] text-black"
            to="/"
          >
            Exclusive
          </Link>
        </div>
        <nav className="font-poppins">
          <ul className="flex items-center gap-12">
            {NavList.map((navItem) => (
              <li key={navItem.id}>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-[#909090]' : 'border-transparent'} block border-b-2 border-solid py-1 text-center text-base font-normal leading-normal transition-colors hover:border-[#909090]`
                  }
                  to={navItem.path}
                >
                  {navItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-8">
          <div className="relative flex w-60 items-center rounded bg-[#f5f5f5] py-2 pl-5 pr-3">
            <input
              onChange={handleSearchChange}
              value={search}
              id="product-search"
              type="text"
              placeholder="Bạn đang tìm kiếm cái gì?"
              className="w-full bg-[#f5f5f5] text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <label
              htmlFor="product-search"
              className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-xl"
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
            <Tooltip infoText="Danh sách yêu thích">
              <div className="flex h-8 w-8 cursor-pointer items-center">
                <img
                  alt="icon"
                  className="max-w-full object-cover"
                  src={HeartIcon}
                />
              </div>
            </Tooltip>
            <Tooltip infoText="Giỏ hàng">
              <div className="relative flex h-7 w-7 cursor-pointer items-center">
                <img
                  alt="icon"
                  className="max-w-full object-cover"
                  src={CartIcon}
                />
                <span className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  1
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
