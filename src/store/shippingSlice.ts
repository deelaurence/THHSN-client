import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';
import { Sdk } from '../utils/sdk';

const sdk = new Sdk();

// Define the state for shipping
interface ShippingState {
  shippingOptions: { _id: string; location: string; price: number; }[];
  availableShippingOptions: { _id: string; location: string; price: number; }[];
  selectedOption: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  successFeedback: string | null;
}

const initialState: ShippingState = {
  shippingOptions: [],
  availableShippingOptions: [],
  selectedOption: null,
  status: 'idle',
  error: null,
  successFeedback: null,
};

// Async action to fetch shipping options
export const fetchShippingOptions = createAsyncThunk(
  'shipping/fetchShippingOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/shipping', {
        headers: { Authorization: `Bearer ${sdk.getAdminObject()?.token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect. Try again.');
    }
  }
);
// Async action to fetch shipping options
export const fetchAvailableShippingOptions = createAsyncThunk(
  'shipping/fetchAvailableShippingOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/v1/shipping/available', {
        headers: { },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect. Try again.');
    }
  }
);

// Async action to select a shipping option
export const selectShippingOption = createAsyncThunk(
  'shipping/selectShippingOption',
  async (optionId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/v1/shipping/select`,
        { optionId },
        {
          headers: { Authorization: `Bearer ${sdk.getAdminObject()?.token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect. Try again.');
    }
  }
);

// Async action to update a shipping option
export const updateShippingOption = createAsyncThunk(
  'shipping/updateShippingOption',
  async (
    { type, states, price }: { type: 'local' | 'international'; states?: { name: string; price: number }[]; price?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(
        '/v1/shipping',
        { type, states, price },
        {
          headers: { Authorization: `Bearer ${sdk.getAdminObject()?.token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.reason);
      }
      return rejectWithValue('Failed to connect. Try again.');
    }
  }
);
// Async action to create a new shipping option
export const createShippingOption = createAsyncThunk(
    'shipping/createShippingOption',
    async (
        {  states }: { states: { location: string; price: number }[] },
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post(
                '/v1/shipping/create',
                {  states },
                {
                    headers: { Authorization: `Bearer ${sdk.getAdminObject()?.token}` },
                }
            );

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.reason);
            }
            return rejectWithValue('Failed to connect. Try again.');
        }
    }
);

// Create the shipping slice
const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    clearShippingError(state) {
      state.error = null;
    },
    resetShippingState(state) {
      state.shippingOptions = [];
      state.selectedOption = null;
      state.status = 'idle';
      state.error = null;
      state.successFeedback = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShippingOptions.fulfilled, (state, action: {payload:PayloadAction<any[]>}) => {
        state.status = 'succeeded';
        state.successFeedback = "Fetched Shipping Details";
        state.shippingOptions = action.payload.payload;
        state.error = null;
      })
      .addCase(fetchShippingOptions.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchAvailableShippingOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailableShippingOptions.fulfilled, (state, action: {payload:PayloadAction<any[]>}) => {
        state.status = 'succeeded';
        state.successFeedback = "Fetched Shipping Details";
        state.availableShippingOptions = action.payload.payload;
        state.error = null;
      })
      .addCase(fetchAvailableShippingOptions.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createShippingOption.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createShippingOption.fulfilled, (state, action: {payload:PayloadAction<any[]>})=> {
        state.status = 'succeeded';
        state.shippingOptions = action.payload.payload;
        state.successFeedback="Updated Shipping details"
        state.error = null;
      })
      .addCase(createShippingOption.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(selectShippingOption.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectShippingOption.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'succeeded';
        state.successFeedback = action.payload.message;
        state.error = null;
      })
      .addCase(selectShippingOption.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateShippingOption.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShippingOption.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'succeeded';
        state.successFeedback = action.payload.message;
        state.error = null;
      })
      .addCase(updateShippingOption.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearShippingError, resetShippingState } = shippingSlice.actions;

// Export reducer
export default shippingSlice.reducer;
