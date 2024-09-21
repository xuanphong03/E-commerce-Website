import axiosClient from './axiosClient';

const discountApi = {
  create(data) {
    const url = '/email-sender/get-discount-code';
    return axiosClient.post(url, data);
  },
};

export default discountApi;
