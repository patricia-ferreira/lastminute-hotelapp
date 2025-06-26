import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from '../../types/Hotel';
import { haversineDistance } from '../../utils/hotelUtils';
import { cities } from '../../mocks/cities';
import Config from 'react-native-config';

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

// Async thunk to fetch hotels with controlled error handling
export const fetchHotels = createAsyncThunk<
  Hotel[],
  void,
  { rejectValue: string }
>(
  'hotels/fetchHotels',
  async (_, { rejectWithValue }) => {
    try {

      if (!Config.API_BASE_URL) {
        throw new Error('Missing API_BASE_URL in environment configuration.');
      }

      const response = await fetch(`${Config.API_BASE_URL}/hotel.json`);

      if (!response.ok) {
        // Return a custom error message when response is not OK
        return rejectWithValue('Failed to load hotels (invalid response).');
      }

      const rawHotels = (await response.json()) as Hotel[];

      const enhancedHotels: Hotel[] = await Promise.all(
        rawHotels.map(async (hotel) => {
          const city = cities.find(c => c.name === hotel.location.city);
          const distance = city
            ? haversineDistance(
              hotel.location.latitude,
              hotel.location.longitude,
              city.center.latitude,
              city.center.longitude
            )
            : 0;

          return {
            ...hotel,
            distanceToCenter: Math.round(distance * 10) / 10,
          };
        })
      );

      return enhancedHotels;
    } catch (error) {
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
