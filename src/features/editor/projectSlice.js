/* eslint-disable max-len */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProjects, postProject, updateProject, deleteProject} from './projectAPI.js';
const initialState = {
  new: {
    name: '',
    key: '',
    content: {
      html: '',
      js: '',
      css: '',
    },
  },
  current: JSON.parse(window.sessionStorage.getItem('currentProject')) || {
    name: '',
    key: '',
    content: {
      html: '',
      js: '',
      css: '',
    },
  },
  all: [],
  renderProject: ``,
  loading: false,
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
  console.log(project);
  const projects = await postProject(project);
  return projects;
});

export const deleteProjectAsync = createAsyncThunk('project/delete', async (project) => {
  const projects = await deleteProject(project);
  return projects;
});

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    writeName(state, action) {
      state.new.name = action.payload;
      return state;
    },
    writeNew(state, action) {
      state.new = action.payload;
      return state;
    },
    loadProjectOnState(state, action) {
      console.log(action.payload);
      state.current = Object.assign(action.payload);
      return state;
    },
    writeCodeOnState(state, action) {
      console.log('Im reaching up till here');
      state.current.content[action.payload.language] = action.payload.content;
      return state;
    },
    writeRenderProject(state, action) {
      state.renderProject = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchProjectsAsync.pending, (state) => {
          state.loading = true;
          return state;
        })
        .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          state.loading = false;
          return state;
        })
        .addCase(updateProjectAsync.pending, (state) => {
          state.loading = true;
          return state;
        })
        .addCase(updateProjectAsync.fulfilled, (state, action) => {
          state.current = action.payload.filter((project) => project.name === state.current.name)[0];
          state.all = action.payload;
          state.loading = false;
          return state;
        })
        .addCase(postProjectAsync.pending, (state) => {
          state.loading = true;
          return state;
        })
        .addCase(postProjectAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          state.loading = false;
          return state;
        })
        .addCase(deleteProjectAsync.pending, (state) => {
          state.loading = true;
          return state;
        })
        .addCase(deleteProjectAsync.fulfilled, (state, action) => {
          state.all = action.payload;
          state.loading = false;
          return state;
        });
  },
});

export const {writeName, loadProjectOnState, writeCodeOnState, writeRenderProject, writeNew} = projectSlice.actions;

export default projectSlice.reducer;
