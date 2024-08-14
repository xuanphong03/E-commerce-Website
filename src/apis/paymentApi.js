import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const paymentApi = {
  get(params) {
    const url = '/payments/vn-pay';
    return axiosClient.get(
      url,
      {
        params,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      },
    );
  },
  verify(params) {
    const url = '/payments/vn-pay-callback';
    return axiosClient.get(
      url,
      {
        params,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      },
    );
  },
};

export default paymentApi;
