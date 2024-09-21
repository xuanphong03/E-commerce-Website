import { useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartIcon from '~/assets/icons/cart.svg';
import HeartIcon from '~/assets/icons/heart.svg';
import UserIcon from '~/assets/icons/user.svg';
import Tooltip from '~/components/Tooltip';
import AccountDropdown from './components/Dropdown/AccountDropdown';
import Navigation from './components/Navigation/Navigation';
import SearchBox from './components/Search/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCart } from '~/pages/Cart/cartSlice';
import categoryApi from '~/apis/categoryApi';
import Logo from '~/assets/logo/logo.webp';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const isAuthenticated = !!user.id;
  const totalQuantityCart = useSelector((state) => state.cart.totalQuantity);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const accountDropdownRef = useRef(null);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await categoryApi.getAll();
        const availableCategories = response.filter(({ status }) => status);
        setCategoriesList(availableCategories);
      })();
    } catch (error) {
      throw new Error('Error get categories');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeCart())
        .unwrap()
        .catch((error) => {
          // toast.error(error.message);
        });
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    let handler = (e) => {
      if (isAuthenticated && !accountDropdownRef.current?.contains(e.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleProductMenu = (status) => {
    setOpenProductMenu(status);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-solid border-[#D9D9D9] bg-white">
      <div className="bg-black py-3">
        <div className="relative mx-auto flex w-full max-w-[1300px] items-center justify-center text-[#FAFAFA]">
          <p className="text-xs font-normal leading-normal lg:text-sm">
            Giảm giá mùa hè cho tất cả đồ bơi và giao hàng nhanh miễn phí - GIẢM
            GIÁ 50%!
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
      <div className="mx-auto flex max-w-[1300px] items-center lg:justify-between">
        <div className="flex items-center justify-center py-6">
          <Link className="w-40" to="/">
            <img alt="SOMEHOW" className="max-w-full" src={Logo} />
          </Link>
        </div>
        <Navigation onToggleMenu={handleToggleProductMenu} />
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
                    {totalQuantityCart > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white">
                        {totalQuantityCart >= 100 ? '99+' : totalQuantityCart}
                      </span>
                    )}
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
      <div
        onMouseEnter={() => setOpenProductMenu(false)}
        className={`${openProductMenu ? 'visible opacity-50' : 'invisible opacity-0'} absolute left-0 right-0 top-full z-10 h-screen bg-black`}
      ></div>
      <div
        onMouseEnter={() => setOpenProductMenu(true)}
        onMouseLeave={() => setOpenProductMenu(false)}
        className={`${openProductMenu ? 'h-20' : 'h-0'} absolute left-0 right-0 top-full z-20 flex items-center justify-center overflow-hidden bg-white transition-all`}
      >
        <ul className="mx-auto flex max-w-[1300px] justify-center gap-20 uppercase">
          {categoriesList.map(({ id, name }) => (
            <li
              key={id}
              className="cursor-pointer px-4 py-2 text-[#2c2c2c] transition-colors hover:text-[#DB4444]"
            >
              <Link to={`products/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
