import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, PLAN_URL, PLANDETAIL_URL, UPD_PLANDETAIL_URL, ADD_PLANDETAIL_URL, ADD_COMMENTDETAIL_URL, DELETEPLAN_URL } from 'app/constant';
import PlanService from 'app/service/plan';
import history from '@history';

export const fetchPlanList = createAsyncThunk(PLAN_URL, async (option) => {
  const response = await PlanService.getPlans(option);
  return response;
});
export const fetchPlanDetail = createAsyncThunk(PLANDETAIL_URL, async (id) => {
  const response = await PlanService.getPlan(id);
  return response;
});
export const deletePlan = createAsyncThunk(DELETEPLAN_URL, async (id, {dispatch}) => {
  const response = await PlanService.deletePlan(id);
  dispatch(fetchPlanList(initialState.optionPaging));
  return response;
});
export const updatePlanDetail = createAsyncThunk(UPD_PLANDETAIL_URL, async (data) => {
  const response = await PlanService.update(data);
  return response;
});
export const addPlan = createAsyncThunk(ADD_PLANDETAIL_URL, async (data) => {
  const response = await PlanService.add(data);
  history.push({
    pathname: '/plan',
  });
  return response;
});
export const addComment = createAsyncThunk(ADD_COMMENTDETAIL_URL, async (data) => {
  const response = await PlanService.addComment(data);
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
  plan: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  loadingDelete:IDEAL,
  error: {},
}
const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    resetPlan:(state) => {return {...state, plan: {}}},
  },
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
    builder.addCase(addComment.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.createComment.data.attributes.plan.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(addComment.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
    builder.addCase(addPlan.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(addPlan.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.createPlan.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(addPlan.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
    builder.addCase(deletePlan.pending, (state, action) => {
      return {
        ...state,
        loadingDelete: 'pending',
      };
    });
    builder.addCase(deletePlan.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.deletePlan.data,
        loadingDelete: 'success',
      };
    });
    builder.addCase(deletePlan.rejected, (state, action) => {
      return {
        ...state,
        loadingDelete: 'error',
      };
    });
  },
});
export const planAction = planSlice.actions;
export default planSlice.reducer;
//