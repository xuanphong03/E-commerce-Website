import axiosClient from './axiosClient';

const favoriteApi = {
  getAll(params) {
    const url = '/global/favorite-products';
    return axiosClient.get(url, {
      params,
    });
  },
  add(params) {
    console.log('params: ', params);

    const url = '/global/add-favorite';
    return axiosClient.post(url, {
      params,
    });
  },
  delete(params) {
    const url = '/global/delete-favorite';
    return axiosClient.delete(url, {
      params,
    });
  },
  deleteAll(params) {
    const url = '/delete-all-favorite';
    return axiosClient.delete(url, {
      params,
    });
  },
};

export default favoriteApi;
