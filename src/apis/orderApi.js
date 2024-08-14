import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const orderApi = {
  getAll(id) {
    const url = `/orders`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  getDetail(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  create(data) {
    const url = '/orders';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default orderApi;
