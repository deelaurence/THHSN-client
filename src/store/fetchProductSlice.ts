import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';
import { IProduct } from '../interfaces/productInterface';


const sdk = new Sdk();
const persistedAdmin = sdk.getAdminObject();

/**
 * 
 * Public is the tag for fetching products without being an admin
 * or being authenticated at all
 */


// Define the product state
interface ProductState {
  products: IProduct[];
  categories:string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  productsPublic: IProduct[];
  categoriesPublic:string[]
  statusPublic: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorPublic: string | null;
}

const initialState: ProductState = {
  products: [],
  categories:[],
  status: 'idle',
  error: null,
  productsPublic: [],
  categoriesPublic:[],
  statusPublic: 'idle',
  errorPublic: null,
};

// Async action to get all products by admin
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

// Async action to get all products by admin for public
export const fetchProductsPublic = createAsyncThunk(
  'product/fetchProductsPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/public/products');
      return response.data.payload;
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
        const categories = action.payload.map((product: IProduct) => product.category);
        state.categories = Array.from(new Set(categories));

        //Add 'all' to the filter by category array
        state.categories.unshift('all')
        state.error=''
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })



      .addCase(fetchProductsPublic.pending, (state) => {
        state.statusPublic = 'loading';
      })
      .addCase(fetchProductsPublic.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.statusPublic = 'succeeded';
        state.productsPublic = action.payload;
        const categoriesPublic = action.payload.map((product: IProduct) => product.category);
        state.categoriesPublic = Array.from(new Set(categoriesPublic));

        //Add 'all' to the filter by category array
        state.categoriesPublic.unshift('all')
        state.errorPublic=''
      })
      .addCase(fetchProductsPublic.rejected, (state, action) => {
        state.statusPublic = 'failed';
        state.errorPublic = action.payload as string;
      })

      
  },
});

export default productSlice.reducer;
