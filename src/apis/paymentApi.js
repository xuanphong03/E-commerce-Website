import axiosClient from './axiosClient';

const paymentApi = {
  get(params) {
    const url = '/payments/vn-pay';
    return axiosClient.get(url, {
      params,
    });
  },
  verify(params) {
    const url = '/payments/vn-pay-callback';
    return axiosClient.get(url, {
      params,
    });
  },
};

export default paymentApi;
