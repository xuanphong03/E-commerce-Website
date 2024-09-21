import axios from 'axios';
import { API_ROOT } from '~/constants/api-root';
import StorageKeys from '~/constants/storage-key';

const axiosClient = axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.getItem(StorageKeys.TOKEN)) {
      const accessToken = localStorage.getItem(StorageKeys.TOKEN);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const { status } = error.response;

    // if (status === 403) {
    //   localStorage.removeItem(StorageKeys.USER);
    //   localStorage.removeItem(StorageKeys.TOKEN);
    //   if (window.confirm('Đã có lỗi xảy ra. Vui lòng tải lại trang')) {
    //     location.reload();
    //   }
    // }
    return Promise.reject(error);
  },
);

export default axiosClient;
