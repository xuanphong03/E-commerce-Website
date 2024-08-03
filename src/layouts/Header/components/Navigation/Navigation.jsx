import { NavLink } from 'react-router-dom';
import './Navigation.css';
function Navigation() {
  return (
    <nav className="flex items-center gap-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
        }
      >
        Trang chủ
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
        }
      >
        Liên hệ
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
        }
      >
        Giới thiệu
      </NavLink>

      <NavLink
        to="/products/all_products"
        className={({ isActive }) =>
          `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
        }
      >
        Sản phẩm
      </NavLink>
    </nav>
  );
}

export default Navigation;
