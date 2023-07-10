import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, PRACTICE_URL, PRACTICEDETAIL_URL, UPD_PRACTICEDETAIL_URL } from 'app/constant';
import PlanService from 'app/service/plan';

export const fetchPlanList = createAsyncThunk(PRACTICE_URL, async (option) => {
  const response = await PlanService.getPlans(option);
  return response;
});
export const fetchPlanDetail = createAsyncThunk(PRACTICEDETAIL_URL, async (id) => {
  const response = await PlanService.getPlan(id);
  return response;
});
export const updatePlanDetail = createAsyncThunk(UPD_PRACTICEDETAIL_URL, async (data) => {
  const response = await PlanService.update(data);
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
  planList: [],
  plans: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const planSlice = createSlice({
  name: 'plan',
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
    builder.addCase(fetchPlanList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchPlanList.fulfilled, (state, action) => {
      return {
        ...state,
        planList: action.payload.data.plans.data,
        pagination: action.payload.data.plans.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchPlanList.rejected, (state, action) => {
      return {
        ...state,
        planList: initialState.planList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchPlanDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchPlanDetail.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.plan.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchPlanDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updatePlanDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updatePlanDetail.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.updatePlan.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updatePlanDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export default planSlice.reducer;
