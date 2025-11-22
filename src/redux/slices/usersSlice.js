import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../services/api';

// Async thunk for fetching users
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.usersList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

