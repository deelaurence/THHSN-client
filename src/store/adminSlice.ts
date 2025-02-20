// src/store/adminSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';
import { Order } from '../interfaces/order';
const sdk = new Sdk()

interface AdminState {
  admin: { email: string, token: string, name:string}  | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  users:{name:(string|null),lastName:(string|null),firstName:(string|null),verified:boolean,phoneNumber:(string|null),country:(string|null),address:(string|null),city:(string|null),email:string}[];
  successFeedback:string|null;
  orders:Order[];
  editingProduct:boolean;
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




const initialState: AdminState = {
  admin: sdk.getAdminObject()||null,
  status: 'idle',
  users:[],
  orders:[],
  successFeedback:null,
  editingProduct:false,
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
        },{getState}) => {       
      try {
          const headers={
            'content-Type':'application/json',
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          const state = getState() as any
          
          let response;
          //Togglr between editing and adding new name and description
          if (state.admin.editingProduct){
            response = await apiClient.put(`/v1/admin/manage/product/name-and-description/${sdk.getSingleProductDetail()._id}`, productDetails,{headers});
          }
          else{
            response = await apiClient.post('/v1/admin/manage/product/add', productDetails,{headers});
          } 
          return response.data;
      } catch (error:any) {
          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);


export const editTrackingStatus = createAsyncThunk(
  'admin/editTrackingStatus',
      async (trackingDetails: { 
          reference: string; 
          deliveryStatus?:string;
          deliveryMessage?:string; 
        }) => {       
      try {
          const headers={
            'content-Type':'application/json',
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          
          let response = await apiClient.post('/v1/payment/shipping-status', trackingDetails,{headers});
          return response.data;
      } catch (error:any) {
          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
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
            //console.log(pair[0] + ':', pair[1]);
          } 

          const headers={
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          const productId=state?.admin.productDraftOne?._id
          const response = await apiClient.put(`/v1/admin/manage/product/image/${productId}`,formData,{headers});
          return response.data;
      } catch (error:any) {

          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);
// Async action for deleting product
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
      async (productId:string,{}) => {      
        try {
          
          const headers={
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          const response = await apiClient.delete(`/v1/admin/manage/products/${productId}`,{headers});
          return response.data;
      } catch (error:any) {

          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
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
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`,
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
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);


export const updateExchangeRate = createAsyncThunk(
  'admin/updateExchangeRate',
      async (exchangeRateBody:{},{}) => {      
        try {
          
          const headers={
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`,
            'content-Type':"application/json"
          }
          
          const response = await apiClient.put(`/v1/admin/manage/exchange-rate/update`,exchangeRateBody,{headers});
          return response.data;
      } catch (error:any) {

          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);

// Async action for adding bestseller and new arrival
export const addBestsellerAndNewArrival = createAsyncThunk(
  'admin/addBestsellerAndNewArrival',
      async (productDetails: { 
          bestSeller:boolean;
          newArrival:boolean
        },{}) => {       
        try {

          
          const productId=sdk.getSingleProductDetail()._id
          const headers={
            'content-Type':'application/json',
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          let response = await apiClient.put(`/v1/admin/manage/product/bestseller-newarrival/${productId}`, productDetails,{headers});
          return response.data;
      } catch (error:any) {
          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);

//add a cover image to the bestseller and newArrival
export const bestsellerAndNewArrivalCoverimage = createAsyncThunk(
  'admin/bestsellerAndNewArrivalCoverimage',
      async (productDetails: { 
          coverImage:string
        },{}) => {       
        try {          
          const productId=sdk.getSingleProductDetail()._id
          const headers={
            'content-Type':'application/json',
            'Authorization':`Bearer ${sdk.getAdminObject()?.token}`
          }
          let response = await apiClient.put(`/v1/admin/manage/product/bestseller-newarrival-coverimage/${productId}`, productDetails,{headers});
          return response.data;
      } catch (error:any) {
          if(error.response){
            throw error.response.data.reason
          }
          else{
            //console.log(error)
            throw "Failed to connect, Try again"
          }
      }
}
);


// Async action to get all users by admin
export const fetchUsers = createAsyncThunk(
  'product/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = {
        'Authorization': `Bearer ${sdk.getAdminObject()?.token}`,
      };
      const response = await apiClient.get('/v1/profile/fetch/all', { headers });
      return response.data.payload;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
    }
  }
);



// Async action to get all orders by admin
export const fetchPayments = createAsyncThunk(
  'product/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      
      const headers = {
        'Authorization': `Bearer ${sdk.getAdminObject()?.token}`,
      };
      const response = await apiClient.get('/v1/payment/all', { headers });
      return response.data.payload;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
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
      if(state.formErrors.length>2){
        state.formErrors.shift()
      }
    },
    setEditProductMode(state,action){
      state.editingProduct=action.payload
      state.addProductPage=0
    },
    jumpToProductPage(state,action){
      state.addProductPage=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAdmin.fulfilled, (state, action: PayloadAction<{ message:string,payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.admin = payload
        sdk.setAdminObject(payload)
        state.successFeedback=action.payload.message
        window.history.pushState({}, '', sdk.adminDashboardRoute);  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(signInAdmin.rejected, (state, action) => {
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Sign-in failed';
      })


      //ProductNameAndPRIce
      .addCase(addProductNameAndPrice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductNameAndPrice.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string}, message:string }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.productDraftOne = payload
        if(state.addProductPage!==undefined){
          state.addProductPage+=1
        }
        state.successFeedback=action.payload.message
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(addProductNameAndPrice.rejected, (state, action) => {
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Product name failed';
      })

      //TrackingStatus
      .addCase(editTrackingStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTrackingStatus.fulfilled, (state, action: PayloadAction<{ payload:{}, message:string }>) => {
        state.status = 'succeeded';
        state.error=''
        state.successFeedback=action.payload.message
      })
      .addCase(editTrackingStatus.rejected, (state, action) => {
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Editing status failed';
      })

      //ProductImage
      .addCase(addProductImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductImage.fulfilled, (state, action: PayloadAction<{ payload:{ email: string, name:string, token:string} ,message:string }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.productDraftOne = payload
        if(state.addProductPage!==undefined){
          state.addProductPage+=1
        }
        state.successFeedback=action.payload.message
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(addProductImage.rejected, (state, action) => {
        //console.log(action)
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Image Failed';
      })

      //Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ payload:{ } ,message:string }>) => {
        state.status = 'succeeded';
        state.error=''
        state.successFeedback=action.payload.message
        // window.location.href=sdk.adminDashboardRoute  // Redirect to admin dashboard after successful sign-in. Replace with your dashboard route.
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        //console.log(action)
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Image Failed';
      })



      //ProductVariation
      .addCase(addProductVariation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductVariation.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.error=''
        // const {payload} = action.payload
        // state.productDraftOne = payload
        state.successFeedback=action.payload.message
        if(state.addProductPage!==undefined){
          state.addProductPage=0
        }
        // window.location.href=sdk.manageInventoryRoute 
      })
      .addCase(addProductVariation.rejected, (state, action) => {
        //console.log(action)
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Image Failed';
      })



      //Update exchange rate
      .addCase(updateExchangeRate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExchangeRate.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.successFeedback=action.payload.message
      })
      .addCase(updateExchangeRate.rejected, (state, action) => {
        //console.log(action)
        state.status = 'failed';
        state.error = action.error.message || 'Adding Image Failed';
      })
      


      //BestSellerAndNewArrival
      .addCase(addBestsellerAndNewArrival.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBestsellerAndNewArrival.fulfilled, (state, action: PayloadAction<{ message:string,payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.productDraftOne = payload
        state.successFeedback=action.payload.message
      })
      .addCase(addBestsellerAndNewArrival.rejected, (state, action) => {
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Product name failed';
      })




      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.successFeedback="Fetched Users"
        state.error=''
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })




      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        state.successFeedback="Fetched Orders"
        state.error=''
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      


      //BestSellerAndNewArrival
      .addCase(bestsellerAndNewArrivalCoverimage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bestsellerAndNewArrivalCoverimage.fulfilled, (state, action: PayloadAction<{ message:string,payload:{ email: string, name:string, token:string} }>) => {
        state.status = 'succeeded';
        state.error=''
        const {payload} = action.payload
        state.successFeedback=action.payload.message
        state.productDraftOne = payload
      })
      .addCase(bestsellerAndNewArrivalCoverimage.rejected, (state, action) => {
        state.status = 'failed';
        //console.log(action.error.message)
        state.error = action.error.message || 'Adding Product name failed';
      })
  },
});

export const { signOutAdmin,jumpToProductPage,formIsValid,setEditProductMode } = adminSlice.actions;
export default adminSlice.reducer;
