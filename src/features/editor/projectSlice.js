/* eslint-disable max-len */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProjects} from './projectAPI.js';

const initialState = {
  current: {
    name: '',
    key: '',
    content: {
      html: '',
      js: '',
      css: '',
    },
  },
  all: [],
};

export const fetchProjectsAsync = createAsyncThunk('projects/fetch', async () => {
  const projects = await fetchProjects();
  return projects;
});

export const updateProjectAsync = createAsyncThunk('project/update', async (project) => {
  const projects = await updateProject(project);
  return projects;
});

export const postProjectAsync = createAsyncThunk('project/post', async (project) => {
  const projects = await postProject(project);
  return projects;
});

export const deleteProjectAsync = createAsyncThunk('project/delete', async (project) => {
  const projects = await updateProject(project);
  return projects;
});

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    writeName(state, action) {
      state.current.name = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          return state;
        })
        .addCase(updateProjectAsync.fulfilled, (state, action) => {
          state.current = action.payload.filter((project) => project.name === state.current.name)[0];
          state.all = action.payload;
          return state;
        })
        .addCase(postProjectAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          return state;
        })
        .addCase(deleteProjectAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          return state;
        });
  },
});

export const {writeName} = projectSlice.actions;

export default projectSlice.reducer;
