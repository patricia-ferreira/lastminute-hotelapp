import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from '../../types/Hotel';

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

interface HotelsState {
  list: Hotel[];
  status: Status;
  error: string | null;
}

const initialState: HotelsState = {
  list: [],
  status: Status.Idle,
  error: null,
};

// API URL extracted for easier maintenance
const HOTELS_API_URL = 'https://technology.lastminute.com/api/hotel.json';

// Async thunk to fetch hotels with controlled error handling
export const fetchHotels = createAsyncThunk<
  Hotel[],
  void,
  { rejectValue: string }
>(
  'hotels/fetchHotels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(HOTELS_API_URL);
      console.log('response', response)
      if (!response.ok) {
        // Return a custom error message when response is not OK
        return rejectWithValue('Failed to load hotels (invalid response).');
      }
      const data = await response.json();
      return data as Hotel[];
    } catch (error) {
      // Return a custom error message on network failure
      return rejectWithValue('Network error while fetching hotels.');
    }
  }
);

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.status = Status.Succeeded;
        state.list = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.payload || action.error.message || 'Unknown error while fetching hotels.';
      });
  },
});

export default hotelsSlice.reducer;
