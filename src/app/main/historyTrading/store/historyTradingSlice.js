import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, HISTORYTRADING_URL } from 'app/constant'
import HistoryTradingService from 'app/api/historyTradingService'
export const fetchHistoryTradingList = createAsyncThunk(
  HISTORYTRADING_URL, 
  async () => {
     const response = await HistoryTradingService.getList()
     return response.data
  });

const historyTradingSlice = createSlice({
  name: 'historyTrading',
  initialState: {
    goldLessionList:[],
    loading: IDEAL,
    error: {}
  },
  reducers: {
    openDialog: (state, action) => {
      state.state = true;
      state.options = action.payload;
    },
    closeDialog: (state, action) => {
      state.state = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistoryTradingList.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(fetchHistoryTradingList.fulfilled, (state, action) => {
      state.loading = 'success';
      state.goldLessionList.push(action.payload)
    })
    builder.addCase(fetchHistoryTradingList.rejected, (state, action) => {
      state.loading = 'error'
      state.error = action.error
    })
  }
});

export default historyTradingSlice.reducer;
