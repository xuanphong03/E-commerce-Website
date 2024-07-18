import axiosClient from './axiosClient';

const productApi = {
  getAll(params) {
    const path = '/products';
    return axiosClient.get(path, { params });
  },
};

export default productApi;
