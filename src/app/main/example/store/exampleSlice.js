import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, EXAMPLE_URL, EXAMPLEDETAIL_URL, UPD_EXAMPLEDETAIL_URL } from 'app/constant';
import ExampleService from 'app/service/example';

export const fetchExampleList = createAsyncThunk(EXAMPLE_URL, async (option) => {
  const response = await ExampleService.getExamples(option);
  return response;
});
export const fetchExampleDetail = createAsyncThunk(EXAMPLEDETAIL_URL, async (id) => {
  const response = await ExampleService.getExample(id);
  return response;
});
export const updateExampleDetail = createAsyncThunk(UPD_EXAMPLEDETAIL_URL, async (data) => {
  const response = await ExampleService.update(data);
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
  exampleList: [],
  examples: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchExampleList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchExampleList.fulfilled, (state, action) => {
      return {
        ...state,
        exampleList: action.payload.data.exampleTypes.data,
        pagination: action.payload.data.exampleTypes.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchExampleList.rejected, (state, action) => {
      return {
        ...state,
        exampleList: initialState.exampleList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchExampleDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchExampleDetail.fulfilled, (state, action) => {
      return {
        ...state,
        example: action.payload.data.example.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchExampleDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updateExampleDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updateExampleDetail.fulfilled, (state, action) => {
      return {
        ...state,
        example: action.payload.data.updateExample.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updateExampleDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export default exampleSlice.reducer;
