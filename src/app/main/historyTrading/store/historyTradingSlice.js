import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, HISTORYTRADING_URL } from 'app/constant';
import HistoryTradingService from 'app/api/historyTradingService';

export const fetchHistoryTradingList = createAsyncThunk(HISTORYTRADING_URL, async () => {
  const response = await HistoryTradingService.getList();
  return response;
});

const historyTradingSlice = createSlice({
  name: 'historyTrading',
  initialState: {
    goldLessionList: [],
    meta: {},
    loading: IDEAL,
    error: {},
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
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchHistoryTradingList.fulfilled, (state, action) => {
      return {
        ...state,
        goldLessionList: action.payload.data,
        meta: action.payload.meta,
        loading: 'success',
      };
    });
    builder.addCase(fetchHistoryTradingList.rejected, (state, action) => {
      return {
        ...state,
        goldLessionList: action.payload.data,
        meta: action.payload.meta,
        loading: 'error',
      };
    });
  },
});

export default historyTradingSlice.reducer;
