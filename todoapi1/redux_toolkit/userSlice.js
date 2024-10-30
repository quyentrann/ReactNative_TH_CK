import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để lấy dữ liệu user từ API
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch(
    'https://6555ccce84b36e3a431e5d74.mockapi.io/todo'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {
    deleteTask: (state, action) => {
      const { userId, noteId } = action.payload;
      const userIndex = state.users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].notes = state.users[userIndex].notes.filter(
          (note) => note.id !== noteId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Xóa lỗi khi bắt đầu fetch mới
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { deleteTask } = userSlice.actions;
export default userSlice.reducer;
