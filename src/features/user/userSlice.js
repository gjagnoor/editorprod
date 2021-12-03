import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {logoutUser, fetchUser} from './userAPI';

const initialState = {
  info: null,
};

export const fetchUserAsync = createAsyncThunk('user/fetch', async () => {
  const user = await fetchUser();
  return user;
});

export const logoutAsync = createAsyncThunk('user/logout', async () => {
  const user = await logoutUser();
  return user;
});

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(logoutAsync.fulfilled, (state, action) => {
          state.info = action.payload;
          return state;
        })
        .addCase(fetchUserAsync.fulfilled, (state, action) => {
          if (typeof action.payload === 'string') {
            state.status = action.payload;
          } else {
            state.info = action.payload;
          }
          return state;
        });
  },
});

export default counterSlice.reducer;
