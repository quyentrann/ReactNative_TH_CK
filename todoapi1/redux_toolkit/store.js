import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Đường dẫn đến file userSlice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
