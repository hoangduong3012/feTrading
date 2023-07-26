import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, SYMBOL_URL, SYMBOLDETAIL_URL, UPD_SYMBOLDETAIL_URL } from 'app/constant';
import SymbolService from 'app/service/symbol';

export const fetchSymbolList = createAsyncThunk(SYMBOL_URL, async (option) => {
  const response = await SymbolService.getSymbols(option);
  return response;
});
export const fetchSymbolDetail = createAsyncThunk(SYMBOLDETAIL_URL, async (id) => {
  const response = await SymbolService.getSymbol(id);
  return response;
});
export const updateSymbolDetail = createAsyncThunk(UPD_SYMBOLDETAIL_URL, async (data) => {
  const response = await SymbolService.update(data);
  return response;
});
const initialState = {
  optionPaging: {
    filters: {},
    pagination: {
      page: 0,
      pageSize: 100,
    },
    sort: {},
    publicationState: true,
  },
  symbolList: [],
  symbols: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    resetSymbol:(state) => {return {...state, symbol: {}}},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSymbolList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchSymbolList.fulfilled, (state, action) => {
      return {
        ...state,
        symbolList: action.payload.data.symbols.data,
        pagination: action.payload.data.symbols.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchSymbolList.rejected, (state, action) => {
      return {
        ...state,
        symbolList: initialState.symbolList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchSymbolDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchSymbolDetail.fulfilled, (state, action) => {
      return {
        ...state,
        symbol: action.payload.data.symbol.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchSymbolDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updateSymbolDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updateSymbolDetail.fulfilled, (state, action) => {
      return {
        ...state,
        symbol: action.payload.data.updateSymbol.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updateSymbolDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export const symbolAction = symbolSlice.actions;
export default symbolSlice.reducer;
