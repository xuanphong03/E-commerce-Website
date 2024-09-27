import axiosClient from './axiosClient';

const discountApi = {
  create(data) {
    const url = '/email-sender/get-discount-code';
    return axiosClient.post(url, data);
  },

  confirm(discountCode) {
    const url = `/global/check-discount-sku?sku=${discountCode}`;
    return axiosClient.post(url);
  },
};

export default discountApi;
