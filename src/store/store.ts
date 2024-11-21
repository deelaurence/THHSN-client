// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    admin: adminReducer, // Add admin reducer here
  },
  // Enabling Redux DevTools if they are available
  devTools: true, // Recommended way to enable DevTools only in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
