// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminReducer, {signOutAdmin} from './adminSlice';
import { apiClient } from '../utils/apiClient';
import productReducer from './fetchProductSlice'
import factReducer from './randomFacts'
import userReducer, { signOutUser } from './userSlice'
import shippingReducer from './shippingSlice'
import { sdk } from '../utils/sdk';
// Configure the Redux store
const store = configureStore({
  reducer: {
    admin: adminReducer,
    product:productReducer,
    facts:factReducer,
    user:userReducer,
    shipping:shippingReducer
  },
  // Enabling Redux DevTools if they are available
  devTools: true, // Recommended way to enable DevTools only in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Set up Axios interceptor AFTER creating the store
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch sign-out action to Redux store if 
      //admin tries to access  a restricted page 
      //and their token is expired or any other 401
      if(sdk.getAdminObject()){
        store.dispatch(signOutAdmin());
      }else{
        store.dispatch(signOutUser());
      }
        
      console.log(error.response.config.url)
    }
    return Promise.reject(error);
  }
);

export default store;
