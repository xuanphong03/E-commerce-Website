import { NavLink } from 'react-router-dom';
import './Navigation.css';

const NavList = [
  {
    path: '/',
    name: 'Trang chủ',
  },
  {
    path: '/contact',
    name: 'Liên hệ',
  },
  {
    path: '/about',
    name: 'Giới thiệu',
  },
  {
    path: '/sign-up',
    name: 'Đăng ký',
  },
];

function Navigation() {
  return (
    <nav className="hidden font-poppins lg:block">
      <ul className="flex items-center gap-12">
        {NavList.map((navItem, index) => (
          <li key={index} className="relative">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'active' : ''} nav-link block py-1 text-center text-sm font-normal leading-normal transition-colors lg:text-base`
              }
              to={navItem.path}
            >
              {navItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
