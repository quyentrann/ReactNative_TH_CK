import { createSlice } from '@reduxjs/toolkit';

async function updateData(users) {
  const response = await fetch(
    `https://6555ccce84b36e3a431e5d74.mockapi.io/todo/${users.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    }
  );
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
  },

  reducers: {
    deleteTask: (state, action) => {
      const noteId = action.payload;
      state.users.notes = state.users.notes.filter(
        (item) => item.id !== noteId
      );
      updateData(state.users);
    },
    addTask: (state, action) => {
      const newNote = action.payload;
      const newId = Math.max(...state.users.notes.map((item) => Number(item.id)));
      state.users.notes.push({
        id: String(newId +1),
        note: newNote,
      });
      updateData(state.users);
    },
    updateTask: (state, action) => {
      const { id, newNote } = action.payload;
      const index = state.users.notes.findIndex((item) => item.id == id);
      state.users.notes[index].note = newNote;
      updateData(state.users);
    },
    saveData: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { deleteTask, updateTask, addTask, saveData } = userSlice.actions;
export default userSlice.reducer;
