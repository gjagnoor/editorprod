import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';
import projectReducer from '../features/editor/projectSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});
