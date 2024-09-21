import { check } from 'prettier';
import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  checkAccount(data) {
    const url = '/global/check-fp';
    return axiosClient.post(url, data);
  },
  resetAccount(data) {
    const url = '/global/change-fp';
    return axiosClient.patch(url, data);
  },
};

export default userApi;
