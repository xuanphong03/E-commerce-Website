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

  getOrderListByPaymentStatus(userId, paymentStatus) {
    const url = `/orders/user/classify?userId=${userId}&orderStatus=${paymentStatus}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
