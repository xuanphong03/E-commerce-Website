import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import InfoUserManagement from './pages/InfoUserManagement';
import PasswordManagement from './pages/PasswordManagement';

AccountManagement.propTypes = {};

function AccountManagement(props) {
  const handleChangePassword = (data) => {
    console.log(data);
  };
  const handleChangeInformation = (data) => {
    console.log(data);
  };

  return (
    <main className="grid h-[calc(100vh-128px)] grid-cols-10">
      <aside className="col-span-2 flex flex-col gap-4 border-r border-solid border-[#d9d9d9] pt-5">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'text-red-500' : ''} py-1 text-center transition-colors hover:text-red-500`
          }
          to="/account/information"
        >
          Thông tin cá nhân
        </NavLink>
        <hr></hr>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'text-red-500' : ''} py-1 text-center transition-colors hover:text-red-500`
          }
          to="/account/password"
        >
          Thay đổi mật khẩu
        </NavLink>
        <hr></hr>
      </aside>
      <div className="col-span-8 px-10 py-10">
        <Routes>
          <Route
            path="/information"
            element={<InfoUserManagement onSubmit={handleChangeInformation} />}
          />
          <Route
            path="/password"
            element={<PasswordManagement onSubmit={handleChangePassword} />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default AccountManagement;
