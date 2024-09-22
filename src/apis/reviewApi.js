import axios from 'axios';
import axiosClient from './axiosClient';

const reviewApi = {
  getAllReviewComplete(user) {
    const url = `/product/Comments-complete/${user}`;
    return axiosClient.get(url);
  },

  getAllReviewUnfinished(user) {
    const url = `/product/Comments-unfinished/${user}`;
    return axiosClient.get(url);
  },

  createReview(productId, data) {
    const url = `/product/update-comments/${productId}`;
    return axiosClient.put(url, data);
  },

  getAllReviewsByProduct(productName) {
    const url = `/product/${productName}/detail-comments-by-product`;
    return axiosClient.get(url);
  },
};

export default reviewApi;
