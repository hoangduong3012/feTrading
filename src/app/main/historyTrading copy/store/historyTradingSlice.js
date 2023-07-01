import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, HISTORYTRADING_URL, HISTORYTRADINGDETAIL_URL, UPD_HISTORYTRADINGDETAIL_URL } from 'app/constant';
import HistoryTradingService from 'app/service/historyTrading';

export const fetchHistoryTradingList = createAsyncThunk(HISTORYTRADING_URL, async (option) => {
  const response = await HistoryTradingService.getGoldLessions(option);
  return response;
});
export const fetchHistoryTradingDetail = createAsyncThunk(HISTORYTRADINGDETAIL_URL, async (id) => {
  const response = await HistoryTradingService.getGoldLession(id);
  return response;
});
export const updateHistoryTradingDetail = createAsyncThunk(UPD_HISTORYTRADINGDETAIL_URL, async (data) => {
  const response = await HistoryTradingService.update(data);
  return response;
});
const initialState = {
  optionPaging: {
    filters: {},
    pagination: {
      page: 0,
      pageSize: 10,
    },
    sort: {},
    publicationState: true,
  },
  goldLessionList: [],
  goldLession: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const historyTradingSlice = createSlice({
  name: 'historyTrading',
  initialState,
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
        goldLessionList: action.payload.data.goldLessions.data,
        pagination: action.payload.data.goldLessions.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchHistoryTradingList.rejected, (state, action) => {
      return {
        ...state,
        goldLessionList: initialState.goldLessionList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchHistoryTradingDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchHistoryTradingDetail.fulfilled, (state, action) => {
      return {
        ...state,
        goldLession: action.payload.data.goldLession.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchHistoryTradingDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updateHistoryTradingDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updateHistoryTradingDetail.fulfilled, (state, action) => {
      return {
        ...state,
        goldLession: action.payload.data.updateGoldLession.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updateHistoryTradingDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export default historyTradingSlice.reducer;
