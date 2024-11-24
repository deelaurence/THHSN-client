// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminReducer, {signOutAdmin} from './adminSlice';
import { apiClient } from '../utils/apiClient';
import productReducer from './productSlice'
// Configure the Redux store
const store = configureStore({
  reducer: {
    admin: adminReducer,
    product:productReducer
  },
  // Enabling Redux DevTools if they are available
  devTools: true, // Recommended way to enable DevTools only in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Set up Axios interceptor AFTER creating the store
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch sign-out action to Redux store
      store.dispatch(signOutAdmin());
    }
    return Promise.reject(error);
  }
);

export default store;
