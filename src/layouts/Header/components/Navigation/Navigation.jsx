import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useTranslation } from 'react-i18next';
function Navigation({ authenticated }) {
  const { t } = useTranslation('header');

  const NavList = [
    {
      path: '/',
      name: `${t('HOME')}`,
    },
    {
      path: '/contact',
      name: `${t('CONTACT')}`,
    },
    {
      path: '/about',
      name: `${t('ABOUT')}`,
    },
    {
      path: '/sign-up',
      name: `${t('SIGN UP')}`,
    },
  ];

  return (
    <nav className="hidden font-inter lg:block">
      <ul className="flex items-center gap-12">
        {NavList.map((navItem, index) => {
          if (authenticated && navItem.path === '/sign-up') {
            return;
          }
          return (
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
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
