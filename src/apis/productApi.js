import axiosClient from './axiosClient';

const productApi = {
  getAll(params) {
    const path = '/global/products';
    return axiosClient.get(path, { params });
  },
  getDetail(params) {
    const path = '/global/detail-product';
    return axiosClient.get(path, { params });
  },
};

export default productApi;
