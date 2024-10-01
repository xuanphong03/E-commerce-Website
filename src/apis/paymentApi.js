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
  generateVietQR(payload) {
    const url = 'https://api.vietqr.io/v2/generate';
    return axiosClient.post(url, payload);
  },
};

export default paymentApi;
