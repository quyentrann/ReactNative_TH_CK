import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';

// Atom để lưu trữ trạng thái người dùng
export const usersState = atom({
  key: 'usersState',
  default: {
    notes: [],
  },
});

async function updateData(users) {
  console.log('Updating data');
  console.log(users.id);

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
export const useDeleteTask = () => {
  const [users, setUsers] = useRecoilState(usersState);
  
  return (noteId) => {
    const updatedNotes = users.notes.filter((item) => item.id !== noteId);
    const updatedUsers = { ...users, notes: updatedNotes };
    setUsers(updatedUsers);
    updateData(updatedUsers);
  };
};

export const useAddTask = () => {
  const [users, setUsers] = useRecoilState(usersState);

  return (newNote) => {
    const newId = Math.max(...users.notes.map((item) => Number(item.id))) + 1;
    const updatedNotes = [
      ...users.notes,
      { id: String(newId), note: newNote },
    ];
    const updatedUsers = { ...users, notes: updatedNotes };
    setUsers(updatedUsers);
    updateData(updatedUsers);
  };
};

export const useUpdateTask = () => {
  const [users, setUsers] = useRecoilState(usersState);

  return ({ id, newNote }) => {
    const index = users.notes.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedNotes = [...users.notes];
      updatedNotes[index] = { ...updatedNotes[index], note: newNote };
      const updatedUsers = { ...users, notes: updatedNotes };
      setUsers(updatedUsers);
      updateData(updatedUsers);
    }
  };
};

export const useSaveData = () => {
  const setUsers = useSetRecoilState(usersState);

  return (newData) => {
    setUsers(newData);
  };
};
