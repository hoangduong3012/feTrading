import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDEAL, COMMENT_URL, COMMENTDETAIL_URL, UPD_COMMENTDETAIL_URL, ADD_COMMENTDETAIL_URL } from 'app/constant';
import CommentService from 'app/service/comment';

export const addComment= createAsyncThunk(ADD_COMMENTDETAIL_URL, async (data) => {
  const response = await CommentService.add(data);
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
  commentList: [],
  comment: {},
  pagination: {},
  loading: IDEAL,
  loadingUpdate:IDEAL,
  error: {},
}
const commentSlice = createSlice({
  name: 'comment',
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
    builder.addCase(fetchCommentList.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchCommentList.fulfilled, (state, action) => {
      return {
        ...state,
        commentList: action.payload.data.comments.data,
        pagination: action.payload.data.comments.meta.pagination,
        loading: 'success',
      };
    });
    builder.addCase(fetchCommentList.rejected, (state, action) => {
      return {
        ...state,
        commentList: initialState.commentList,
        pagination: initialState.pagination,
        loading: 'error',
      };
    });
    builder.addCase(fetchCommentDetail.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(fetchCommentDetail.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data.comment.data,
        loading: 'success',
      };
    });
    builder.addCase(fetchCommentDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: 'error',
      };
    });
    builder.addCase(updateCommentDetail.pending, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'pending',
      };
    });
    builder.addCase(updateCommentDetail.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data.updateComment.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(updateCommentDetail.rejected, (state, action) => {
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
        comment: action.payload.data.createComment.data,
        loadingUpdate: 'success',
      };
    });
    builder.addCase(addComment.rejected, (state, action) => {
      return {
        ...state,
        loadingUpdate: 'error',
      };
    });
  },
});

export default commentSlice.reducer;
