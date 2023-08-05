import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, ORDER_URL, ORDERDETAIL_URL, UPD_ORDERDETAIL_URL, ADD_ORDERDETAIL_URL, DELETEORDER_URL } from 'app/constant';
import OrderService from 'app/service/order';
import history from '@history';

export const fetchOrderList = createAsyncThunk(ORDER_URL, async (option) => {
  const response = await OrderService.getOrders(option);
  return response;
});
export const fetchOrderDetail = createAsyncThunk(ORDERDETAIL_URL, async (id) => {
  const response = await OrderService.getOrder(id);
  return response;
});
export const deleteOrder = createAsyncThunk(DELETEORDER_URL, async (id, {dispatch}) => {
  const response = await OrderService.deleteOrder(id);
  dispatch(fetchOrderList(initialState.optionPaging));
  return response;
});
export const updateOrderDetail = createAsyncThunk(UPD_ORDERDETAIL_URL, async (data) => {
  const response = await OrderService.update(data);
  return response;
});
export const addOrder = createAsyncThunk(ADD_ORDERDETAIL_URL, async (data, {dispatch}) => {
  const response = await OrderService.add(data);
  dispatch(fetchOrderList(initialState.optionPaging));
  history.push({
    pathname: '/order',
  });
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
  orderList: [],
  orders: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state) => {return {...state, order: {}}},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchOrderList.fulfilled, (state, action) => {
      return {
        ...state,
        orderList: action.payload.data.orders.data,
        pagination: action.payload.data.orders.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchOrderList.rejected, (state, action) => {
      return {
        ...state,
        orderList: initialState.orderList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchOrderDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchOrderDetail.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload.data.order.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchOrderDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updateOrderDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updateOrderDetail.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload.data.updateOrder.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updateOrderDetail.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
    builder.addCase(addOrder.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload.data.createOrder.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
    builder.addCase(deleteOrder.pending, (state, action) => {
      return {
        ...state,
        loadingDelete: 'pending',
      };
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      return {
        ...state,
        plan: action.payload.data.deleteOrder.data,
        loadingDelete: 'success',
      };
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      return {
        ...state,
        loadingDelete: 'error',
      };
    });
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice.reducer;
