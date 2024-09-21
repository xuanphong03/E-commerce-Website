import axiosClient from './axiosClient';

const styleApi = {
  getAll() {
    const path = '/global/styles';
    return axiosClient.get(path);
  },
};

export default styleApi;
