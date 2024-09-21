import axiosClient from './axiosClient';

const styleApi = {
  getAll() {
    const path = '/admin/styles';
    return axiosClient.get(path);
  },
};

export default styleApi;
