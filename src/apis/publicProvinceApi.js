import axiosClient from './axiosClient';

const publicProvinceApi = {
  getProvinces() {
    const url = 'https://vapi.vnappmob.com/api/province/';
    return axiosClient.get(url);
  },
  getDistricts(province_id) {
    const url = `https://vapi.vnappmob.com/api/province/district/${province_id}`;
    return axiosClient.get(url);
  },
  getWards(district_id) {
    const url = `https://vapi.vnappmob.com/api/province/ward/${district_id}`;
    return axiosClient.get(url);
  },
};

export default publicProvinceApi;
