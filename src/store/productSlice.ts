import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';
import { IProduct } from '../interfaces/productInterface';


const sdk = new Sdk();
const persistedAdmin = sdk.getAdminObject();

// Define the product state
interface ProductState {
  products: IProduct[];
  productDetails: any | null;
  categories:string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories:[],
  productDetails: null,
  status: 'idle',
  error: null,
};

// Async action to get all products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const headers = {
        'Authorization': `Bearer ${persistedAdmin?.token}`,
      };
      const response = await apiClient.get('/v1/admin/manage/products', { headers });
      return response.data.payload;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
    }
  }
);

// Async action to get product details by ID
export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string, { rejectWithValue }) => {
    try {
      const headers = {
        'Authorization': `Bearer ${persistedAdmin?.token}`,
      };
      const response = await apiClient.get(`/v1/admin/manage/product/${productId}`, { headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
    }
  }
);

// Async action to delete a product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const headers = {
        'Authorization': `Bearer ${persistedAdmin?.token}`,
      };
      const response = await apiClient.delete(`/v1/admin/manage/product/${productId}`, { headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
    }
  }
);

// Product slice definition
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.categories = action.payload.map((product:IProduct)=>{
            return product.category
        })
        //Add 'all' to the filter by category array
        state.categories.unshift('all')
        state.error=''

        
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
        
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ productId: string }>) => {
        state.status = 'succeeded';
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
