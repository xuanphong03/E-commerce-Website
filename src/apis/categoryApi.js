import axiosClient from './axiosClient';

const categoryApi = {
  getAll() {
    const url = '/global/categories';
    return axiosClient.get(url);
  },
};

export default categoryApi;
