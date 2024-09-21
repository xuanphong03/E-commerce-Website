/* eslint-disable no-misleading-character-class */
export const regex = {
  phoneNumber:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  // eslint-disable-next-line no-useless-escape
  invalidName: /[0-9!"#$%&'()*+,\-.:;<=>?@[\\\]^_`{|}~]/,
};
