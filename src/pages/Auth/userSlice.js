import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi';
import StorageKeys from '~/constants/storage-key';

// First, create the thunk
export const register = createAsyncThunk('user/register', async (payload) => {
  console.log('register payload', payload);
  const data = await userApi.register(payload);
  console.log('response data', data);

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
    cart: JSON.parse(localStorage.getItem(StorageKeys.CART)) || {
      totalItem: 0,
      totalCost: 0,
      items: [],
    },
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.clear(StorageKeys.TOKEN);
      localStorage.clear(StorageKeys.USER);
      localStorage.clear(StorageKeys.CART);

      state.current = {};
      state.cart = {
        totalItem: 0,
        totalCost: 0,
        items: [],
      };
    },
    addProductToCart(state, action) {
      const product = action.payload;
      let addedQuantity = 1;
      if (product) {
        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const existingItem = state.cart.items.find(
          (item) => item.name === product.name,
        );

        if (existingItem) {
          // Nếu sản phẩm đã tồn tại, chỉ cần tăng số lượng và giá tiền
          existingItem.count += addedQuantity;
          existingItem.totalPrice += product.finalPrice * addedQuantity;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
          const newItem = {
            count: addedQuantity,
            id: product.id,
            name: product.name,
            imgURL: product.image,
            unitPrice: product.finalPrice,
            totalPrice: product.finalPrice,
          };
          state.cart.items.push(newItem);
        }
        state.cart.totalItem += addedQuantity;
        state.cart.totalCost += product.finalPrice * addedQuantity;

        // Lưu vào localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
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
export const { logout, addProductToCart } = actions;
