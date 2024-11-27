


import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Define the randomFacts state
interface ProductState {
  facts: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  facts: '',
  status: 'idle',
  error: null,
};

// Async action to get all products
export const fetchFacts = createAsyncThunk(
  'product/fetchFacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      return response.data.text;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect, Try again');
    }
  }
);

// Product slice definition
const randomFactsSlice = createSlice({
  name: 'randomFacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.facts = action.payload;
      })
      .addCase(fetchFacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      
  },
});

export default randomFactsSlice.reducer;
