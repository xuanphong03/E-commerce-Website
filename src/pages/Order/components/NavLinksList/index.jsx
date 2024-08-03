import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

NavLinksList.propTypes = {
  data: PropTypes.array.isRequired,
};

function NavLinksList({ data }) {
  return (
    <ul className="flex justify-between">
      {data.map((navLink, _id) => (
        <li className="flex-1" key={_id}>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'bg-[#DB4444] text-[#FAFAFA]' : ''} flex w-full items-center justify-center px-5 py-2 text-sm`
            }
            to={navLink.path}
            end
          >
            {navLink.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinksList;
