import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import cartApi from '~/apis/cartApi';

// Thunk để gọi API và khởi tạo cart
export const initializeCart = createAsyncThunk(
  'cart/initialize',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); // Lấy toàn bộ state từ Redux store
    const user = state.user.current; // Truy cập thông tin người dùng
    if (!user || !user.id) {
      throw new Error('Người dùng chưa đăng nhập');
    }
    try {
      const response = await cartApi.getAll({ user_id: user.id }); // Gọi API để lấy dữ liệu giỏ hàng
      const { cart_items } = response;
      // Tính tổng số lượng sản phẩm trong giỏ hàng
      const totalQuantity = cart_items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      // Trả về dữ liệu cần thiết để cập nhật state
      return {
        totalQuantity,
        items: cart_items,
      };
    } catch (error) {
      throw new Error('Không thể lấy dữ liệu giỏ hàng');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0,
    items: [],
    status: 'idle',
  },
  reducers: {
    addToCart: (state, action) => {
      state.totalQuantity += action.payload.quantity;
      // Thêm logic khác nếu cần (ví dụ: cập nhật danh sách items)
    },
    updateCart: (state, action) => {
      state.totalQuantity = action.payload.quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.totalQuantity = action.payload.totalQuantity;
        state.items = action.payload.items;
        state.status = 'succeeded';
      })
      .addCase(initializeCart.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.error.message); // Log lỗi để debug
      });
  },
});

export const { addToCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
