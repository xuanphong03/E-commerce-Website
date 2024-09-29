/* eslint-disable no-misleading-character-class */
export const regex = {
  phoneNumber: /^(0[3|5|7|8|9])+([0-9]{8})$/,
  // eslint-disable-next-line no-useless-escape
  invalidName: /[0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_`{|}~]/,
};
