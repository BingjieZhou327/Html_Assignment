import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobs, createJob } from '../../services/api';

// Async thunk for fetching jobs
export const getAllJobs = createAsyncThunk(
  'jobs/getAllJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchJobs();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch jobs');
    }
  }
);

// Async thunk for creating a job
export const addNewJob = createAsyncThunk(
  'jobs/addNewJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await createJob(jobData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create job');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobsList: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    createSuccess: false,
  },
  reducers: {
    clearJobs: (state) => {
      state.jobsList = [];
      state.error = null;
    },
    resetCreateStatus: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobsList = action.payload;
        state.error = null;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create job
      .addCase(addNewJob.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.jobsList.push(action.payload);
        state.createError = null;
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
        state.createSuccess = false;
      });
  },
});

export const { clearJobs, resetCreateStatus } = jobsSlice.actions;
export default jobsSlice.reducer;

