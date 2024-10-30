import { createSlice, createAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: { notes: [] },
  },
  reducers: {
    addTask: (state, action) => {
      const newNote = action.payload;
      const newId = Math.max(...state.users.notes.map((item) => Number(item.id)));
      state.users.notes.push({
        id: String(newId +1),
        note: newNote,
      });
    },
    deleteTask: (state, action) => {
      const noteId = action.payload;
      state.users.notes = state.users.notes.filter((item) => item.id !== noteId);
    },
    updateTask: (state, action) => {
      const { id, newNote } = action.payload;
      const index = state.users.notes.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.users.notes[index].note = newNote;
      }
    },
    saveData: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Tạo actions cho saga
export const addTaskSaga = createAction('user/addTaskSaga');
export const deleteTaskSaga = createAction('user/deleteTaskSaga');
export const updateTaskSaga = createAction('user/updateTaskSaga');

export const { addTask, deleteTask, updateTask, saveData } = userSlice.actions;
export default userSlice.reducer;
