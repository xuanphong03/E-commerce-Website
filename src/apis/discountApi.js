import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const discountApi = {
  create(data) {
    const url = '/email-sender/get-discount-code';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default discountApi;
