// Redux State management tool
import { configureStore } from '@reduxjs/toolkit';

import userSlice from '~/pages/Auth/userSlice.js';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
