// src/store/userSlice.ts
import { UserObject } from '../interfaces/userInterface';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';
const sdk = new Sdk()

interface UserState {
  user: UserObject | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  formErrors:string[];
}


const persistedUser = sdk.getUserObject()


const initialState: UserState = {
  user: persistedUser||null,
  status: 'idle',
  error: null,
  formErrors:[],
};




// Async action for user sign-in
export const signInUser = createAsyncThunk(
    'user/signInUser',
        async (credentials: { email: string; password: string }) => {       
        try {
            const response = await apiClient.post('/v1/auth/login', credentials);
            return response.data;
        } catch (error:any) {
            if(error.response){
              throw error.response.data.reason
            }
            else{
              throw "Failed to connect, Try again"
            }
        }
  }
);

// Async action for user sign-in
export const googleSignIn = createAsyncThunk(
    'user/googleSignIn',
        async () => {       
        try {
            const response = await apiClient.get('/auth/google/onboard');
            return response.data;
        } catch (error:any) {
            if(error.response){
              throw error.response.data.reason
            }
            else{
              throw "Failed to connect, Try again"
            }
        }
  }
);


// Async action for user sign-in
export const registerUser = createAsyncThunk(
    'user/registerUser',
        async (credentials: UserObject) => {       
        try {
            const response = await apiClient.post('/v1/auth/register', credentials);
            return response.data;
        } catch (error:any) {
            if(error.response){
              throw error.response.data.reason
            }
            else{
              throw "Failed to connect, Try again"
            }
        }
  }
);


// Async action for user sign-in
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
        async (credentials: {email:string}) => {       
        try {
            const response = await apiClient.post('/v1/auth/verify-email-password-reset', credentials);
            return response.data;
        } catch (error:any) {
            if(error.response){
              throw error.response.data.reason
            }
            else{
              throw "Failed to connect, Try again"
            }
        }
  }
);
// Async action for user sign-in



// Async action for user sign-in
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
        async (credentials: {email:string,password:string}) => {       
        try {
            const response = await apiClient.post('/v1/auth/update/password', credentials);
            return response.data;
        } catch (error:any) {
            if(error.response){
              throw error.response.data.reason
            }
            else{
              throw "Failed to connect, Try again"
            }
        }
  }
);





const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser(state) {
      state.user = null;
      window.history.pushState({}, '', sdk.userLoginRoute);
      sdk.clearUserObject()
    },
    user_formIsValid(state,action){
        state.formErrors.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<{ payload:UserObject }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.user = payload
        sdk.setUserObject(payload)
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })

      .addCase(googleSignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state, action: PayloadAction<{ payload:{redirect:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        window.location.href=payload.redirect
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })


      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error=''
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })

      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<{ payload:{email:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        console.log(payload)
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })

      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<{ payload:{email:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        console.log(payload)
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })
  },
});

export const { signOutUser,user_formIsValid } = userSlice.actions;
export default userSlice.reducer;
