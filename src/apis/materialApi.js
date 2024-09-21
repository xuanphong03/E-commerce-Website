import axiosClient from './axiosClient';

const materialApi = {
  getAll() {
    const path = '/global/material';
    return axiosClient.get(path);
  },
};

export default materialApi;
