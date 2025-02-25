import { useCallback, useEffect, useState } from 'react';
import { FaShieldAlt, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '~/apis/userApi';
import InfoUserManagement from './pages/InfoUserManagement';
import PasswordManagement from './pages/PasswordManagement';
import { updateUserInfo } from '../Auth/userSlice';

AccountManagement.propTypes = {};

function AccountManagement() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useCallback(async () => {
    try {
      const response = await userApi.getInfo();
      setUserInfo(response);
    } catch (error) {
      throw new Error('Failed to get user info');
    }
  }, []);

  const handleChangePassword = useCallback(
    async (data) => {
      try {
        const { status } = await userApi.changePassword(data);
        // Đổi mật khẩu thành công
        if (status === 1) {
          toast.success('Đổi mật khẩu thành công.');
          await getUserInfo(); // Gọi getUserInfo sau khi đổi mật khẩu thành công
        } else if (status === 0) {
          toast.error('Đổi mật khẩu thất bại.');
        }
      } catch (error) {
        throw new Error('Failed to change password');
      }
    },
    [getUserInfo],
  );

  const handleChangeInformation = useCallback(
    async (data) => {
      try {
        const { status } = await userApi.updateInfo(data);
        if (status === 1) {
          dispatch(updateUserInfo(data));
          toast.success('Thay đổi thông tin thành công');
          await getUserInfo(); // Gọi getUserInfo sau khi thay đổi thông tin thành công
        }
      } catch (error) {
        throw new Error('Failed to update user info');
      }
    },
    [dispatch, getUserInfo],
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <main className="grid min-h-[calc(100vh-128px)] grid-cols-10">
      <aside className="col-span-2 flex flex-col gap-4 border-r border-solid border-[#d9d9d9] pt-5">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'text-red-500' : ''} flex items-center justify-center gap-3 py-2 text-center transition-colors hover:text-red-500`
          }
          to="/account/information"
        >
          <FaUser className="text-2xl" /> Thông tin cá nhân
        </NavLink>
        <hr />
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'text-red-500' : ''} flex items-center justify-center gap-3 py-2 text-center transition-colors hover:text-red-500`
          }
          to="/account/password"
        >
          <FaShieldAlt className="text-2xl" /> Thay đổi mật khẩu
        </NavLink>
        <hr />
      </aside>
      <div className="col-span-8 px-10 py-10">
        <Routes>
          <Route
            path="/information"
            element={
              <InfoUserManagement
                userInfo={userInfo}
                onSubmit={handleChangeInformation}
              />
            }
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
