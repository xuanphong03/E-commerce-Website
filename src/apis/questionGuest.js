import axiosClient from './axiosClient';

const questionGuest = {
  postQuestionGuest(data) {
    const url = 'global/qa-create-question-guest';
    return axiosClient.post(url, data);
  },
};

export default questionGuest;
