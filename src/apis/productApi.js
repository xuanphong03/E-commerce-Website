import axiosClient from './axiosClient';

const productApi = {
  getAll(params) {
    const path = '/products';
    return axiosClient.get(path, { params });
  },

  getDetail(params) {
    const path = '/global/detail-ob';
    return axiosClient.get(path, { params });
  },
};

export default productApi;
