// src/store/adminSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';
const sdk = new Sdk()

interface AdminState {
  admin: { email: string, token: string, name:string}  | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  formErrors:string[];
  productDraftOne?:{
    name?: string,
    category?: string,
    description?: string,
    images?: [],
    _id?: string,
    __v?: number
  }
  addProductPage:0|1|2
}


const persistedAdmin = sdk.getAdminObject()


const initialState: AdminState = {
  admin: persistedAdmin||null,
  status: 'idle',
  error: null,
  formErrors:[],
  productDraftOne:{},
  addProductPage:0
};




// Async action for admin sign-in
export const signInAdmin = createAsyncThunk(
    'admin/signInAdmin',
        async (credentials: { email: string; password: string }) => {       
        try {
            const response = await apiClient.post('/v1/admin/auth/login', credentials);
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


// Async action for adding product name, description, category, quantity and price
export const addProductNameAndPrice = createAsyncThunk(
  'admin/addProductNameAndPrice',
      async (productDetails: { 
          name: string; 
          category:string;
          description:string; 
        }) => {       
      try {
          const headers={
            'content-Type':'application/json',
            'Authorization':`Bearer ${persistedAdmin?.token}`
          }
          const response = await apiClient.post('/v1/admin/manage/product/add', productDetails,{headers});
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

// Async action for adding product name, description, category, quantity and price
export const addProductImage = createAsyncThunk(
  'admin/addProductImage',
      async (images:FileList,{getState}) => {      
        try {
          const state=getState() as any
          const formData = new FormData();
          Array.from(images).forEach((file)=>{
            formData.append('images',file)
          })
          for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
          } 

          const headers={
            'Authorization':`Bearer ${persistedAdmin?.token}`
          }
          const productId=state?.admin.productDraftOne?._id
          const response = await apiClient.put(`/v1/admin/manage/product/image/${productId}`,formData,{headers});
          return response.data;
      } catch (error:any) {

          if(error.response){
            throw error.response.data.reason
          }
          else{
            console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);


export const addProductVariation = createAsyncThunk(
  'admin/addProductVariation',
      async (variations:{},{getState}) => {      
        try {
          const state=getState() as any

          const headers={
            'Authorization':`Bearer ${persistedAdmin?.token}`,
            'content-Type':"application/json"
          }
          const productId=state?.admin.productDraftOne?._id
          const response = await apiClient.put(`/v1/admin/manage/product/variant/${productId}`,variations,{headers});
          return response.data;
      } catch (error:any) {

          if(error.response){
            throw error.response.data.reason
          }
          else{
            console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);




const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signOutAdmin(state) {
      state.admin = null;
      window.location.href=sdk.adminLoginRoute
      sdk.clearAdminObject()
    },
    formIsValid(state,action){
      state.formErrors.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAdmin.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        const {payload} = action.payload
        state.admin = payload
        sdk.setAdminObject(payload)
        window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(signInAdmin.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })


      //ProductNameAndPRIce
      .addCase(addProductNameAndPrice.pending, (state) => {
        state.status = 'loading';
        console.log(state)
      })
      .addCase(addProductNameAndPrice.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        const {payload} = action.payload
        console.log(action)
        state.productDraftOne = payload
        console.log(state.productDraftOne)
        if(state.addProductPage!==undefined){
          state.addProductPage+=1
        }
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(addProductNameAndPrice.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Adding Product name failed';
      })


      //ProductImage
      .addCase(addProductImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductImage.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        const {payload} = action.payload
        state.productDraftOne = payload
        if(state.addProductPage!==undefined){
          state.addProductPage+=1
        }
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(addProductImage.rejected, (state, action) => {
        console.log(action)
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Adding Image Failed';
      })


      //ProductImage
      .addCase(addProductVariation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductVariation.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        // const {payload} = action.payload
        // state.productDraftOne = payload
        if(state.addProductPage!==undefined){
          state.addProductPage+=1
        }
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(addProductVariation.rejected, (state, action) => {
        console.log(action)
        state.status = 'failed';
        console.log(action.error.message)
        state.error = action.error.message || 'Adding Image Failed';
      });
  },
});

export const { signOutAdmin,formIsValid } = adminSlice.actions;
export default adminSlice.reducer;
