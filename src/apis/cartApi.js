import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const cartApi = {
  // getAll(params) {
  //   const url = `/carts/detail-cart`;
  //   return axiosClient.post(
  //     url,
  //     {
  //       params,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
  //       },
  //     },
  //   );
  // },
  getAll(params) {
    const url = `/carts/detail-cart`;
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
  get() {},
  create(data) {
    const url = '/carts/add-details';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  update() {},
  delete() {},
};

export default cartApi;
