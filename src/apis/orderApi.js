import axiosClient from './axiosClient';

const orderApi = {
  getAll(id) {
    const url = `/orders/user/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
};

export default orderApi;
