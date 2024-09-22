import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi';
import StorageKeys from '~/constants/storage-key';

// First, create the thunk
export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
    paymentInfo: JSON.parse(localStorage.getItem(StorageKeys.PAYMENT_INFO)) || {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.clear(StorageKeys.TOKEN);
      localStorage.clear(StorageKeys.USER);
      localStorage.clear(StorageKeys.CART);

      state.current = {};
      state.paymentInfo = {};
      state.cart = {
        totalItem: 0,
        totalCost: 0,
        items: [],
      };
    },
    setPaymentInfo: (state, action) => {
      const { name, email, phoneNumber, address } = action.payload;
      state.paymentInfo.name = name;
      state.paymentInfo.email = email;
      state.paymentInfo.phoneNumber = phoneNumber;
      state.paymentInfo.address = address;
      localStorage.setItem(
        StorageKeys.PAYMENT_INFO,
        JSON.stringify(state.paymentInfo),
      );
    },
    updateUserInfo: (state, action) => {
      const prevData = state.current;
      const updatedData = action.payload;
      state.current = { ...prevData, ...updatedData };
      localStorage.setItem(StorageKeys.USER, JSON.stringify(state.current));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export default reducer;
export const { logout, setPaymentInfo, updateUserInfo } = actions;
