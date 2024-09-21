import axiosClient from './axiosClient';

const materialApi = {
  getAll() {
    const path = '/admin/material';
    return axiosClient.get(path);
  },
};

export default materialApi;
