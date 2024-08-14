// Redux State management tool
import { configureStore } from '@reduxjs/toolkit';

import userSlice from '~/pages/Auth/userSlice.js';
import cartSlice from '~/pages/Cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});
