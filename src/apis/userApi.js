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

  verifyAccount(data) {
    const url = '/global/check-forget-password';
    // return axiosClient.get
  },
  resetAccount(data) {
    const url = '/global/update-forget-password';
    return axiosClient.patch(url, data);
  },
};

export default userApi;
