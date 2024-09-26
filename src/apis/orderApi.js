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
    const url = `/orders/user/classify`;
    const params = { userId, paymentStatus };
    return axiosClient.get(url, { params });
  },

  getOrderListByOrderStatus(userId, orderStatus) {
    const params = { userId, orderStatus };
    const url = `orders/user/classify`;
    return axiosClient.get(url, { params });
  },

  cancelOrder(orderId) {
    const url = `/orders/canceled-order/${orderId}`;
    return axiosClient.put(url, {});
  },
};

export default orderApi;
