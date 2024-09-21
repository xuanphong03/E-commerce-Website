import axiosClient from './axiosClient';

const orderApi = {
  getAll() {
    const url = `/orders`;
    return axiosClient.get(url);
  },
  getDetail(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
};

export default orderApi;
