import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, PRACTICE_URL, PRACTICEDETAIL_URL, UPD_PRACTICEDETAIL_URL } from 'app/constant';
import PracticeService from 'app/service/practice';

export const fetchPracticeList = createAsyncThunk(PRACTICE_URL, async (option) => {
  const response = await PracticeService.getPractices(option);
  return response;
});
export const fetchPracticeDetail = createAsyncThunk(PRACTICEDETAIL_URL, async (id) => {
  const response = await PracticeService.getPractice(id);
  return response;
});
export const updatePracticeDetail = createAsyncThunk(UPD_PRACTICEDETAIL_URL, async (data) => {
  const response = await PracticeService.update(data);
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
  practiceList: [],
  practices: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  // reducers: {
  //   openDialog: (state, action) => {
  //     state.state = true;
  //     state.options = action.payload;
  //   },
  //   closeDialog: (state, action) => {
  //     state.state = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPracticeList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchPracticeList.fulfilled, (state, action) => {
      return {
        ...state,
        practiceList: action.payload.data.practices.data,
        pagination: action.payload.data.practices.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchPracticeList.rejected, (state, action) => {
      return {
        ...state,
        practiceList: initialState.practiceList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchPracticeDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchPracticeDetail.fulfilled, (state, action) => {
      return {
        ...state,
        practice: action.payload.data.practice.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchPracticeDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updatePracticeDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updatePracticeDetail.fulfilled, (state, action) => {
      return {
        ...state,
        practice: action.payload.data.updatePractice.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updatePracticeDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export default practiceSlice.reducer;
