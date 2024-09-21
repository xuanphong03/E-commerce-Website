import axiosClient from './axiosClient';

const cartApi = {
  getAll(params) {
    const url = `/carts/detail-cart`;
    return axiosClient.get(url, {
      params,
    });
  },
  create(data) {
    const url = '/carts/add-details';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = '/carts/update-item-details';
    return axiosClient.post(url, data, {});
  },
  delete(id, data) {
    const url = `/carts/make-empty/${id}`;
    return axiosClient.delete(url, data, {});
  },
};

export default cartApi;
