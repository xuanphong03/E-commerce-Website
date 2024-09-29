import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onToggleMenu }) {
  return (
    <nav className="h-full">
      <ul className="flex items-center gap-10">
        <li className="flex h-20 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
            }
          >
            Trang chủ
          </NavLink>
        </li>

        <li className="flex h-20 items-center">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
            }
          >
            Liên hệ
          </NavLink>
        </li>

        <li className="flex h-20 items-center">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
            }
          >
            Giới thiệu
          </NavLink>
        </li>

        <li
          onMouseLeave={() => onToggleMenu(false)}
          onMouseEnter={() => onToggleMenu(true)}
          className="relative flex h-20 items-center"
        >
          <NavLink
            to="/products/all_products"
            className={({ isActive }) =>
              `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
            }
          >
            Sản phẩm
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
